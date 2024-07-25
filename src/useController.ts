import { useCallback, useState } from "react";
import { questionsObj, TypeQuestions } from "./questions";

export function useController() {

  const [life, setLife] = useState(3)
  const [errors, setErrors] = useState(0)
  const [points, setPoints] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [questions, setQuestions] = useState(questionsObj);
  const [optionSelected, setOptionSelected] = useState<string | null>()
  const [questionActive, setQuestionActive] = useState(() => {
    return Math.floor(Math.random() * questions.length)
  })

  const lossLife = () => {
    setLife((state) => state - 1)
  }

  const handleOption = useCallback(() => {
    if(questions.length === 0) {
      setGameOver(true)
    } else {
      const correctAnswer = questions[questionActive].answer;

      if(optionSelected === correctAnswer){
        setPoints((state) => state + 1)
      } else {
        setErrors((state) => state + 1)
        lossLife()
      }
  
      const updatedQuestions = [...questions]
      updatedQuestions[questionActive].hasBeenUsed = true
      const removedUsedQuestion = updatedQuestions.filter(question => !question.hasBeenUsed)
      setQuestions(removedUsedQuestion)

      if(removedUsedQuestion.length < 1) {
        setGameOver(true)
      } else {
        setNextQuestion(removedUsedQuestion)
        setOptionSelected(null)
      }
    }
  }, [optionSelected, questionActive, questions])

  const setNextQuestion = (updatedQuestions: TypeQuestions[]) => {
    const findNextQuestion = Math.floor(Math.random() * updatedQuestions.length);    
    setQuestionActive(findNextQuestion)
  }

  return {
    handleOption,
    gameOver,
    points,
    errors,
    life,
    questionActive,
    optionSelected,
    questions,
    setOptionSelected
    
  }
}