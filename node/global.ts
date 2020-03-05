import { RecorderState, ServiceContext } from '@vtex/api'

import { Clients } from './clients'

declare global {
  interface State extends RecorderState {
    collectionId?: string
  }

  type Context = ServiceContext<Clients, State>

  type Diff<T, U> = T extends U ? never : T
  type TypeFromNullable<T> = Diff<T, null | undefined>
  type TypeFromPromise<T> = T extends Promise<infer U> ? U : T
  type TypeFromArray<T> = T extends Array<infer U> ? U : T
  type FunctionType = (...args: any) => any

  type ResolverReturnType<T extends FunctionType> = TypeFromNullable<
    TypeFromArray<TypeFromPromise<ReturnType<T>>>
  >
}
