//bunx prisma db seed
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const projects = await prisma.project.createMany({
    data: [
      { title: "КТП-1", description: "Lolololololololol", projectType: "КТП" },
      { title: "КТП-2", description: "Lolololololololol", projectType: "РП" },
      { title: "КТП-3", description: "Lolololololololol", projectType: "ТП" },
      { title: "КТП-4", description: "Lolololololololol", projectType: "КТП" },
      { title: "КТП-5", description: "Lolololololololol", projectType: "РП" },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
