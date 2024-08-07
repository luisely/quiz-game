import { FormEvent, MouseEvent, useCallback, useMemo, useState } from 'react'
import Timer from './Timer'
import dayjs from 'dayjs'
import click from './assets/click.mp3'
import { IScore, useScore } from './hooks/useScore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface QuestionProps {
  currentQuestion: number
  life: number
  setOptionSelected: (value: string) => void
  gameOver: boolean
  points: number
  errors: number
  questionsObj: {
    question: string
    options: Array<string | number>
    answer: string
    hasBeenUsed: boolean
  }[]
}

export function Question({
  currentQuestion,
  gameOver,
  questionsObj,
  setOptionSelected,
  points,
  errors,
}: QuestionProps) {
  const audio = new Audio(click)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [active, setActive] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  const { data, refetch, isFetching, isPending: isScorePending } = useScore()

  const queryClient = useQueryClient()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const date = new Date().toISOString()

    audio.volume = 0.2
    audio.play()
    setOptionSelected(e.currentTarget.value)

    if (questionsObj.length === 40) {
      setStartTime(date)
      setActive(true)

      setTimeout(
        () => {
          setActive(false)
        },
        1000 * 60 * 8,
      )
    }

    if (questionsObj.length === 1) {
      setEndTime(new Date().toISOString())
      refetch()
      setActive(false)
    }
  }

  const diffTime = useCallback(() => {
    return dayjs(endTime).diff(startTime, 'seconds')
  }, [endTime, startTime])

  const generateFinalScore = (
    acertos: number,
    erros: number,
    tempoGasto: number,
  ) => {
    const pontosPorAcerto = 10
    const deducaoPorErro = 5
    const tempoReferencia = 1200
    const fatorTempo = 20

    const pontosAcertos = acertos * pontosPorAcerto

    const pontosErros = erros * deducaoPorErro

    const ajusteTempo =
      ((tempoReferencia - tempoGasto) / tempoReferencia) * fatorTempo

    const placarFinal = pontosAcertos - pontosErros + ajusteTempo

    return placarFinal.toFixed(2)
  }

  const generateFinalScoreMemo = useMemo(
    () => generateFinalScore(points, errors, diffTime()),
    [points, errors, diffTime],
  )

  const { mutate, isSuccess } = useMutation({
    mutationFn: async ({
      pk,
      score,
      playerName,
      date,
      time,
    }: {
      pk: string
      score: number
      playerName: string
      date: string
      time: number
    }): Promise<IScore> => {
      const res = await fetch(
        'https://uizr4o9b8f.execute-api.us-east-1.amazonaws.com/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pk,
            score: Number(score),
            playerName,
            date,
            time,
          }),
        },
      )

      return res.json()
    },
    onError: (error) => {
      console.log('Erro ao carregar o score', error.toString())
    },
    onSuccess: () => {
      refetch()
    },
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    mutate({
      pk: 'game_001-2024',
      score: Number(generateFinalScoreMemo),
      playerName,
      date: new Date().toISOString(),
      time: diffTime(),
    })
  }

  function handleAtualizar() {
    refetch()
    setButtonDisabled(true) // Desativa o botão

    setTimeout(() => setButtonDisabled(false), 60 * 1000)
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[97%] w-full">
        <span
          data-isover={gameOver}
          className="text-2xl md:text-3xl font-bold h-40 flex items-center justify-center m-2 text-[#B69E7A] data-[isover=true]:text-4xl data-[isover=true]:h-1"
        >
          {!gameOver ? questionsObj[currentQuestion].question : ''}
        </span>

        {gameOver ? (
          ''
        ) : (
          <hr className="border-none bg-[url('../pics/bar.webp')] bg-center h-[30px] bg-no-repeat w-[90%] md:w-full m-2" />
        )}

        {gameOver && (
          <div className="grid grid-cols-2 grid-rows-[1fr_4fr_1fr] grid-flow-col h-full w-full p-2">
            <div className="flex flex-col text-xl w-full h-full">
              <h1 className="text-3xl md:text-6xl mb-4 font-semibold text-slate-100 font-serif-giz">
                pontuação
              </h1>
            </div>
            <div className="flex flex-col justify-center w-full h-full font-serif ">
              <div className=" mb-6">
                <span className="text-yellow-600 text-3xl md:text-6xl shadow-lg">
                  {generateFinalScoreMemo}
                </span>
              </div>
              <div className="flex flex-col md:text-xl">
                <span>Tempo: {diffTime()} sec</span>
                <span>Acertos: {points}</span>
                <span>Erros: {errors}</span>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <form onSubmit={handleSubmit}>
                <input
                  spellCheck={false}
                  max={8}
                  maxLength={8}
                  type="text"
                  value={playerName}
                  disabled={isSuccess}
                  onChange={(e) => setPlayerName(e.currentTarget.value)}
                  className="bg-transparent placeholder-shown:text-center max-w-[70%] placeholder:opacity-40 rounded w-60 border border-stone-600 text-base text-center h-10 outline-none"
                  placeholder="Grave seu nome!"
                />
                <button
                  disabled={isSuccess}
                  type="submit"
                  className="h-10 outline-none bg-stone-800/35 w-60 rounded max-w-[70%] hover:bg-[#B69E7A]/15 mt-2 font-serif text-lg text-stone-300 disabled:pointer-events-none"
                >
                  Enviar
                </button>
              </form>
            </div>
            <div>
              <h1 className="text-3xl md:text-6xl mb-4 text-slate-100 font-semibold font-serif-giz">
                top 10
              </h1>
            </div>
            <div className="flex flex-col justify-between text-xl w-full h-full font-serif row-span-2 text-[#BAB0A3]">
              <div className="space-y-1 mr-8">
                {isScorePending && <span></span>}
                <div className="grid grid-cols-3 grid-rows-[1/5_2/5_2/5] text-start text-yellow-100">
                  <div className="text-sm md:text-lg text-end px-6">#</div>
                  <div className="text-sm md:text-lg">Nome</div>
                  <div className="text-sm md:text-lg text-end">Pts</div>
                </div>
                <div className="flex justify-end">
                  <hr className="w-[80%] flex items-center opacity-10 justify-end" />
                </div>

                {data?.gameScore.map((score, index) => (
                  <div
                    key={score.id}
                    className="grid grid-cols-3 grid-rows-[1/5_2/5_2/5] text-start"
                  >
                    <div className="text-sm md:text-xl text-end px-6">
                      <span>{index + 1}</span>
                    </div>
                    <div
                      data-index={index === 0}
                      className="text-sm md:text-xl"
                    >
                      {score.playerName}
                    </div>
                    <div className="text-sm md:text-xl text-end">
                      {score.score}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <button
                  disabled={isButtonDisabled || isFetching}
                  onClick={handleAtualizar}
                  className="h-10 outline-none bg-stone-800/35 w-60 rounded max-w-[70%] hover:bg-[#B69E7A]/15 font-serif text-lg text-stone-300 disabled:pointer-events-none disabled:text-opacity-5"
                >
                  {isButtonDisabled || isFetching ? '...' : 'Atualizar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {!gameOver && (
          <>
            <div className="grid md:grid-cols-2 md:grid-rows-[70px_70px] h-full w-full p-[10px]">
              {questionsObj[currentQuestion].options.map((option, index) => (
                <button
                  className="text-[#BAB0A3] text-2xl md:text-2xl border-0 text-left hover:text-[#DBA864] transition-colors duration-200 outline-none"
                  key={index}
                  value={index}
                  onClick={handleClick}
                >
                  <li className="list-none bg-no-repeat bg-[url('../pics/lista.webp')] bg-left pl-10">
                    {option}
                  </li>
                </button>
              ))}
            </div>

            <hr className="border-none bg-center h-[30px] bg-no-repeat w-[90%] md:w-full bg-[url('../pics/bar.webp')] m-2" />

            <div
              data-isover={gameOver}
              className="flex w-[95%] text-sm md:text-xl justify-between text-[#BAB0A3] md:leading-tight leading-tight"
            >
              <div className="flex flex-col items-baseline">
                <span className="text-[#F1FF75]">
                  <span className="mr-1">Acertos/Erros:</span>
                  {points}/<span className="text-[#BAB0A3]">{errors}</span>
                </span>
                <Timer status={active} />
              </div>
              <div className="flex flex-col items-end">
                <span>Acerte o máximo que conseguir!</span>
                <span>Resta {questionsObj.length}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
