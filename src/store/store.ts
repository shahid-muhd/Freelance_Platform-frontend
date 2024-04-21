import { createStore } from 'zustand/vanilla'

export type ProjectState = {
  count: number
}

export type ProjectActions = {
  decrementCount: () => void
  incrementCount: () => void
}

export type ProjectStore = ProjectState & ProjectActions

export const defaultInitState: ProjectState = {
  count: 0,
}

export const createProjectStore = (
  initState: ProjectState = defaultInitState,
) => {
  return createStore<ProjectStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }))
}