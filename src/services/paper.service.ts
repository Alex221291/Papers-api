import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Paper } from '@prisma/client';
import { createReadStream } from 'fs';
import { CreatePaperDto } from 'src/dto/paper/create-paper.dto';
import { UpdatePaperDto } from 'src/dto/paper/update-paper.dto';
import { GetPaperDto } from 'src/dto/paper/get-paper.dto';
import { FileService } from './file.service';

@Injectable()
export class PaperService {
  constructor(private prisma: PrismaService,
    private fileService: FileService
  ) {}

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
        applicationSphere: data?.applicationSphere?.join('@#$'),
        categoryId: data?.categoryId,
        picture: fileData,
      },
    });

    await this.fileService.deleteFile(path);

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
        applicationSphere: data?.applicationSphere?.join('@#$'),
        categoryId: data?.categoryId,
        picture: fileData,
      },
    });

    await this.fileService.deleteFile(path);
    
    return paper;
  }

  async deletePaper(id: string): Promise<Paper> {
    const cargos = await this.prisma.cargo.findMany({
      where: {paperId: id},
      select: {
        id: true
      }
    });

    if(cargos.length > 0) {
      throw new HttpException('Раздел содержит товары!', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.paper.delete({
      where: {id}
    });
  }

  async getById(id: string): Promise<GetPaperDto | null> {
    const paper = await this.prisma.paper.findUnique({
      where: {id},
    });

    return {
      id: paper?.id,
      name: paper?.name,
      description: paper?.description,
      applicationSphere: paper?.applicationSphere?.split('@#$'),
      categoryId: paper?.categoryId,
      picture: paper?.picture
    }
  }

  async getAll(categoryId?: string): Promise<GetPaperDto[]> {
    const papers = await this.prisma.paper.findMany({
      where:{categoryId}
    });

    return papers.map(paper =>  {
      return {
        id: paper?.id,
        name: paper?.name,
        description: paper?.description,
        applicationSphere: paper?.applicationSphere?.split('@#$'),
        categoryId: paper?.categoryId,
        picture: paper?.picture
      }
    });
  }
}