import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    UseInterceptors,
    Query,
    Header,
    StreamableFile,
  } from '@nestjs/common';
  import { UploadedFiles } from '@nestjs/common';
  import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Cargo } from '@prisma/client';
import { CreateCargoDto } from 'src/dto/cargo/create-cargo.dto';
import { GetCargoDto } from 'src/dto/cargo/get-cargo.dto';
import { UpdateCargoDto } from 'src/dto/cargo/update-cargo.dto';
import { CargoService } from 'src/services/cargo.service';
import { createReadStream } from 'fs';
import { join } from 'path';
  
  @ApiTags('Cargo')
  @Controller('cargo')
  export class CargoController {
    constructor(
      private readonly cargoService: CargoService
    ) {}

    @Post('create')
    @UseInterceptors(FilesInterceptor('files[]'))
    async createPaper(@UploadedFiles() files: Express.Multer.File[], @Body() cargo: CreateCargoDto): Promise<Cargo> {
      console.log(cargo);
      console.log(files);
      const filesInfo = files?.map(file => {
        return {
          path: file?.path,
          type: file?.mimetype
        }
      });
      return await this.cargoService.createCargo(filesInfo, cargo);
    }

    @Post('update')
    @UseInterceptors(FilesInterceptor('files[]'))
    async updatePaper(@UploadedFiles() files: Express.Multer.File[], @Body() cargo: UpdateCargoDto): Promise<Cargo> {
      console.log(files);
      const filesInfo = files?.map(file => {
        return {
          path: file?.path,
          type: file?.mimetype
        }
      });
      return await this.cargoService.updateCargo(filesInfo, cargo);
    }

    @Get('price')
    @Header('Cache-Control', 'none')
    async get(): Promise<StreamableFile> {
      try {
        console.log(join(process.cwd(), 'uploads', 'tpaper-price.pdf'));
        const fileStream = createReadStream(join(process.cwd(), 'docs', 'tpaper-price.pdf'));
        return new StreamableFile(fileStream);
      } catch (error) {
        throw new Error('Ошибка при получении файла');
      }
    }

    @Get('weights')
    async getWeights(@Query('paperId') paperId?: string): Promise<number[]> {
      return await this.cargoService.getWeights(paperId);
    }

    @Get('/:id')
    async getPostById(@Param('id') id: string): Promise<GetCargoDto> {
      return await this.cargoService.getById(id);
    }
  
    @Get()
    async getAll(@Query('paperId') paperId?: string): Promise<GetCargoDto[]> {
      return await this.cargoService.getAll(paperId);
    }

    @Delete('/:id')
    async deleteCargo(@Param('id') id: string): Promise<Cargo> {
      return await this.cargoService.deleteCargo(id);
    }
  }