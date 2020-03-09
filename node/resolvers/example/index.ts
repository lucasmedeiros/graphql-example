export const Query = {
  hello: (_: unknown, { name }: { name: string }) => {
    return `Produto ${name}!!!`
  },
}

export const Mutation = {
  changeHello: (_: unknown, { newName }: { newName: string }) => {
    return `Produto ${newName} from the mutation!!!!!`
  },
}

export const Example = {}
