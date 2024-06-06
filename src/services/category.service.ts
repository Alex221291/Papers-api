import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Category } from '@prisma/client';
import { UpdateCategotyDto } from 'src/dto/category/update-category.dto';
import { CreateCategotyDto } from 'src/dto/category/create-category.dto';
import { GetCategotyPapersDto } from 'src/dto/category/get-categoty-papers.dto';
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: {id},
    });
  }

  async getAll(): Promise<GetCategotyPapersDto[]> {
    const categories = await this.prisma.category.findMany({
      include:{
        papers: true,
      }
    });

    return categories.map(category => {
      return {
        id: category?.id,
        name: category?.name,
        papers: category?.papers.map(paper =>  {
          return {
            id: paper?.id,
            name: paper?.name,
            description: paper?.description,
            applicationSphere: paper?.applicationSphere?.split('@#$'),
            categoryId: paper?.categoryId,
            picture: paper?.picture
          }
        })
      }
    })
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

    const papers = await this.prisma.paper.findMany({
      where: {categoryId: id},
      select: {
        id: true
      }
    });

    if(papers.length > 0) {
      throw new HttpException('Категория содержит виды бумаг!', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.category.delete({
      where: {id},
    });
  }
}