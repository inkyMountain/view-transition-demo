import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

interface ViewTransitionStore {
  activeColor: string
  setActiveColor(color: string): void
}

export const useViewTransitionStore = create(
  immer<ViewTransitionStore>((set) => {
    return {
      activeColor: "",
      setActiveColor(newColor) {
        set((store) => {
          store.activeColor = newColor
        })
      },
    }
  }),
)
