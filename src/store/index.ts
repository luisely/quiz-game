import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import dayjs from 'dayjs'

type Store = {
  points: number
  errors: number
  startTime: string
  endTime: string
  gameOver: boolean
  currentQuestion: number
  timePassed: number
  statusTimer: boolean
  userFinalScore: number
}

type Actions = {
  incrementPoints: () => void
  incrementErrors: () => void
  setStartTime: () => void
  setEndTime: () => void
  setGameOver: (value: boolean) => void
  setCurrentQuestion: (value: number) => void
  setStatusTimer: (value: boolean) => void
  setTimePassed: () => void
  setUserFinalScore: (score: number) => void
}

export const useStore = create<Store & Actions>()(
  immer((set) => ({
    points: 0,
    errors: 0,
    startTime: '',
    endTime: '',
    gameOver: false,
    currentQuestion: 0,
    timePassed: 0,
    statusTimer: false,
    optionSelected: null,
    userFinalScore: 0,
    incrementPoints: () =>
      set((state) => {
        state.points++
      }),
    incrementErrors: () =>
      set((state) => {
        state.errors++
      }),
    setStartTime: () => set({ startTime: new Date().toISOString() }),
    setEndTime: () =>
      set({
        endTime: new Date().toISOString(),
      }),
    setGameOver: (value: boolean) => set({ gameOver: value }),
    setCurrentQuestion: (value: number) => set({ currentQuestion: value }),
    setStatusTimer: (value: boolean) => set({ statusTimer: value }),
    setTimePassed: () =>
      set((state) => ({
        timePassed: dayjs(state.endTime).diff(state.startTime, 'seconds'),
      })),
    setUserFinalScore: (score: number) => set({ userFinalScore: score }),
  })),
)
