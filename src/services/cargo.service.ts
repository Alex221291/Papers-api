import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Cargo } from '@prisma/client';
import { createReadStream } from 'fs';
import { CreateCargoDto } from 'src/dto/cargo/create-cargo.dto';
import { UpdateCargoDto } from 'src/dto/cargo/update-cargo.dto';
import { GetCargoDto } from 'src/dto/cargo/get-cargo.dto';

@Injectable()
export class CargoService {
  constructor(private prisma: PrismaService) {}
  
  async createCargo(paths?: string[], data?: CreateCargoDto) : Promise<Cargo> {
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
    paths?.forEach(async path => {
      let fileData: Buffer;
      if(path){
        const fileStream = createReadStream(path);
        const chunks = [];
  
        for await (const chunk of fileStream) {
          chunks.push(chunk);
        }
  
        fileData = Buffer.concat(chunks);

        await this.prisma.picture.create({
          data: {
            picture: fileData,
            cargoId : cargo.id
          },
        });
      }
    });

    return cargo;
  }

  async updateCargo(paths?: string[], data?: UpdateCargoDto) : Promise<Cargo> {
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

    paths?.forEach(async path => {
      let fileData: Buffer;
      if(path){
        const fileStream = createReadStream(path);
        const chunks = [];
  
        for await (const chunk of fileStream) {
          chunks.push(chunk);
        }
  
        fileData = Buffer.concat(chunks);
      }
      await this.prisma.picture.create({
        data: {
          picture: fileData,
          cargoId : cargo.id
        },
      });
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

  async getAll(): Promise<any> { //GetCargoDto[]
    const cargos = await this.prisma.cargo.findMany({
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
}