export const Query = {
  hello: (_: unknown, { name }: { name: string }) => {
    return `Hello ${name}!!!`
  },
}

export const Mutation = {
  changeHello: (_: unknown, { newName }: { newName: string }) => {
    return `Hello ${newName} from the mutation!!!!!`
  },
}

export const Example = {}
