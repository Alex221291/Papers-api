import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Paper } from '@prisma/client';
import { createReadStream } from 'fs';
import { CreatePaperDto } from 'src/dto/paper/create-paper.dto';
import { UpdatePaperDto } from 'src/dto/paper/update-paper.dto';

@Injectable()
export class CargoService {
  constructor(private prisma: PrismaService) {}
  
  async createPaper(path?: string, data?: CreatePaperDto) : Promise<Paper> {
    let fileData: Buffer;
    if(path){
      const fileStream = createReadStream(path);
      const chunks = [];

      for await (const chunk of fileStream) {
        chunks.push(chunk);
      }

      fileData = Buffer.concat(chunks);
    }
    const paper = await this.prisma.paper.create({
      data: {
        name: data?.name,
        description: data?.description,
        applicationSphere: data?.applicationSphere,
        categoryId: data?.categoryId,
        picture: fileData,
      },
    });

    return paper;
  }

  async updatePaper(path?: string, data?: UpdatePaperDto) : Promise<Paper> {
    let fileData: Buffer;
    if(path){
      const fileStream = createReadStream(path);
      const chunks = [];

      for await (const chunk of fileStream) {
        chunks.push(chunk);
      }

      fileData = Buffer.concat(chunks);
    }
    const paper = await this.prisma.paper.update({
      where:{
        id: data.id
      },
      data: {
        name: data?.name,
        description: data?.description,
        applicationSphere: data?.applicationSphere,
        categoryId: data?.categoryId,
        picture: fileData,
      },
    });

    return paper;
  }

  async deletePaper(id: string): Promise<Paper> {
    return this.prisma.paper.delete({
      where: {id}
    });
  }

  async getById(id: string): Promise<Paper | null> {
    return this.prisma.paper.findUnique({
      where: {id},
    });
  }

  async getAll(categoryId?: string): Promise<Paper[]> {
    return this.prisma.paper.findMany({
      where:{categoryId}
    });
  }
}