import { InstanceOptions, IOContext, JanusClient, VBase } from '@vtex/api'

export class Persistence extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public get(vbase: VBase) {
    return vbase.getJSON<Product>()
  }
}
