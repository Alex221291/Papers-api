import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Category } from '@prisma/client';
import { UpdateCategotyDto } from 'src/dto/category/update-category.dto';
import { CreateCategotyDto } from 'src/dto/category/create-category.dto';
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: {id},
    });
  }

  async getAll(): Promise<Category[]> {
    return await this.prisma.category.findMany({
      include:{
        papers: true,
      }
    });
  }

  async createCategory(category: CreateCategotyDto): Promise<Category> {
    return await this.prisma.category.create({
      data: category,
    });
  }

  async updateCategory(category: UpdateCategotyDto): Promise<Category> {
    return await this.prisma.category.update({
      data: category,
      where: {id: category.id},
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    return await this.prisma.category.delete({
      where: {id},
    });
  }
}