import { PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server";

interface ReproductionInput {
  input: {
    userId: string;
    albumId: string;
  };
}

interface Reproduction<T = string> {
  input: {
    id: T;
  };
}

const prisma = new PrismaClient();

const createNewReproduction = async (_: any, { input }: ReproductionInput) => {
  const { albumId, userId } = input;

  const existingUser = await prisma?.user?.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw new ApolloError("A artist doesnt exist by the provided id.", "404");
  }

  const existingAlbum = await prisma?.album?.findUnique({
    where: {
      id: albumId,
    },
  });

  if (!existingAlbum) {
    throw new ApolloError("A artist doesnt exist by the provided id.", "404");
  }

  const reproduction = await prisma?.reproduction?.create({
    data: input,
    include: {
      album: {
        include: { artist: { include: { genre: true } } },
      },
      user: true,
    },
  });

  return { reproduction };
};

const getReproductionByUser = async (
  _: any,
  { input }: Reproduction<string>
) => {
  const { id } = input;

  const existingUser = await prisma?.user?.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    throw new ApolloError("A user doesnt exist by the provided id.", "404");
  }

  const reproductions = await prisma?.reproduction?.findMany({
    where: {
      userId: id,
    },
  });

  return { reproductions };
};

export default {
  query: { getReproductionByUser },
  mutation: { createNewReproduction },
};
