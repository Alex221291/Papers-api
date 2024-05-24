import { PrismaClient } from '@prisma/client'
import * as path from 'path';
import * as fs from 'fs';
const prisma = new PrismaClient()
async function main() {
  // const category1 = await prisma.category.upsert({
  //     where: { name: 'Технические виды бумаг' },
  //     update: {},
  //     create: {
  //       name: 'Технические виды бумаг'
  //     },
  //   })
  // const category2 = await prisma.category.upsert({
  //     where: { name: 'Упаковочные виды бумаг' },
  //     update: {},
  //     create: {
  //     name: 'Упаковочные виды бумаг'
  //     },
  // })
  // console.log({ category1, category2 })
// ���� � ����� �� ������� NestJS
console.log(__dirname);
  const filePath = path.join(__dirname, '../seed/seed-pictures/paper.png');
  // ������ ����� ��� �������� ������
  const fileBuffer = fs.readFileSync(filePath);
  await prisma.paper.upsert({
    where: { id: '17826f6b-14de-4815-83d8-b092c7381946', picture: null },
    update: {
      picture: fileBuffer,
    },
    create: {},
  });
  await prisma.paper.upsert({
    where: { id: '870cd1ef-b2c8-4329-8deb-5793b5499674', picture: null },
    update: {
      picture: fileBuffer,
    },
    create: {},
  });
  await prisma.paper.upsert({
    where: { id: '79ea5405-125a-4f7b-82a8-e1628870d920', picture: null },
    update: {
      picture: fileBuffer,
    },
    create: {},
  });
  await prisma.paper.upsert({
    where: { id: 'ad30ecbb-6916-45e7-92d8-f266133d9891', picture: null },
    update: {
      picture: fileBuffer,
    },
    create: {},
  });
  
  await prisma.paper.upsert({
    where: { id: '8fa5219a-4da3-4c9e-8060-64b67bc1c0fa', picture: null },
    update: {
      picture: fileBuffer,
    },
    create: {},
  });

//   const paper1 = await prisma.category.upsert({
//     where: { name: 'Технические виды бумаг' },
//     update: {},
//     create: {
//       name: 'Технические виды бумаг'
//     },
//   })
// const paper2 = await prisma.category.upsert({
//     where: { name: 'Упаковочные виды бумаг' },
//     update: {},
//     create: {
//     name: 'Упаковочные виды бумаг'
//     },
// })
// console.log({ category1, category2 })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })