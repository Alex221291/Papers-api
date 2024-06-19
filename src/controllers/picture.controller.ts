import {
    Controller,
    Get,
    Body,
    Res,
    StreamableFile,
    Header,
    Param,
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

    
    @Get('/:id')
    @Header('Cache-Control', 'none')
    async get(@Param('id') pictureId: string): Promise<StreamableFile> {
      try {
        const buffer = await this.pictureService.getBuffer(pictureId); // Здесь получите изображение из базы данных или другого источника
          
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);

        return new StreamableFile(readableStream, { type: 'image/png' });
      } catch (error) {
        throw new Error('Ошибка при получении изображения');
      }
    }

    // @Get()
    // @Header('Cache-Control', 'none')
    // async get(@Body('pictureIds') pictureIds?: string[]): Promise<StreamableFile> {
    //   try {
    //     const buffers = await this.pictureService.getBuffers(pictureIds); // Здесь получите изображение из базы данных или другого источника
          
    //     const readableStream = new Readable();
    //     readableStream.push(Buffer.concat(buffers));
    //     readableStream.push(null);

    //     return new StreamableFile(readableStream);
    //   } catch (error) {
    //     throw new Error('Ошибка при получении изображения');
    //   }
    // }
  }

  