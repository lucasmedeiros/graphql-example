import { ID } from '@vtex/api'
import { ProductInput } from 'vtex.graphql-example'

export const Query = {
  product: async (
    _: unknown,
    { id }: { id: ID },
    { clients: { persistence, vbase } }: Context
  ) => await persistence.get(vbase, id),
  products: async (
    _: unknown,
    {},
    { clients: { persistence, vbase } }: Context
  ) => await persistence.getAll(vbase),
}

export const Mutation = {
  addProduct: async (
    _: unknown,
    { product }: { product: ProductInput },
    { clients: { persistence, vbase } }: Context
  ) => {
    console.log(product)
    return await persistence.save(vbase, product)
  },
  removeProduct: async (
    _: unknown,
    { id }: { id: string },
    { clients: { persistence, vbase } }: Context
  ) => await persistence.remove(vbase, id),
}

export const Product = {}
