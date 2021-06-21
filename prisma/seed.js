import { PrismaClient } from '@prisma/client'
import { users, categories } from './seeders'
const prisma = new PrismaClient()

async function seed() {
  for (const c of categories) {
    const category = await prisma.category.upsert({create: c})
    console.log(`Created category with id: ${category.id}`)
  }
  for (const u of users) {
    const user = await prisma.user.create({data: u})
    console.log(`Created user with id: ${user.id}`)
  }
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  