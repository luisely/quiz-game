import { useEffect, useMemo } from 'react'
import { useStore } from '../../store/useStore'
import { generateFinalScore } from '../../app/utils/generateFinalScore'

export function UserScore() {
  const points = useStore((state) => state.points)
  const errors = useStore((state) => state.errors)
  const timePassed = useStore((state) => state.timePassed)
  const setUserFinalScore = useStore((state) => state.setUserFinalScore)

  const generateFinalScoreMemo = useMemo(
    () => generateFinalScore(points, errors, timePassed),
    [points, errors, timePassed],
  )

  useEffect(() => {
    setUserFinalScore(generateFinalScoreMemo)
  }, [generateFinalScoreMemo, setUserFinalScore])

  return (
    <>
      <div className="flex flex-col text-xl w-full h-full">
        <h1 className="text-3xl md:text-6xl font-semibold text-slate-100 font-serif-giz">
          pontuação
        </h1>
      </div>
      <div className="flex flex-col justify-center w-full h-full font-serif ">
        <div className=" mb-6">
          <span className="text-yellow-600 text-3xl md:text-6xl shadow-lg">
            {generateFinalScoreMemo || ''}
          </span>
        </div>
        <div className="flex flex-col md:text-xl text-stone-200">
          <span>Tempo: {timePassed || 0} sec</span>
          <span>Acertos: {points}</span>
          <span>Erros: {errors}</span>
        </div>
      </div>
    </>
  )
}
