import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Picture } from '@prisma/client';

@Injectable()
export class PictureService {
  constructor(private prisma: PrismaService) {}

  async get(pictureIds?: string[]): Promise<Picture[]> {
    let params = {};
    if(pictureIds && pictureIds.length != 0)
      params = {
        where:{id : {
          in : pictureIds
        }}
      };

    return await this.prisma.picture.findMany(params);
  }
}