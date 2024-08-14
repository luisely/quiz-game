import { useState, useEffect } from 'react'
import { useStore } from '../store'

const Timer = () => {
  const [time, setTime] = useState(0) // Inicializa o tempo em 0

  const statusTimer = useStore((state) => state.statusTimer)

  useEffect(() => {
    let started = 0
    const interval = setInterval(() => {
      if (statusTimer) {
        setTime((prevCount) => prevCount + 1) // Incrementa o contador a cada intervalo
        started = 1
      } else if (started === 1 && statusTimer === false) {
        clearInterval(interval)
      }
    }, 1000) // Define o intervalo para 1 segundo

    // Limpa o intervalo se o componente desmontar ou se a condição mudar
    return () => clearInterval(interval)
  }, [statusTimer])

  return <span>Tempo: {time}s</span>
}

export default Timer
