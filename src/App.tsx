import { BoardGame } from './BoardGame'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center">
        <div className="flex p-5 mt-24 shadow-md max-w-full w-[740px] h-[540px] text-center z-10 [border-image:url(../pics/fundo_3.jpg)_76_fill/38px_stretch] [clip-path:inset(9px_10px_9px_9px)]">
          <BoardGame />
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
