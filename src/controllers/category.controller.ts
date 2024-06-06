import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { Category as CategoryModel} from '@prisma/client';
  import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/services/category.service';
import { CreateCategotyDto } from 'src/dto/category/create-category.dto';
import { UpdateCategotyDto } from 'src/dto/category/update-category.dto';
import { GetCategotyPapersDto } from 'src/dto/category/get-categoty-papers.dto';
  
  @ApiTags('Category')
  @Controller('category')
  export class CategoryController {
    constructor(
      private readonly categoryService: CategoryService
    ) {}
  
    @Get('/:id')
    async getPostById(@Param('id') id: string): Promise<CategoryModel> {
      return this.categoryService.getById(id);
    }
  
    @Get()
    async getAll(): Promise<GetCategotyPapersDto[]> {
      return this.categoryService.getAll();
    }
  
    @Post()
    async createCategory(@Body() categoryData: CreateCategotyDto): Promise<CategoryModel> {
      return this.categoryService.createCategory(categoryData);
    }
  
    @Put()
    async publishPost(@Body() category: UpdateCategotyDto): Promise<CategoryModel> {
      return this.categoryService.updateCategory(category);
    }
  
    @Delete('/:id')
    async deleteCategory(@Param('id') id: string): Promise<CategoryModel> {
      return this.categoryService.deleteCategory(id);
    }
  }