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
  ) => await persistence.save(vbase, product),
  updateProduct: async (
    _: unknown,
    { id, product }: { id: ID; product: ProductInput },
    { clients: { persistence, vbase } }: Context
  ) => await persistence.update(vbase, id, product),
  removeProduct: async (
    _: unknown,
    { id }: { id: ID },
    { clients: { persistence, vbase } }: Context
  ) => await persistence.remove(vbase, id),
}

export const Product = {}
