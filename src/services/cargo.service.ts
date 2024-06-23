import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Cargo } from '@prisma/client';
import { createReadStream } from 'fs';
import { CreateCargoDto } from 'src/dto/cargo/create-cargo.dto';
import { UpdateCargoDto } from 'src/dto/cargo/update-cargo.dto';
import { FileService } from './file.service';
import { GetCargoDto } from 'src/dto/cargo/get-cargo.dto';

@Injectable()
export class CargoService {
  constructor(private prisma: PrismaService, private fileService: FileService) {}
  
  async createCargo(filesInfo?: {path: string, type: string}[], data?: CreateCargoDto) : Promise<Cargo> {
    const cargo = await this.prisma.cargo.create({
      data: {
        title: data?.title,
        weight: parseInt(data?.weight, 10),
        shortDescription: data?.shortDescription,
        articleNumber: data?.articleNumber,
        packageQuantity: parseInt(data?.packageQuantity, 10),

        description: data?.description,
        price: parseFloat(data?.price),
        width: parseFloat(data?.width),
        density: parseFloat(data?.density),
        winding: parseFloat(data?.winding),
        packagingType: data?.packagingType,
        paperId: data?.paperId
      },
    });

    let index = 0;
    for (const file of filesInfo) {
      if (file?.path) {
        let fileData: Buffer;
        const fileStream = createReadStream(file.path);
        const chunks = [];
    
        for await (const chunk of fileStream) {
          chunks.push(chunk);
        }
    
        fileData = Buffer.concat(chunks);
        await this.prisma.picture.create({
          data: {
            picture: fileData,
            cargoId: cargo.id,
            type: file.type || 'image/png',
            order: index++,
          },
        });
        await this.fileService.deleteFile(file?.path);
      }
    }

    return cargo;
  }

  async updateCargo(filesInfo?: {path: string, type: string}[], data?: UpdateCargoDto) : Promise<Cargo> {
    const cargo = await this.prisma.cargo.update({
      where:{
        id: data.id
      },
      data: {
        title: data?.title,
        weight: parseInt(data?.weight, 10),
        shortDescription: data?.shortDescription,
        articleNumber: data?.articleNumber,
        packageQuantity: parseInt(data?.packageQuantity, 10),

        description: data?.description,
        price: parseFloat(data?.price),
        width: parseFloat(data?.width),
        density: parseFloat(data?.density),
        winding: parseFloat(data?.winding),
        packagingType: data?.packagingType,
        paperId: data?.paperId
      },
    });

    await this.prisma.picture.deleteMany({
      where : {
        cargoId: data.id
      }
    })

    let index = 0;
    for (const file of filesInfo) {
      if (file?.path) {
        let fileData: Buffer;
        const fileStream = createReadStream(file.path);
        const chunks = [];
    
        for await (const chunk of fileStream) {
          chunks.push(chunk);
        }
    
        fileData = Buffer.concat(chunks);
        await this.prisma.picture.create({
          data: {
            picture: fileData,
            cargoId: cargo.id,
            type: file.type || 'image/png',
            order: index++,
          },
        });
        await this.fileService.deleteFile(file?.path);
      }
    }

    return cargo;
  }

  async deleteCargo(id: string): Promise<Cargo> {
    await this.prisma.picture.deleteMany({
      where : {
        cargoId: id
      }
    })

    return await this.prisma.cargo.delete({
      where: {id}
    });
  }

  async getById(id: string): Promise<GetCargoDto> {
    const data = await this.prisma.cargo.findUnique({
      include: {pictures: {
        select: {
          id: true,
          order: true
        },
        orderBy: {
          order: 'asc'
        }
      },},
      where: {id},
    });

    return {
      id : data?.id,
      title: data?.title,
      weight: data?.weight,
      shortDescription: data?.shortDescription,
      articleNumber: data?.articleNumber,
      packageQuantity: data?.packageQuantity,

      description: data?.description,
      price: data?.price,
      width: data?.width,
      density: data?.density,
      winding: data?.winding,
      packagingType: data?.packagingType,
      paperId: data?.paperId,
      pictures: data?.pictures?.map(picture => picture?.id),
    }
  }

  async getAll(paperId?: string): Promise<GetCargoDto[]> {
    const cargos = await this.prisma.cargo.findMany({
      where:{paperId},
      include: {
        pictures: {
          select: {
            id: true,
            order: true
          },
          orderBy: {
            order: 'asc'
          }
        },
      }
    });
    
    return cargos?.map(data => {
      return {
        id : data?.id,
        title: data?.title,
        weight: data?.weight,
        shortDescription: data?.shortDescription,
        articleNumber: data?.articleNumber,
        packageQuantity: data?.packageQuantity,

        description: data?.description,
        price: data?.price,
        width: data?.width,
        density: data?.density,
        winding: data?.winding,
        packagingType: data?.packagingType,
        paperId: data?.paperId,
        pictures: data?.pictures?.map(picture => picture?.id),
      }
    });
  }

  async getWeights(paperId?: string): Promise<number[]> { 
    const uniqueWeights = await this.prisma.cargo.groupBy({
      by: ['weight'],
      where: {
        weight: {
          not: null, // если вы хотите исключить null значения
        },
        paperId
      },
    });
    
    return uniqueWeights.map(entry => entry.weight).sort((a, b) => a - b);
  }

}