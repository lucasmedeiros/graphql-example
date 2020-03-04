import {
  Example,
  Mutation as exampleMutations,
  Query as exampleQueries,
} from './example'

export const resolvers = {
  ...Example,
  Mutation: {
    ...exampleMutations,
  },
  Query: {
    ...exampleQueries,
  },
}
