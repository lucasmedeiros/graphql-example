import { ParamsContext, RecorderState, Service } from '@vtex/api'

import { Clients, clients } from './clients'
import { resolvers } from './resolvers'

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  graphql: { resolvers },
})
