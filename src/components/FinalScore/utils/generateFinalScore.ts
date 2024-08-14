const PONTOS_POR_ACERTO = 10
const DEDUCAO_POR_ERRO = 5
const TEMPO_REFERENCIA = 1200
const FATOR_TEMPO = 20

export const generateFinalScore = (
  acertos: number,
  erros: number,
  tempoGasto: number,
) => {
  const pontosAcertos = acertos * PONTOS_POR_ACERTO
  const pontosErros = erros * DEDUCAO_POR_ERRO

  const ajusteTempo =
    ((TEMPO_REFERENCIA - tempoGasto) / TEMPO_REFERENCIA) * FATOR_TEMPO

  const placarFinal = pontosAcertos - pontosErros + ajusteTempo

  return parseFloat(placarFinal.toFixed(2))
}
