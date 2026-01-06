import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const articles = await prisma.article.findMany();
    console.log("Articles in DB:", articles);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
