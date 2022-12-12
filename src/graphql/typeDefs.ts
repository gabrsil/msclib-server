import { gql } from "apollo-server";

export default gql`
  input AlbumInput {
    name: String!
    releaseDate: Date!
    artistId: String!
    imgUrl: String
  }

  type AlbumPayload {
    errors: [Error!]
    album: AlbumType
  }

  type AlbumType {
    id: ID
    name: String
    artist: ArtistType
    releaseDate: Date
    imgUrl: String
  }

  input ArtistInput {
    name: String!
    debutDate: Date!
    genreId: String!
  }

  type ArtistPayload {
    errors: [Error!]
    artist: ArtistType
  }

  type ArtistType {
    id: ID
    name: String
    debutDate: Date
    albums: [AlbumType]
    genre: GenreType
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginPayload {
    user: User
  }

  """
  Date custom scalar type
  """
  scalar Date

  type Error {
    message: String
  }

  input GenreInput {
    name: String!
  }

  type GenrePayload {
    genre: GenreType
  }

  type GenreType {
    id: ID
    name: String
    artists: ArtistType
  }

  type GetAlbumByIdType {
    album: AlbumType
  }

  type GetArtistByIdType {
    artist: ArtistType
  }

  input GetByIdType {
    id: String!
  }

  type Reproduction {
    id: ID
    createdDate: Date
    user: User
    album: AlbumType
  }

  type Rating {
    id: ID
    value: Int
    user: User
  }

  type User {
    id: ID
    name: String
    email: String
    password: String
    bornDate: Date
    createdAt: String
    currentToken: String
    reproductions: [Reproduction]
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    bornDate: String!
  }

  type CreateUserPayload {
    user: User
  }

  input CreateReproductionInput {
    userId: String!
    albumId: String!
  }

  type ReproductionPayload {
    reproduction: Reproduction
  }

  type GetReproductionByUserPayload {
    reproductions: [Reproduction]
  }

  type Mutation {
    createNewAlbum(input: AlbumInput!): AlbumPayload!
    createNewArtist(input: ArtistInput!): ArtistPayload!
    createNewGenre(input: GenreInput!): GenrePayload!
    createNewUser(input: CreateUserInput!): CreateUserPayload!
    createNewReproduction(input: CreateReproductionInput!): ReproductionPayload
    loginUser(input: LoginInput!): LoginPayload!
  }

  type Query {
    getAllAlbums: [AlbumType]
    getAlbumById(input: GetByIdType!): GetAlbumByIdType
    getArtistById(input: GetByIdType!): GetArtistByIdType
    getReproductionByUser(input: GetByIdType!): GetReproductionByUserPayload
  }
`;
