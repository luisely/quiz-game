import { useMutation } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import { IScore, useScore } from '@/app/hooks/useScore'
import { useStore } from '@/store/useStore'
import { useToast } from '@/components/ui/use-toast'

export default function InputPlayerName() {
  const [playerName, setPlayerName] = useState('')

  const points = useStore((state) => state.points)
  const errors = useStore((state) => state.errors)
  const timePassed = useStore((state) => state.timePassed)
  const userFinalScore = useStore((state) => state.userFinalScore)

  const { refetch } = useScore()
  const { toast } = useToast()

  const { mutate, isSuccess } = useMutation({
    mutationFn: async ({
      pk,
      score,
      acertos,
      erros,
      playerName,
      date,
      time,
    }: {
      pk: string
      score: number
      acertos: number
      erros: number
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
            acertos,
            erros,
            playerName,
            date,
            time,
          }),
        },
      )

      return res.json()
    },
    onError: (error) => {
      toast({
        variant: 'default',
        title: 'Opa!',
        description: error.message,
      })
    },
    onSuccess: () => {
      refetch()
    },
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (playerName.length < 3 || playerName.length > 8) {
      toast({
        variant: 'default',
        title: 'Opa!',
        description: 'Nome precisa ter mínimo de 3 e máximo de 8 caracteres.',
      })
      return
    }

    if (timePassed === 0) {
      toast({
        variant: 'default',
        title: 'Opa! - Malandrinho',
        description: 'Você nem jogou, joga aí !!',
      })
      return
    }

    mutate({
      pk: 'game_001-2024',
      score: Number(userFinalScore),
      acertos: points,
      erros: errors,
      playerName,
      date: new Date().toISOString(),
      time: timePassed,
    })
  }

  return (
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
  )
}
