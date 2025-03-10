interface Loop {
  add: <T extends () => void>(
    newTask: T,
    option: {
      delay: number
      group?: string
    },
  ) => void
}
interface Task {
  deadline: number
  execute: () => void
  group: null | string
}

export function useLoop(): Loop {
  const stack: Task[] = []
  function add<T extends () => void>(
    newExecute: T,
    option: {
      delay: number
      group?: string
    },
  ): void {
    const deadline = Date.now() + secondToMillisecond(option.delay)
    const task = stack[0]
    if (task?.group !== option.group) {
      task?.execute()
    }
    stack.push({
      deadline,
      execute: newExecute,
      group: option.group || null,
    })
    loop()
  }
  function loop(): void {
    if (stack.length === 0) {
      return
    }
    const now = Date.now()
    for (const index in stack) {
      const task = stack[index]
      if (task.deadline < now) {
        task.execute()
        stack.splice(Number(index), 1)
      }
    }
    requestAnimationFrame(() => loop())
  }
  return {
    add,
  }
}
