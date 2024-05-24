import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UseInterceptors,
    UploadedFiles,
    Query,
    UploadedFile,
  } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Paper } from '@prisma/client';
import { CreatePaperDto } from 'src/dto/paper/create-paper.dto';
import { UpdatePaperDto } from 'src/dto/paper/update-paper.dto';
import { PictureService } from 'src/services/picrute.service';
  
  @ApiTags('Picture')
  @Controller('picture')
  export class PictureController {
    constructor(
      private readonly pictureService: PictureService
    ) {}
  

    // @Post()
    // @UseInterceptors(FilesInterceptor('files'))
    // async uploadFiles(@UploadedFiles() files) {
    //   const savedFiles = await Promise.all(files.map(file => this.fileService.saveFile(file.path)));
    //   return savedFiles.map(file => ({ id: file.id }));
    // }

    
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createPaper(@UploadedFile() file, @Query() paper: CreatePaperDto) {
      console.log(file);
      return await this.pictureService.createPaper(file?.path, paper);
    }

    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    async updatePaper(@UploadedFile() file, @Query() paper: UpdatePaperDto) {
      console.log(file);
      return await this.pictureService.createPaper(file?.path, paper);
    }

    @Get('/:id')
    async getPostById(@Param('id') id: string): Promise<Paper> {
      return this.pictureService.getById(id);
    }
  
    @Get()
    async getAll(@Query('categoryId') categoryId?: string): Promise<Paper[]> {
      return this.pictureService.getAll(categoryId);
    }

    @Delete('/:id')
    async deletePaper(@Param('id') id: string): Promise<Paper> {
      return this.pictureService.deletePaper(id);
    }

  }