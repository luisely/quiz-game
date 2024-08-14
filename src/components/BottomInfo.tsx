import { useStore } from '../store'
import { quizQuestions } from '../store/questions'
import Timer from './Timer'

export function BottomInfo() {
  const points = useStore((state) => state.points)
  const errors = useStore((state) => state.errors)
  const currentQuestion = useStore((state) => state.currentQuestion)

  return (
    <div className="flex w-[95%] text-sm md:text-xl justify-between text-[#BAB0A3] md:leading-tight leading-tight">
      <div className="flex flex-col items-baseline">
        <div>
          <span className="mr-1">Acertos/Erros:</span>
          {points}/{errors}
        </div>
        <Timer />
      </div>
      <div className="flex flex-col items-end">
        <span>Acerte o máximo que conseguir!</span>
        <span>Resta {quizQuestions.length - currentQuestion}</span>
      </div>
    </div>
  )
}
