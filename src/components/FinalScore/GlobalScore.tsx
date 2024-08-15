import { useState } from 'react'
import { useScore } from '../../app/hooks/useScore'

export function GlobalScore() {
  const { data, refetch, isFetching } = useScore()

  const [isButtonDisabled, setButtonDisabled] = useState(false)

  function handleAtualizar() {
    refetch()
    setButtonDisabled(true) // Desativa o botão

    setTimeout(() => setButtonDisabled(false), 60 * 1000)
  }

  return (
    <>
      <div>
        <h1 className="text-3xl md:text-6xl text-slate-100 font-semibold font-serif-giz">
          top 10
        </h1>
      </div>
      <div
        data-ispending={isFetching}
        className="flex flex-col justify-between text-xl w-full h-full font-serif row-span-2 text-[#BAB0A3] ease-in-out data-[ispending=true]:opacity-0 transition-all duration-300"
      >
        <div className="space-y-[0.125rem] mr-1">
          <div className="grid grid-cols-[0.5fr_3fr_1fr] text-start text-yellow-100">
            <div className="text-base md:text-lg px-3">#</div>
            <div className="text-base md:text-lg">Nome</div>
            <div className="text-base md:text-lg text-end">Pts</div>
          </div>
          <div>
            <hr className="w-full" />
          </div>

          {data?.gamesScore.map((score, index) => (
            <div
              key={score.UserId}
              className="grid grid-cols-[0.5fr_3fr_1fr] text-start"
            >
              <div className="text-base md:text-xl px-3">
                <span>{index + 1}</span>
              </div>
              <div data-index={index === 0} className="text-base md:text-xl">
                <abbr
                  title={`${score.acertos.toString()}/${score.erros.toString()}`}
                  className="no-underline"
                >
                  {score.UserId}
                </abbr>
              </div>
              <div className="text-base md:text-xl text-end">
                {score.Score.toFixed(2)}
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
    </>
  )
}
