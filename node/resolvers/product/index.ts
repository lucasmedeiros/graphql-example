import { Product } from 'vtex.graphql-example'

export const Query = {
  product: (_: unknown, { id }: { id: string }, ctx: Context) => {
    const {
      clients: { persistence, vbase },
    } = ctx
    return persistence.get(vbase, id)
  },
}

export const Mutation = {
  addOrUpdateProduct: async (
    _: unknown,
    { product }: { product: Product },
    ctx: Context
  ) => {
    const {
      clients: { persistence, vbase },
    } = ctx
    await persistence.save(vbase, product)
    return product
  },
}
