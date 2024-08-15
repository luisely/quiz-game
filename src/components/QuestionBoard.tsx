import { useStore } from '../store/useStore'
import { quizQuestions } from '../store/questions'
import { Bar } from './Bar'
import { BottomInfo } from './BottomInfo'
import { ButtonOption } from './ButtonOption'

export function QuestionBoard() {
  const gameOver = useStore((state) => state.gameOver)
  const currentQuestion = useStore((state) => state.currentQuestion)

  return !gameOver ? (
    <>
      <div className="grid md:grid-cols-2 md:grid-rows-[70px_70px] h-full w-full p-2">
        {quizQuestions[currentQuestion].options.map((option, index) => (
          <ButtonOption index={index} key={index}>
            {option}
          </ButtonOption>
        ))}
      </div>

      <Bar />

      <BottomInfo />
    </>
  ) : null
}
