import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { $Enums, Cargo } from '@prisma/client';
import { createReadStream } from 'fs';
import { CreateCargoDto } from 'src/dto/cargo/create-cargo.dto';
import { UpdateCargoDto } from 'src/dto/cargo/update-cargo.dto';
import { PictureType } from 'src/dto/enums/picture-type.enum';
import { json } from 'stream/consumers';
import { FileService } from './file.service';

@Injectable()
export class CargoService {
  constructor(private prisma: PrismaService, private fileService: FileService) {}
  
  async createCargo(filesInfo?: {path: string, name: string}[], data?: CreateCargoDto) : Promise<Cargo> {
    const cargo = await this.prisma.cargo.create({
      data: {
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
        paperId: data?.paperId
      },
    });

    if (typeof data?.picturesType === 'string') {
      data.picturesType = JSON.parse(data?.picturesType);
    }

    filesInfo?.forEach(async file => {
      let fileData: Buffer;
      if(file.path){
        const fileStream = createReadStream(file.path);
        const chunks = [];
  
        for await (const chunk of fileStream) {
          chunks.push(chunk);
        }
  
        fileData = Buffer.concat(chunks);
        await this.prisma.picture.create({
          data: {
            picture: fileData,
            cargoId : cargo.id,
            type: $Enums.Type[data?.picturesType?.find(pictureType => pictureType.name == file?.name)?.type] || $Enums.Type[$Enums.Type.OTHER]
          },
        });
      }

      await this.fileService.deleteFile(file?.path);
    });

    return cargo;
  }

  async updateCargo(filesInfo?: {path: string, name: string}[], data?: UpdateCargoDto) : Promise<Cargo> {
    const cargo = await this.prisma.cargo.update({
      where:{
        id: data.id
      },
      data: {
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
        paperId: data?.paperId
      },
    });

    await this.prisma.picture.deleteMany({
      where : {
        cargoId: data.id
      }
    })

    if (typeof data?.picturesType === 'string') {
      data.picturesType = JSON.parse(data?.picturesType);
    }

    filesInfo?.forEach(async file => {
      let fileData: Buffer;
      if(file?.path){
        const fileStream = createReadStream(file?.path);
        const chunks = [];
  
        for await (const chunk of fileStream) {
          chunks.push(chunk);
        }
  
        fileData = Buffer.concat(chunks);
      }
      
      await this.prisma.picture.create({
        data: {
          picture: fileData,
          cargoId : cargo.id,
          type: $Enums.Type[data?.picturesType?.find(pictureType => pictureType.name == file?.name)?.type] || $Enums.Type[$Enums.Type.OTHER]
        },
      });

      await this.fileService.deleteFile(file?.path);
    });

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

  async getById(id: string): Promise<Cargo | null> {
    return await this.prisma.cargo.findUnique({
      include: {pictures: true},
      where: {id},
    });
  }

  async getAll(paperId?: string): Promise<Cargo[]> { //GetCargoDto[]
    const cargos = await this.prisma.cargo.findMany({
      where:{paperId},
      include: {
        pictures: {
          select: {
            id: true,
            type: true,
          },
        },
      }
    });
    return cargos;
  }

  async getWeights(): Promise<number[]> { 
    const uniqueWeights = await this.prisma.cargo.groupBy({
      by: ['weight'],
      where: {
        weight: {
          not: null, // если вы хотите исключить null значения
        },
      },
    });
    
    return uniqueWeights.map(entry => entry.weight).sort((a, b) => a - b);
  }

}