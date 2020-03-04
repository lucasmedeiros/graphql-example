import {
  Example,
  Mutation as exampleMutations,
  Query as exampleQueries,
} from './example'
import {
  Mutation as productMutations,
  Query as productQueries,
} from './product'

export const resolvers = {
  ...Example,
  Mutation: {
    ...exampleMutations,
    ...productMutations,
  },
  Query: {
    ...exampleQueries,
    ...productQueries,
  },
}
