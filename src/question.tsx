import { MouseEvent, useCallback, useMemo, useState } from 'react';
import Timer from './Timer';
import dayjs from 'dayjs';

interface QuestionProps {
  currentQuestion: number
  life: number
  setOptionSelected: (value: string) => void
  gameOver: boolean,
  points: number;
  errors: number;
  questionsObj: {
    question: string,
    options: Array<string | number>,
    answer:string,
    hasBeenUsed: boolean
  }[]
}

export function Question( { currentQuestion, gameOver, questionsObj, setOptionSelected, points, errors}: QuestionProps) {

  const audio = new Audio("../audios/click.wav")
  const [startTime, setStartTime ] = useState('')
  const [endTime, setEndTime ] = useState('')
  const [active, setActive] = useState(false)

  const handleClick =(e: MouseEvent<HTMLButtonElement>) => {

    const date = new Date().toISOString()

    audio.volume = 0.2
    audio.play()
    setOptionSelected(e.currentTarget.value)

    if(questionsObj.length === 40){
      setStartTime(date)
      setActive(true)
    }


    if(questionsObj.length === 1){
      setEndTime(new Date().toISOString())
      setActive(false)
    }
  }


  const diffTime = useCallback(() => {
    return dayjs(endTime).diff(startTime, 'seconds')
  },[endTime, startTime])

  const generateFinalScore = (acertos: number, erros: number, tempoGasto: number) => {
    const pontosPorAcerto = 10
    const deducaoPorErro = 5 
    const tempoReferencia = 1200
    const fatorTempo = 20

    const pontosAcertos = acertos * pontosPorAcerto;
    
    const pontosErros = erros * deducaoPorErro;
    
    const ajusteTempo = ((tempoReferencia - tempoGasto) / tempoReferencia) * fatorTempo;
    
    const placarFinal = pontosAcertos - pontosErros + ajusteTempo;
    
    return placarFinal.toFixed(2);
  }

  const generateFinalScoreMemo = useMemo(() => generateFinalScore(points, errors, diffTime() ), [points, errors, diffTime])


  return (
    <>
      <div className='flex flex-col justify-center items-center h-[97%]'>
        <span data-isover={gameOver} className='text-2xl md:text-3xl font-bold h-40 flex items-center justify-center m-2 text-[#B69E7A] data-[isover=true]:text-4xl'>
          {!gameOver ? questionsObj[currentQuestion].question : ('GAME OVER')}
        </span>

        <hr className="border-none bg-[url('../pics/bar.webp')] bg-center h-[30px] bg-no-repeat w-[90%] md:w-full m-2" />

        {gameOver && (
            <div className='flex flex-col items-center justify-center text-2xl md:text-3xl w-full h-full'>
              <span>Seu tempo: {diffTime()} sec</span>
              <span>Acertos: {points}</span>
              <span>Erros: { errors }</span>
              <span className='text-[#F1FF75] text-3xl md:text-4xl mt-16'>Total: {generateFinalScoreMemo }</span>
            </div>
            
          )}

        {!gameOver && 
          (<div className='grid md:grid-cols-2 md:grid-rows-[70px_70px] h-full w-full p-[10px]'>
            {questionsObj[currentQuestion].options.map((option, index) => (
              <button
                className='text-[#BAB0A3] text-2xl md:text-2xl border-0 text-left hover:text-[#DBA864] transition-colors duration-200 outline-none'
                key={index}
                value={index} 
                onClick={handleClick}
              >
                <li className="list-none bg-no-repeat bg-[url('../pics/lista.webp')] bg-left pl-10">{option}</li>
              </button>
            ))}

          </div>)}

        <hr className="border-none bg-center h-[30px] bg-no-repeat w-[90%] md:w-full bg-[url('../pics/bar.webp')] m-2" />

        <div className='flex w-[95%] text-sm md:text-xl justify-between text-[#BAB0A3] md:leading-tight leading-tight'>

          <div className='flex flex-col items-baseline'>
            <span className='text-[#F1FF75]'>Acertos/Erros: {points}/{errors}</span>
            <Timer status={active} />
          </div>
          <div className='flex flex-col items-end'>
            <span>Acerte o máximo que conseguir!</span>
            <span>Resta {questionsObj.length}</span>
          </div>
        </div>
      </div>
  </>
  )
}
