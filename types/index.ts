export type Task = {
  text: string
  checked: boolean
  owner: string
}

export type TaskWithId = Task & {
  id: string
}
