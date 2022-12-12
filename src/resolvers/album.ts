import { PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server";

const prisma = new PrismaClient();

interface AlbumInput {
  input: {
    name: string;
    releaseDate: string;
    artistId: string;
    imgUrl?: string;
  };
}

interface IGetById {
  input: {
    id: string;
  };
}

const createNewAlbum = async (_: any, params: AlbumInput) => {
  const { input } = params;
  const { artistId } = input;

  const existingArtist = await prisma?.artist?.findUnique({
    where: {
      id: artistId,
    },
  });

  if (!existingArtist) {
    throw new ApolloError("A artist doesnt exist by the provided id.", "404");
  }

  const album = await prisma?.album?.create({
    data: {
      ...input,
    },
  });

  return { album };
};

const getAlbumById = async (_: any, { input }: IGetById) => {
  const album = await prisma.album.findUnique({
    where: {
      id: input?.id,
    },
    include: { artist: { include: { genre: true } } },
  });

  if (!album) {
    throw new ApolloError("A album doesnt exist by the provided id.", "404");
  }

  return { album };
};

const getAllAlbums = async () => await prisma.album.findMany();

export default {
  query: { getAllAlbums, getAlbumById },
  mutation: { createNewAlbum },
};
