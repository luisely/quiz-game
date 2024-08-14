import { GlobalScore } from './GlobalScore'
import InputPlayerName from './InputPlayerName'
import { UserScore } from './UserScore'
import { useStore } from '../../store'

export function FinalScore() {
  const gameOver = useStore((state) => state.gameOver)

  return gameOver ? (
    <div className="grid grid-cols-2 grid-rows-[0.5fr_4fr_1fr] grid-flow-col h-full w-full p-2">
      <UserScore />
      <InputPlayerName />
      <GlobalScore />
    </div>
  ) : null
}
