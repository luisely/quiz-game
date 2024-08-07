import { useQuery } from '@tanstack/react-query'

export interface IScore {
  gameScore: {
    id: string
    playerName: string
    score: number
    sk: string
    date: string
    time: number
    pk: string
  }[]
}

export function useScore() {
  return useQuery({
    enabled: false,
    queryKey: ['score'],
    staleTime: 2 * 60 * 1000, // 2 min
    retry: 0,
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<IScore> => {
      const res = await fetch(
        'https://uizr4o9b8f.execute-api.us-east-1.amazonaws.com/score/game_001-2024',
      )

      console.log(res)

      if (!res.ok) {
        throw new Error('Erro ao carregar tabela')
      }

      return res.json()
    },
  })
}
