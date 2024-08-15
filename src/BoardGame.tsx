import { useEffect } from 'react'

import { useShallow } from 'zustand/react/shallow'
import { useScore } from './app/hooks/useScore'
import { Bar } from './components/Bar'
import { FinalScore } from './components/FinalScore'
import { QuestionBoard } from './components/QuestionBoard'
import { useToast } from './components/ui/use-toast'
import { quizQuestions } from './store/questions'
import { useStore } from './store/useStore'

export function BoardGame() {
  const { gameOver, currentQuestion } = useStore(
    useShallow((state) => ({
      gameOver: state.gameOver,
      currentQuestion: state.currentQuestion,
    })),
  )

  const { refetch } = useScore()
  const { toast } = useToast()

  useEffect(() => {
    if (gameOver) {
      refetch()
    }
  }, [gameOver, refetch, toast])

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[97%] w-full">
        <span
          data-isover={gameOver}
          className="text-2xl md:text-3xl font-bold h-40 flex items-center justify-center m-2 text-[#B69E7A] data-[isover=true]:text-4xl data-[isover=true]:h-1"
        >
          {!gameOver ? quizQuestions[currentQuestion].question : ''}
        </span>

        {gameOver ? '' : <Bar />}

        <FinalScore />
        <QuestionBoard />
      </div>
    </>
  )
}
