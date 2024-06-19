import {
    Controller,
    Get,
    Body,
    Res,
    StreamableFile,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Picture } from '@prisma/client';
import { PictureService } from 'src/services/picrute.service';
import * as fs from 'fs';
import { Readable } from 'stream';
  
  @ApiTags('Picture')
  @Controller('picture')
  export class PictureController {
    constructor(
      private readonly pictureService: PictureService
    ) {}

    @Get()
    async get(@Body('pictureIds') pictureIds?: string[]): Promise<StreamableFile> {
      try {
        const buffers = await this.pictureService.getBuffers(pictureIds); // Здесь получите изображение из базы данных или другого источника
          
        const readableStream = new Readable();
        readableStream.push(Buffer.concat(buffers));
        readableStream.push(null);

        return new StreamableFile(readableStream);
      } catch (error) {
        throw new Error('Ошибка при получении изображения');
      }
    }
  }

  