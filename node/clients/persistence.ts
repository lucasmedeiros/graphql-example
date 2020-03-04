import { InstanceOptions, IOContext, JanusClient, VBase } from '@vtex/api'
import { Product as GraphQLProduct } from 'vtex.graphql-example'

export default class Product extends JanusClient {
  private bucket = 'productsbucket'
  private path = ''

  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public get(vbase: VBase, id: string) {
    return vbase.getJSON<GraphQLProduct>(this.bucket, `${this.path}/${id}`)
  }

  public save(vbase: VBase, product: GraphQLProduct) {
    return vbase.saveJSON<GraphQLProduct>(
      this.bucket,
      `${this.path}/${product.id}`,
      product
    )
  }
}
