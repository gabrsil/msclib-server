import { PrismaClient } from ".prisma/client";
import { ApolloError } from "apollo-server";

interface FriendshipInput {
  input: {
    sourceId: string;
    targetId: string;
  };
}

interface FriendshipQuery {
  input: {
    sourceId: string;
  };
}

interface AcceptFriendshipInput {
  input: {
    sourceId: string;
    targetId: string;
    friendshipId: string;
  };
}

const prisma = new PrismaClient();

const getFriendshipByUser = async (_: any, { input }: FriendshipQuery) => {
  const { sourceId } = input;

  await prisma.user;
  const userExists = await prisma.user.findUnique({
    where: {
      id: sourceId,
    },
  });

  if (!userExists) {
    throw new ApolloError("A user doesnt exist by the provided id.", "404");
  }

  const friendships = await prisma.friendship.findMany({
    where: {
      sourceId,
    },
    select: {
      id: true,
      sourceUser: true,
      targetUser: true,
    },
  });

  return {
    friendships,
  };
};

const acceptFriendship = async (_: any, { input }: AcceptFriendshipInput) => {
  const { friendshipId, sourceId, targetId } = input;

  const sourceUserExists = await prisma.user.findUnique({
    where: {
      id: sourceId,
    },
  });

  if (!sourceUserExists) {
    throw new ApolloError(
      "A source user doesnt exist by the provided id.",
      "404"
    );
  }

  const targetUserExists = await prisma.user.findUnique({
    where: {
      id: targetId,
    },
  });

  if (!targetUserExists) {
    throw new ApolloError(
      "A target user doesnt exist by the provided id.",
      "404"
    );
  }

  const friendshipExists = await prisma.friendship.findUnique({
    where: {
      id: friendshipId,
    },
  });

  if (!friendshipExists) {
    throw new ApolloError(
      "A target user doesnt exist by the provided id.",
      "404"
    );
  }

  const updatedFriendship = await prisma.friendship.update({
    where: {
      id: friendshipId,
    },
    data: {
      status: "ACCEPTED",
    },
  });

  return {
    friendship: updatedFriendship,
  };
};

const createNewFriendShip = async (_: any, { input }: FriendshipInput) => {
  const { sourceId, targetId } = input;

  const sourceUser = await prisma.user.findUnique({
    where: {
      id: sourceId,
    },
  });

  const targetUser = await prisma.user.findUnique({
    where: {
      id: targetId,
    },
  });

  const existFriendship = await prisma.friendship.findMany({
    where: {
      sourceId,
      targetId,
    },
  });

  if (existFriendship) {
    throw new ApolloError(
      "A friendship already exists with the source user and target user.",
      "400"
    );
  }

  if (!sourceUser) {
    throw new ApolloError(
      "A source user doesnt exist by the provided id.",
      "404"
    );
  }
  if (!targetUser) {
    throw new ApolloError(
      "A target user doesnt exist by the provided id.",
      "404"
    );
  }

  const friendship = await prisma.friendship.create({
    data: {
      sourceId,
      targetId,
      status: "PENDING",
    },
    select: {
      sourceUser: true,
      targetUser: true,
    },
  });

  return { friendship };
};

export default {
  mutation: { createNewFriendShip },
  query: { getFriendshipByUser, acceptFriendship },
};
