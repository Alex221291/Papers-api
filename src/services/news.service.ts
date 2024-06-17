import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GetNewsDto } from 'src/dto/news/get-news.dto';
import { $Enums, News, Picture } from '@prisma/client';
import { CreateNewsDto } from 'src/dto/news/create-news.dto';
import { createReadStream } from 'fs';
import { FileService } from './file.service';
import { UpdateNewsDto } from 'src/dto/news/update-news.dto';
@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService, 
    private fileService: FileService
  ) {}

  async getById(id: string): Promise<News | null> {
    return await this.prisma.news.findUnique({
      where: {id},
    });
  }

  async getAll(): Promise<News[]> {
    return await this.prisma.news.findMany({});
  }

  async createNews(path?: string, news?: CreateNewsDto): Promise<News> {

    let fileData: Buffer;
    let picture: Picture;
    if(path){
      const fileStream = createReadStream(path);
      const chunks = [];

      for await (const chunk of fileStream) {
        chunks.push(chunk);
      }

      fileData = Buffer.concat(chunks);
      picture = await this.prisma.picture.create({
        data: {
          picture: fileData,
          type: $Enums.Type[$Enums.Type.OTHER]
        },
      });
    }

    await this.fileService.deleteFile(path);
    
    return await this.prisma.news.create({
      data: {
        title: news?.title,
        description: news?.description,
        pictureId: picture?.id
      },
    });
  }

  async updateNews(path?: string, news?: UpdateNewsDto): Promise<News> {
    let fileData: Buffer;
    let picture: Picture;

    const updateNews = await this.getById(news?.id);

    if(path){
      const fileStream = createReadStream(path);
      const chunks = [];

      for await (const chunk of fileStream) {
        chunks.push(chunk);
      }

      fileData = Buffer.concat(chunks);
      picture = await this.prisma.picture.create({
        data: {
          picture: fileData,
          type: $Enums.Type[$Enums.Type.OTHER]
        },
      });
    }

    await this.fileService.deleteFile(path);

    await this.prisma.picture.delete({
      where : {
        id: updateNews?.pictureId
      }
    });
    
    return await this.prisma.news.update({
      where:{
        id: news.id,
      },
      data: {
        title: news?.title,
        description: news?.description,
        pictureId: picture?.id
      },
    });
  }

  async deleteNews(id: string): Promise<News> {
    const deleteNews = await this.getById(id);

    await this.prisma.picture.delete({
      where : {
        id: deleteNews?.pictureId
      }
    });

    return await this.prisma.news.delete({
      where: {id},
    });
  }
}