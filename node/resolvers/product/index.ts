import { Product } from 'vtex.graphql-example'
import { ID } from '@vtex/api'

export const Query = {
  product: (
    _: unknown,
    { id }: { id: ID },
    { clients: { persistence, vbase } }: Context
  ) => persistence.get(vbase, id),

  products: (
    _: unknown,
    __: undefined,
    { clients: { persistence, vbase } }: Context
  ) => persistence.getAll(vbase),
}

export const Mutation = {
  addOrUpdateProduct: async (
    _: unknown,
    { product }: { product: Product },
    { clients: { persistence, vbase } }: Context
  ) => persistence.save(vbase, product),
}
