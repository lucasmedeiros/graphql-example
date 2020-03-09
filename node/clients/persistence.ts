import { ID, InstanceOptions, IOContext, JanusClient, VBase } from '@vtex/api'
import { Product as GraphQLProduct, ProductInput } from 'vtex.graphql-example'

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
    return products.find(product => product.id === ((id as unknown) as string))
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

    return { ...product, id: products.length }
  }

  public async remove(vbase: VBase, id: string) {
    try {
      const products = await this.getAll(vbase)
      const output = products.filter(product => product.id !== id)
      const productRemoved = products.find(product => product.id === id)
      await vbase.saveJSON<GraphQLProduct[]>(this.bucket, this.path, output)
      return productRemoved
    } catch (e) {
      return {}
    }
  }
}
