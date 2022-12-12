import { PrismaClient } from "@prisma/client"
import { ApolloError } from "apollo-server"

interface ArtistInput {
    input: {
        name: string
        debutDate: string
        genreId: string
    }
}

interface IGetById {
    input: {
        id: string
    }
}

const prisma = new PrismaClient()

const createNewArtist = async (_: any, { input }: ArtistInput) => {
    const { genreId } = input

    const existingGenre = await prisma.genre.findUnique({
        where: {
            id: genreId
        }
    })

    if(!existingGenre) {
        throw new ApolloError('A artist doesnt exist by the provided id.', '404')
    }

    const artist = await prisma.artist.create({
        data: {
            ...input
        }
    })

    return { artist }
}

const getArtistById = async (_: any, params: IGetById) => {
    const artist = await prisma.artist.findUnique({
        where: {
            id: params?.input?.id
        },
        include: { albums: true }
    })

    if(!artist) {
        throw new ApolloError('A artist doesnt exist by the provided id.', '404')
    }

    return { artist }
}

export default { query: { getArtistById }, mutation: { createNewArtist } }