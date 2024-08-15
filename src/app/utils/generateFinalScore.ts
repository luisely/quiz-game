const PONTOS_POR_ACERTO = 10
const DEDUCAO_POR_ERRO = 5
const TEMPO_REFERENCIA = 90
const FATOR_TEMPO = 25

export const generateFinalScore = (
  acertos: number,
  erros: number,
  tempoGasto: number,
) => {
  const pontosAcertos = acertos * PONTOS_POR_ACERTO - erros * DEDUCAO_POR_ERRO

  const ajusteTempo =
    ((TEMPO_REFERENCIA - tempoGasto) / TEMPO_REFERENCIA) * FATOR_TEMPO

  return parseFloat((pontosAcertos + ajusteTempo).toFixed(2))
}
