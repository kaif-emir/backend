import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaClient from "../generated/prisma/index.js";

const { PrismaClient } = prismaClient;

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });


export { prisma };
