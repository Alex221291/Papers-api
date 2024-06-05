import {
    Controller,
    Get,
    Body,
  } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Picture } from '@prisma/client';
import { PictureService } from 'src/services/picrute.service';
  
  @ApiTags('Picture')
  @Controller('picture')
  export class PictureController {
    constructor(
      private readonly pictureService: PictureService
    ) {}

    @Get()
    async get(@Body('pictureIds') pictureIds?: string[]): Promise<Picture[]> {
      return this.pictureService.get(pictureIds);
    }

  }