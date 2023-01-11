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

  type AlbumRating {
    id: ID
    userId: String
    albumId: String
    rating: Int
    comment: String
    user: User
    album: AlbumType
  }

  type Friendship {
    id: ID!
    sourceUser: User
    targetUser: User
  }

  input CreateUserInput {
    name: String! @constraint(minLength: 4, maxLength: 80)
    email: String! @constraint(format: "email", maxLength: 255)
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

  input CreateFriendshipInput {
    sourceId: String!
    targetId: String!
  }

  input GetFriendshipType {
    sourceId: String!
  }

  input AcceptFriendshipType {
    friendshipId: String!
    sourceId: String!
    targetId: String!
  }

  input CreateAlbumRatingInput {
    albumId: String
    comment: String
    rating: Int
    userId: String
  }

  type ReproductionPayload {
    reproduction: Reproduction
  }

  type GetReproductionByUserPayload {
    reproductions: [Reproduction]
  }

  type FriendshipPayload {
    friendships: Friendship
  }

  type GetFriendshipPayload {
    friendships: [Friendship]
  }

  type AcceptFriendshipPayload {
    friendship: Friendship
  }

  type AlbumRatingPayload {
    albumRating: AlbumRating
  }

  type Mutation {
    createNewAlbum(input: AlbumInput!): AlbumPayload!
    createNewArtist(input: ArtistInput!): ArtistPayload!
    createNewGenre(input: GenreInput!): GenrePayload!
    createNewUser(input: CreateUserInput!): CreateUserPayload!
    createNewReproduction(input: CreateReproductionInput!): ReproductionPayload
    createNewFriendShip(input: CreateFriendshipInput!): FriendshipPayload!
    createNewAlbumRating(input: CreateAlbumRatingInput!): AlbumRatingPayload!
    loginUser(input: LoginInput!): LoginPayload!
  }

  type Query {
    getAllAlbums: [AlbumType]
    getAlbumById(input: GetByIdType!): GetAlbumByIdType
    acceptFriendship(input: AcceptFriendshipType!): AcceptFriendshipPayload
    getFriendshipByUser(input: GetFriendshipType!): GetFriendshipPayload
    getArtistById(input: GetByIdType!): GetArtistByIdType
    getReproductionByUser(input: GetByIdType!): GetReproductionByUserPayload
  }
`;
