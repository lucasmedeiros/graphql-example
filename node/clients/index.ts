import { AuthType, Cached, ClientsConfig, IOClients, LRUCache } from '@vtex/api'
import { forEachObjIndexed } from 'ramda'

import Persistence from './persistence'

const memoryCache = {
  attachment: new LRUCache<string, Cached>({ max: 4000 }),
}

forEachObjIndexed(
  (cacheInstance: LRUCache<string, Cached>, cacheName: string) => {
    /* global metrics */
    metrics.trackCache(cacheName, cacheInstance)
  },
  memoryCache
)

export class Clients extends IOClients {
  public get persistence() {
    return this.getOrSet('yourClientName', Persistence)
  }
}

export const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 1,
    },
    skusSheet: {
      authType: AuthType.bearer,
    },
  },
}
