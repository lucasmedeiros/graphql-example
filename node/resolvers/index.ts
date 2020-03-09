import {
  Example,
  Mutation as exampleMutations,
  Query as exampleQueries,
} from './example'

import {
  Mutation as productMutations,
  Product,
  Query as productQueries,
} from './product'

export const resolvers = {
  ...Example,
  ...Product,
  Mutation: {
    ...productMutations,
    ...exampleMutations,
  },
  Query: {
    ...productQueries,
    ...exampleQueries,
  },
}
