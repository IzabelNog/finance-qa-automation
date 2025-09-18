describe('Validação de cálculos financeiros', () => {
  it('Valida juros compostos', () => {
    const capital = 1000;
    const taxa = 0.05;
    const tempo = 12;

    const montanteCalculado = capital * Math.pow(1 + taxa, tempo);
    const montanteEsperado = 1795.86; // Valor esperado com base no cálculo manual

    expect(montanteCalculado.toFixed(2)).to.equal(montanteEsperado.toFixed(2));
  });
});

it('Valida saldo após múltiplas transações e taxa de manutenção', () => {
  const saldoInicial = 5000;

  // Transações realizadas
  const transacoes = [+200, -150, +300, -50, -100];

  // Taxa de manutenção mensal
  const taxaManutencao = 0.02;

  // Calcula o saldo após as transações
  let saldoFinal = saldoInicial;
  transacoes.forEach((valor) => {
    saldoFinal += valor;
  });

  // Aplica a taxa de manutenção
  saldoFinal -= saldoFinal * taxaManutencao;

  const saldoEsperado = 5096; // Valor esperado com base no cálculo manual
  expect(saldoFinal.toFixed(2)).to.equal(saldoEsperado.toFixed(2));
});
