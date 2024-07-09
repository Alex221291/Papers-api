import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { CategoryController } from './controllers/category.controller';
import { PaperController } from './controllers/paper.controller';
import { CategoryService } from './services/category.service';
import { PaperService } from './services/paper.service';
import { MulterModule } from '@nestjs/platform-express';
import { CargoService } from './services/cargo.service';
import { PictureService } from './services/picrute.service';
import { CargoController } from './controllers/cargo.controller';
import { PictureController } from './controllers/picture.controller';
import { FileService } from './services/file.service';
import { AppController } from './controllers/app.controller';
import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';
import { MailController } from './controllers/mail.controller';
import { MailService } from './services/mail.service';

@Module({
  imports: [MulterModule.register({
    dest: './uploads',
  }),],
  controllers: [CategoryController, PaperController, CargoController, PictureController, AppController, NewsController, MailController],
  providers: [CategoryService, PaperService, PrismaService, CargoService, PictureService, FileService, NewsService, MailService],
})
export class AppModule {}