import { PrismaClient } from "@prisma/client"

interface GenreInput {
    input: {
        name: string
    }
}

const prisma = new PrismaClient()

const createNewGenre = async (_: any, { input }: GenreInput) => {    
    const genre = await prisma.genre.create({
        data: {
            ...input
        }
    })

    return { genre }
}

export default { mutation: { createNewGenre } }