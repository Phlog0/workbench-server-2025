//bunx prisma db seed
import "dotenv/config";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("Нет URL для БД");
}
const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
    await prisma.project.createMany({
        data: [
            {
                title: "КТП-1",
                description: "Lolololololololol",
                projectType: "КТП",
                markerColor: "red",
                position: "Kaluga",
            },
            {
                title: "КТП-2",
                description: "Lolololololololol",
                projectType: "КТП",
                markerColor: "red",
                position: "Kaluga",
            },
            {
                title: "КТП-3",
                description: "Lolololololololol",
                projectType: "РП",
                markerColor: "red",
                position: "Kaluga",
            },
            {
                title: "КТП-4",
                description: "Lolololololololol",
                projectType: "КТП",
                markerColor: "red",
                position: "Kaluga",
            },
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
