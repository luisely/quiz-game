import { MouseEvent } from 'react'
import { useStore } from '../store'
import { quizQuestions } from '../store/questions'

export function useHandleOptionSelected() {
  const setStatusTimer = useStore((state) => state.setStatusTimer)
  const setStartTime = useStore((state) => state.setStartTime)
  const setEndTime = useStore((state) => state.setEndTime)
  const setTimePassed = useStore((state) => state.setTimePassed)
  const setGameOver = useStore((state) => state.setGameOver)
  const currentQuestion = useStore((state) => state.currentQuestion)
  const incrementErrors = useStore((state) => state.incrementErrors)
  const incrementPoints = useStore((state) => state.incrementPoints)
  const setCurrentQuestion = useStore((state) => state.setCurrentQuestion)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const TIMER_DURATION_MS = 1000 * 60 * 2
    const optionSelected = e.currentTarget.value

    /* BEGIN GAME, timer and END GAME if hit limit time */
    if (currentQuestion === 0) {
      setStartTime()
      setStatusTimer(true)

      setTimeout(() => {
        setStatusTimer(false)
        setGameOver(true)
      }, TIMER_DURATION_MS)
    }

    /* Check if selected choice is RIGHT or WRONG */
    if (optionSelected === quizQuestions[currentQuestion].answer) {
      incrementPoints()
    } else {
      incrementErrors()
    }

    /* ENG GAME if is last question end stop timer. */
    if (currentQuestion === quizQuestions.length - 1) {
      setGameOver(true)
      setEndTime()
      setTimePassed()
      setStatusTimer(false)
      return
    }

    /* Change to next question */
    setCurrentQuestion(currentQuestion + 1)
  }

  return {
    handleClick,
  }
}
