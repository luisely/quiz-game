import { useState, useEffect } from 'react'

interface TimerProps {
  status: boolean
}

const Timer = ({ status }: TimerProps) => {
  const [time, setTime] = useState(0) // Inicializa o tempo em 0

  useEffect(() => {
    let started = 0
    const interval = setInterval(() => {
      if (status) {
        setTime((prevCount) => prevCount + 1) // Incrementa o contador a cada intervalo
        started = 1
      } else if (started === 1 && status === false) {
        clearInterval(interval)
        console.log('Interval stopped...')
      }
    }, 1000) // Define o intervalo para 1 segundo

    // Limpa o intervalo se o componente desmontar ou se a condição mudar
    return () => clearInterval(interval)
  }, [status])

  return <span>Tempo: {time} sec</span>
}

export default Timer
