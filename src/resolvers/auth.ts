import { PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server";
import { hash } from "../utils/hash";
import bcrypt from "bcrypt";
import { AuthService } from "../services/auth-service";
import { Response } from "express";

interface ICreateUser {
  input: {
    name: string;
    email: string;
    password: string;
    bornDate: string;
  };
}

interface ILoginUser {
  input: {
    email: string;
    password: string;
  };
}

const prisma = new PrismaClient();

const loginUser = async (
  _: any,
  params: ILoginUser,
  ctx: { res: Response }
) => {
  const { email, password } = params?.input;
  const { res } = ctx;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApolloError("A user not exist by the provided email.", "400");
  }

  const passwordsMatch: boolean = await bcrypt.compare(password, user.password);

  // If the password does not match, ensure the user is told about the authentication failing.
  if (!passwordsMatch) {
    throw new ApolloError(
      "The provided username or password is not correct.",
      "400"
    );
  }

  const newToken = await AuthService.newToken(user);

  res.cookie("token", newToken, {
    maxAge: 6 * 24 * 60 * 60 * 1000,
    domain: process.env.COOKIE_DOMAIN,
    sameSite: true,
  });

  const updatedUser = prisma.user.update({
    where: {
      email,
    },
    data: {
      currentToken: newToken,
    },
  });

  return {
    user: updatedUser,
  };
};

const createNewUser = async (_: any, params: ICreateUser) => {
  const { bornDate, email, name, password } = params?.input;

  name?.trim();
  password?.trim();
  email?.trim();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: params?.input.email,
    },
  });

  if (existingUser) {
    throw new ApolloError("A user already exist by the provided email.", "400");
  }

  const user = await prisma.user.create({
    data: {
      name,
      bornDate,
      email,
      password: await hash(password),
    },
  });

  return { user };
};

export default { query: {}, mutation: { createNewUser, loginUser } };
