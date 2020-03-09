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
    const newProduct: GraphQLProduct = {
      ...product,
      id: `${products.length + 1}`,
    }
    await vbase.saveJSON<GraphQLProduct[]>(this.bucket, this.path, [
      ...products,
      newProduct,
    ])

    return { ...product, id: products.length }
  }

  public async update(vbase: VBase, id: ID, product: ProductInput) {
    const products = await this.getAll(vbase)

    const newProducts = products.map(p =>
      p.id === ((id as unknown) as string) ? { ...product, id } : p
    ) as GraphQLProduct[]

    await vbase.saveJSON<GraphQLProduct[]>(this.bucket, this.path, newProducts)

    return newProducts.find(p => p.id === ((id as unknown) as string))
  }

  public async remove(vbase: VBase, id: ID) {
    try {
      const products = await this.getAll(vbase)
      const output = products.filter(
        product => product.id !== ((id as unknown) as string)
      )
      const productRemoved = products.find(
        product => product.id === ((id as unknown) as string)
      )
      await vbase.saveJSON<GraphQLProduct[]>(this.bucket, this.path, output)
      return productRemoved
    } catch (e) {
      return {}
    }
  }
}
