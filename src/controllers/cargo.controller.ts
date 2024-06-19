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
import { Cargo, Paper } from '@prisma/client';
import { CreateCargoDto } from 'src/dto/cargo/create-cargo.dto';
import { GetCargoDto } from 'src/dto/cargo/get-cargo.dto';
import { UpdateCargoDto } from 'src/dto/cargo/update-cargo.dto';
import { CreatePaperDto } from 'src/dto/paper/create-paper.dto';
import { UpdatePaperDto } from 'src/dto/paper/update-paper.dto';
import { CargoService } from 'src/services/cargo.service';
  
  @ApiTags('Cargo')
  @Controller('cargo')
  export class CargoController {
    constructor(
      private readonly cargoService: CargoService
    ) {}

    @Post('create')
    @UseInterceptors(FilesInterceptor('files'))
    async createPaper(@UploadedFiles() files, @Body() cargo: CreateCargoDto): Promise<Cargo> {
      console.log(files);
      const filesInfo = files?.map(file => {
        return {
          path: file?.path,
          name: file?.originalname
        }
      });
      return await this.cargoService.createCargo(filesInfo, cargo);
    }

    @Post('update')
    @UseInterceptors(FilesInterceptor('files'))
    async updatePaper(@UploadedFiles() files, @Body() cargo: UpdateCargoDto): Promise<Cargo> {
      console.log(files);
      const filesInfo = files?.map(file => {
        return {
          path: file?.path,
          name: file?.originalname
        }
      });
      return await this.cargoService.updateCargo(filesInfo, cargo);
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