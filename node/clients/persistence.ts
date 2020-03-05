import { InstanceOptions, IOContext, JanusClient, VBase, ID } from '@vtex/api'
import { ProductInput, Product as GraphQLProduct } from 'vtex.graphql-example'

export default class Product extends JanusClient {
  private bucket = 'productsbucket'
  private path = 'rerisson'

  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public async get(vbase: VBase, id: ID) {
    const products = await this.getAll(vbase)
    return products[+id]
  }

  public async getAll(vbase: VBase) {
    try {
      return await vbase.getJSON<GraphQLProduct[]>(this.bucket, this.path)
    } catch (e) {
      return []
    }
  }

  public async save(vbase: VBase, product: ProductInput) {
    const products = await this.getAll(vbase)
    const newProduct: GraphQLProduct = { ...product, id: `${products.length}` }
    await vbase.saveJSON<GraphQLProduct[]>(this.bucket, this.path, [
      ...products,
      newProduct,
    ])

    return { product, id: products.length }
  }
}
