import { useCallback } from 'react'
import { useStore } from '../store'
import { quizQuestions } from '../store/questions'

export function useController() {
  const incrementErrors = useStore((state) => state.incrementErrors)
  const incrementPoints = useStore((state) => state.incrementPoints)
  const setGameOver = useStore((state) => state.setGameOver)
  const optionSelected = useStore((state) => state.optionSelected)
  const setOptionSelected = useStore((state) => state.setOptionSelected)

  const currentQuestion = useStore((state) => state.currentQuestion)
  const setCurrentQuestion = useStore((state) => state.setCurrentQuestion)
  // const questions = useStore((state) => state.questions)

  const handleOption = useCallback(() => {
    if (currentQuestion === quizQuestions.length - 1) {
      setGameOver(true)
      return
    }

    const { answer } = quizQuestions[currentQuestion]

    if (optionSelected === answer) {
      incrementPoints()
    } else {
      incrementErrors()
    }

    const remainingQuestions = quizQuestions.length - currentQuestion

    if (remainingQuestions === 0) {
      setGameOver(true)
      return
    }

    setCurrentQuestion(currentQuestion + 1)
    setOptionSelected(null)
  }, [
    currentQuestion,
    incrementErrors,
    incrementPoints,
    optionSelected,
    setCurrentQuestion,
    setGameOver,
    setOptionSelected,
  ])

  return {
    handleOption,
  }
}
