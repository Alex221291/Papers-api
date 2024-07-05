import { PrismaClient } from '@prisma/client'
import * as path from 'path';
import * as fs from 'fs';
const prisma = new PrismaClient();
async function main() {
  console.log(__dirname);
  await prisma.paper.updateMany({
    where: { id: '17826f6b-14de-4815-83d8-b092c7381946', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/kalka.png')),
    }
  });
  await prisma.paper.updateMany({
    where: { id: '870cd1ef-b2c8-4329-8deb-5793b5499674', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/vatman.png')),
    }
  });
  await prisma.paper.updateMany({
    where: { id: '79ea5405-125a-4f7b-82a8-e1628870d920', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/upakovka.png')),
    }
  });

  await prisma.paper.updateMany({
    where: { id: 'de87b9b5-8fbb-4c33-8655-2e0d49292a5f', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/vatman.png')),
    }
  });

  await prisma.paper.updateMany({
    where: { id: 'ad30ecbb-6916-45e7-92d8-f266133d9891', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/pergament.png')),
    }
  });
  
  await prisma.paper.updateMany({
    where: { id: '8fa5219a-4da3-4c9e-8060-64b67bc1c0fa', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/pergament.png')),
    }
  });

  await prisma.picture.updateMany({
    where: { id: {
      in: ['f779128e-e838-4688-b750-2ab12e41a7e3', '04f82858-b0c7-4df7-acf7-f7170af9af91', '6b7956cd-7371-483b-97fe-89903abbdb5b', 'f013b7b8-e9dc-404b-8dcf-6bc5b6427360', '13a5e1bc-62e1-4528-a7b3-e86d5a1f0c82', '7c38031d-66df-4bea-bb54-1391b386b095']
    }, 
    picture: null},
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/kalka-main.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: {
      in: ['e6d3054e-df9a-45be-8224-76169e145a6b', 'dce35ff5-89ea-4559-b6af-0a87934870b8', '17493f82-86fa-4b39-b6e2-303b95af9078', '07738281-47b3-48c8-aeda-f9973db7d818', 'b0af73df-d997-4784-a14c-e02a62ceb54c', 'dd7f2cd0-7ef9-498e-8657-c1059727b5a8']
    }, 
    picture: null},
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/kalka-texture.png')),
      type: 'image/png'
    }
  });

  //NEWS
  await prisma.picture.updateMany({
    where: { id: 'b486a497-82aa-419a-9921-b3a567fff653', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/news-1.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: '13d88676-f686-462e-840b-e868294b47fb', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/news-2.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: '7b4a066d-2876-4444-a318-4945dfa967f6', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/news-3.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: '74e53ba1-c891-4f52-81a3-0cc609be4ac0', picture: null },
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/news-4.png')),
      type: 'image/png'
    }
  });

  // UPAKOVKA
  await prisma.picture.updateMany({
    where: { id: {
      in: ['b3519428-56e5-4ffe-b7d4-b59cb669bf85', '74f081bd-b37f-48a0-9b76-4bf4d7798c5d', '6756c9cc-8114-4742-9efd-23f3b49a0ca8', '551dfd7c-98c9-4b74-967b-71661b1b2fac', '37d3a188-2189-40b6-8988-73d8e3f7d962', '58009d66-cd8f-439b-8701-516b5d108d4b']
    }, 
    picture: null},
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/upakovka-main.jpg')),
      type: 'image/jpg'
    }
  });
  // KRAFT
  await prisma.picture.updateMany({
    where: { id: {
      in: ['0aabe810-304c-4c10-8380-770f755c1d89', '55a9b08c-afd2-456a-b465-54388721bed4', 'd51be222-b4b1-4a26-9e23-afee59ae29ba', 'd1940a28-b825-40fe-be7b-8caf4548953f', '0bcb7afc-10ac-4aae-9691-aebdf8d635f5', 'a27bb961-57c0-4476-a925-23767ee58314']
    }, 
    picture: null},
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/kraft-main.png')),
      type: 'image/png'
    }
  });

  await prisma.picture.updateMany({
    where: { id: {
      in: ['5a4c2914-9e57-4ba4-bb45-f6f4742acb5f', '43ec6e29-2792-417a-b91d-d376cea9c47b']
    }, 
    picture: null},
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/kraft-list-main.jpg')),
      type: 'image/jpg'
    }
  });

  await prisma.picture.updateMany({
    where: { id: {
      in: ['0daaa188-43a8-4089-be9c-487d03cdbbd0', '236c62a1-a188-4fd3-8ec2-e7be5438d8db', 'f6a8df09-4b1c-4239-9f71-3689dd155366', '00c1681c-c147-41b3-8c87-da681701c31f', '493bc9c1-04f5-4324-a0ea-554cda945657', '3c3f086a-6b50-4e14-aede-194606019eb7', '661096f8-376c-484b-9bba-5b5e8569f1b7', '1cb9f0ba-0527-4dc4-af9f-6632274c04bc']
    }, 
    picture: null},
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/kraft-texture.png')),
      type: 'image/png'
    }
  });
  // KOORD
  // orange
  await prisma.picture.updateMany({
    where: { id: {
      in: ['cd6e8f76-48d2-48b7-9c03-2109779a07a0', '02ff8f09-a8a8-411d-bba9-a14fdd89c166', '86a38346-a45b-4fd5-8ce3-3ca5a5382de2', '5e182c5e-216a-4a8b-a38a-96404256f201', 'd77fc3ff-c4ef-439d-afbb-164d426dc2a8', '38cfac9b-66e1-425e-81ce-2dda5038b033']
    }, 
    picture: null},
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/koord/koord-orange-main.jpg')),
      type: 'image/jpg'
    }
  });

  await prisma.picture.updateMany({
    where: { id: {
      in: ['05455a60-2483-43f9-b68a-dd07cf0b0709', 'cd60887e-58c9-49dc-b06e-e76a113e45b1', '14533ed2-4d42-4c32-8363-a6840318fce4', '32fecdf2-823e-4f86-af51-02fd9c508844', '7b758a17-069c-439f-a813-f019e707873b', 'da5bfe1a-76e7-4a91-b8fe-6ee63db3be33']
    }, 
    picture: null},
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/koord/koord-orange-texture.jpg')),
      type: 'image/jpg'
    }
  });
  //blue
  await prisma.picture.updateMany({
    where: { id: {
      in: ['8ea1ee8a-36ac-4549-945c-cdf7efb62b25']
    }, 
    picture: null},
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/koord/koord-blue-list-main.jpg')),
      type: 'image/jpg'
    }
  });

  await prisma.picture.updateMany({
    where: { id: {
      in: ['6ef8cd97-de3f-4015-b0ec-e680484b9f45', '91e5dc74-b7aa-45c6-95f4-cbf9ac266c99', '47938877-2ec2-463c-bb1c-2befbc33d02f', 'f5f91296-1142-4eb9-b90c-23d1b6688369', '403fa11b-a694-4e44-8886-e464ffdccd0d', '45d7eec4-6a17-4af4-a8eb-20537e156f5a']
    }, 
    picture: null},
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/koord/koord-blue-main.jpg')),
      type: 'image/jpg'
    }
  });

  await prisma.picture.updateMany({
    where: { id: {
      in: ['f0c09db8-3d26-4d2e-99e6-c1d4196b65cd', 'c093558d-095a-4c0f-a5b3-a17e705884bb', 'b02b3736-1ff3-460b-86ae-c9e98d8b3a12', 'f2e3f83c-dc09-4e08-8b80-311fe1398354', '338c66d6-10e1-4277-99bb-d13264d378a6', '27e586b2-c14a-4d2d-b653-746a6bd85313', '6fef3ecd-df64-479c-a62a-5724878b5598']
    }, 
    picture: null},
    data: {
      picture: fs.readFileSync(path.join(__dirname, '../seed/seed-pictures/koord/koord-blue-texture.jpg')),
      type: 'image/jpg'
    }
  });
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