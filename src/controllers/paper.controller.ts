import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    UseInterceptors,
    Query,
    UploadedFile,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Paper } from '@prisma/client';
import { CreatePaperDto } from 'src/dto/paper/create-paper.dto';
import { GetPaperDto } from 'src/dto/paper/get-paper.dto';
import { UpdatePaperDto } from 'src/dto/paper/update-paper.dto';
import { PaperService } from 'src/services/paper.service';
  
  @ApiTags('Paper')
  @Controller('paper')
  export class PaperController {
    constructor(
      private readonly paperService: PaperService
    ) {}
  
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createPaper(@UploadedFile() file: Express.Multer.File, @Body() paper: CreatePaperDto) {
      console.log(file);
      const result = await this.paperService.createPaper(file?.path, paper)
      return result;
    }

    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    async updatePaper(@UploadedFile() file: Express.Multer.File, @Body() paper: UpdatePaperDto) {
      console.log(file);
      const result = await this.paperService.updatePaper(file?.path, paper);
      return result;
    }

    @Get('/:id')
    async getPostById(@Param('id') id: string): Promise<GetPaperDto> {
      return this.paperService.getById(id);
    }
  
    @Get()
    async getAll(@Query('categoryId') categoryId?: string): Promise<GetPaperDto[]> {
      return this.paperService.getAll(categoryId);
    }

    @Delete('/:id')
    async deletePaper(@Param('id') id: string): Promise<Paper> {
      return this.paperService.deletePaper(id);
    }

  }