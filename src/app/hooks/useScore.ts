import { useQuery } from '@tanstack/react-query'

export interface IScore {
  gamesScore: {
    UserId: string
    Score: number
    date: string
    time: number
    acertos: number
    erros: number
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

      if (!res.ok) {
        throw new Error('Erro ao carregar tabela')
      }

      return res.json()
    },
  })
}
