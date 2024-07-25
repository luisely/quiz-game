import { useEffect } from 'react'
import { Question } from './question'
import { useController } from './useController'

function App() {
  const {
    handleOption,
    life,
    gameOver,
    points,
    errors,
    optionSelected,
    questionActive,
    questions,
    setOptionSelected,
  } = useController()

  useEffect(() => {
    if (optionSelected) {
      handleOption()
    }
  }, [optionSelected, handleOption])

  return (
    <div className="flex justify-center w-full bg-[url(../pics/fundo_wall2.jpg)] h-screen bg-repeat-round bg-cover">
      <div className="p-5 mt-24 shadow-md max-w-full w-[740px] h-[540px] text-center z-10 [border-image:url(../pics/fundo_3.jpg)_76_fill/38px_stretch] [clip-path:inset(9px_10px_9px_9px)]">
        <Question
          setOptionSelected={setOptionSelected}
          currentQuestion={questionActive}
          questionsObj={questions}
          gameOver={gameOver}
          points={points}
          errors={errors}
          life={life}
        />
      </div>
    </div>
  )
}

export default App
