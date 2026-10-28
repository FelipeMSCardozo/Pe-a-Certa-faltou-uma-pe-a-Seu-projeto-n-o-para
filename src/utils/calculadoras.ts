/* --- SÉRIE COMERCIAL E12 PADRÃO --- */
const E12_BASE = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];

export function acharResistorE12Superior(rIdeal: number): number {
  if (rIdeal <= 0 || !Number.isFinite(rIdeal)) return 220;

  for (let exp = 0; exp <= 6; exp++) {
    const mult = Math.pow(10, exp);
    for (const val of E12_BASE) {
      const eVal = Math.round(val * mult);
      if (eVal >= rIdeal) {
        return eVal;
      }
    }
  }
  return 1000000;
}

/* --- 1. RESISTOR PARA LED: R = (Vfonte - Vled) / I --- */
export interface ResultadoResistorLed {
  rCalculado: number;
  rComercialE12: number;
  correnteReal_mA: number;
  potencia_W: number;
  mensagem: string;
}

export function calcularResistorLed(
  vFonte: number,
  vLed: number,
  iLed_mA: number
): ResultadoResistorLed {
  if (!Number.isFinite(vFonte) || !Number.isFinite(vLed) || !Number.isFinite(iLed_mA)) {
    throw new Error('Valores numéricos inválidos');
  }

  if (vFonte <= 0 || vLed <= 0 || iLed_mA <= 0) {
    throw new Error('Tensões e corrente devem ser maiores que zero');
  }

  if (vFonte <= vLed) {
    throw new Error('A tensão da fonte precisa ser maior que a tensão direta do LED');
  }

  const iAmperes = iLed_mA / 1000;
  const rCalculado = (vFonte - vLed) / iAmperes;
  const rComercialE12 = acharResistorE12Superior(rCalculado);
  const correnteReal_mA = Number((((vFonte - vLed) / rComercialE12) * 1000).toFixed(1));
  const potencia_W = Number((Math.pow(correnteReal_mA / 1000, 2) * rComercialE12).toFixed(3));

  let mensagem = 'Resistor padrão de 1/4W (0.25W) é perfeito para esta aplicação.';
  if (potencia_W > 0.25) {
    mensagem = 'Atenção: A potência ultrapassa 1/4W. Use um resistor de 1/2W ou 1W para não aquecer.';
  }

  return {
    rCalculado: Math.round(rCalculado),
    rComercialE12,
    correnteReal_mA,
    potencia_W,
    mensagem,
  };
}

/* --- 2. COMBINADOR DE RESISTORES (SÉRIE E PARALELO) --- */
export interface CombinacaoResistor {
  tipo: 'serie' | 'paralelo' | 'exato';
  r1: number;
  r2?: number;
  rResultante: number;
  erroPercentual: number;
  formula: string;
}

export function combinarResistores(
  alvo_ohms: number,
  disponiveis_ohms: number[]
): CombinacaoResistor[] {
  if (alvo_ohms <= 0 || !Number.isFinite(alvo_ohms) || !disponiveis_ohms.length) {
    return [];
  }

  const validos = Array.from(
    new Set(disponiveis_ohms.filter((r) => Number.isFinite(r) && r > 0))
  );
  if (!validos.length) return [];

  const resultados: CombinacaoResistor[] = [];

  // 1. Checar valor exato
  for (const r of validos) {
    const erro = Math.abs((r - alvo_ohms) / alvo_ohms) * 100;
    if (erro === 0) {
      resultados.push({
        tipo: 'exato',
        r1: r,
        rResultante: r,
        erroPercentual: 0,
        formula: `${r} Ω (peça exata)`,
      });
    }
  }

  // 2. Série: R = R1 + R2
  for (let i = 0; i < validos.length; i++) {
    for (let j = i; j < validos.length; j++) {
      const r1 = validos[i];
      const r2 = validos[j];
      const rSerie = r1 + r2;
      const erro = Math.abs((rSerie - alvo_ohms) / alvo_ohms) * 100;
      if (erro < 25) {
        resultados.push({
          tipo: 'serie',
          r1,
          r2,
          rResultante: rSerie,
          erroPercentual: Number(erro.toFixed(1)),
          formula: `${r1} Ω + ${r2} Ω em série`,
        });
      }
    }
  }

  // 3. Paralelo: R = (R1 * R2) / (R1 + R2)
  for (let i = 0; i < validos.length; i++) {
    for (let j = i; j < validos.length; j++) {
      const r1 = validos[i];
      const r2 = validos[j];
      const rParalelo = (r1 * r2) / (r1 + r2);
      const erro = Math.abs((rParalelo - alvo_ohms) / alvo_ohms) * 100;
      if (erro < 25) {
        resultados.push({
          tipo: 'paralelo',
          r1,
          r2,
          rResultante: Math.round(rParalelo),
          erroPercentual: Number(erro.toFixed(1)),
          formula: `${r1} Ω // ${r2} Ω em paralelo`,
        });
      }
    }
  }

  // Ordenar pelo menor erro
  return resultados.sort((a, b) => a.erroPercentual - b.erroPercentual).slice(0, 5);
}

/* --- 3. CÓDIGO DE CORES DE RESISTOR --- */
export const TABELA_CORES: Record<string, { digito: number; mult: number; corHex: string; nomePt: string }> = {
  preto: { digito: 0, mult: 1, corHex: '#1F2937', nomePt: 'Preto' },
  marrom: { digito: 1, mult: 10, corHex: '#78350F', nomePt: 'Marrom' },
  vermelho: { digito: 2, mult: 100, corHex: '#DC2626', nomePt: 'Vermelho' },
  laranja: { digito: 3, mult: 1000, corHex: '#EA580C', nomePt: 'Laranja' },
  amarelo: { digito: 4, mult: 10000, corHex: '#CA8A04', nomePt: 'Amarelo' },
  verde: { digito: 5, mult: 100000, corHex: '#16A34A', nomePt: 'Verde' },
  azul: { digito: 6, mult: 1000000, corHex: '#2563EB', nomePt: 'Azul' },
  violeta: { digito: 7, mult: 10000000, corHex: '#9333EA', nomePt: 'Violeta' },
  cinza: { digito: 8, mult: 100000000, corHex: '#6B7280', nomePt: 'Cinza' },
  branco: { digito: 9, mult: 1000000000, corHex: '#F3F4F6', nomePt: 'Branco' },
};

export const TOLERANCIAS: Record<string, { tol: string; corHex: string; nomePt: string }> = {
  ouro: { tol: '±5%', corHex: '#D97706', nomePt: 'Ouro (5%)' },
  prata: { tol: '±10%', corHex: '#94A3B8', nomePt: 'Prata (10%)' },
  marrom: { tol: '±1%', corHex: '#78350F', nomePt: 'Marrom (1%)' },
  vermelho: { tol: '±2%', corHex: '#DC2626', nomePt: 'Vermelho (2%)' },
};

export function decodificarCores4Faixas(f1: string, f2: string, f3Mult: string, f4Tol: string): { ohms: number; textoFormatado: string } {
  const d1 = TABELA_CORES[f1]?.digito;
  const d2 = TABELA_CORES[f2]?.digito;
  const mult = TABELA_CORES[f3Mult]?.mult;
  const tol = TOLERANCIAS[f4Tol]?.tol || '±5%';

  if (d1 === undefined || d2 === undefined || mult === undefined) {
    throw new Error('Cores inválidas');
  }

  const ohms = (d1 * 10 + d2) * mult;
  let formatado = `${ohms} Ω ${tol}`;
  if (ohms >= 1000000) {
    formatado = `${Number((ohms / 1000000).toFixed(2))} MΩ ${tol}`;
  } else if (ohms >= 1000) {
    formatado = `${Number((ohms / 1000).toFixed(2))} kΩ ${tol}`;
  }

  return { ohms, textoFormatado: formatado };
}

/* --- 4. DIVISOR DE TENSÃO: Vout = Vin * (R2 / (R1 + R2)) --- */
export interface ResultadoDivisor {
  vOut: number;
  corrente_mA: number;
  adequadoPara3v3: boolean;
  mensagem: string;
}

export function calcularDivisorTensao(vIn: number, r1: number, r2: number): ResultadoDivisor {
  if (vIn <= 0 || r1 <= 0 || r2 <= 0 || !Number.isFinite(vIn) || !Number.isFinite(r1) || !Number.isFinite(r2)) {
    throw new Error('Valores de entrada devem ser números positivos');
  }

  const vOut = Number((vIn * (r2 / (r1 + r2))).toFixed(2));
  const corrente_mA = Number(((vIn / (r1 + r2)) * 1000).toFixed(2));
  const adequadoPara3v3 = vOut >= 3.1 && vOut <= 3.5;

  let mensagem = `Tensão de saída: ${vOut} V. Corrente drenada: ${corrente_mA} mA.`;
  if (adequadoPara3v3) {
    mensagem += ' Excelente para conectar sinais de 5V (como o TX do Arduino) a entradas de 3.3V (como o RX do Bluetooth HC-05).';
  } else if (vOut > 3.6) {
    mensagem += ' Atenção: Tensão acima de 3.6V pode danificar módulos de 3.3V com o tempo.';
  }

  return { vOut, corrente_mA, adequadoPara3v3, mensagem };
}

/* --- 5. VERIFICADOR DE CORRENTE DO PINO ARDUINO --- */
export interface StatusCorrentePino {
  status: 'seguro' | 'atencao' | 'perigo';
  cor: string;
  titulo: string;
  explicacao: string;
  recomendacao: string;
}

export function verificarCorrentePino(corrente_mA: number): StatusCorrentePino {
  if (corrente_mA < 0 || !Number.isFinite(corrente_mA)) {
    throw new Error('Corrente deve ser um número positivo');
  }

  if (corrente_mA <= 20) {
    return {
      status: 'seguro',
      cor: '#22C55E',
      titulo: `${corrente_mA} mA — Operação Segura`,
      explicacao: 'O limite recomendado de trabalho contínuo para qualquer pino do microcontrolador ATmega328P é de 20 mA.',
      recomendacao: 'Você pode ligar o componente diretamente no pino do Arduino com resistor limitador adequado.',
    };
  }

  if (corrente_mA <= 40) {
    return {
      status: 'atencao',
      cor: '#F59E0B',
      titulo: `${corrente_mA} mA — Atenção: Limite Absoluto`,
      explicacao: '40 mA é o limite máximo absoluto do datasheet. Usar o pino próximo de 40mA por muito tempo aquece o chip interno e pode causar queima da porta.',
      recomendacao: 'Adicione ou aumente o resistor limitador para reduzir a corrente para abaixo de 20 mA.',
    };
  }

  return {
    status: 'perigo',
    cor: '#EF4444',
    titulo: `${corrente_mA} mA — PERIGO DE QUEIMA IMEDIATA`,
    explicacao: 'Correntes acima de 40 mA superam a capacidade do circuito integrado interno. O pino vai queimar ou parar de funcionar para sempre.',
    recomendacao: 'NUNCA ligue diretamente! Use um transistor NPN (como BC547 ou 2N2222), um MOSFET ou um módulo relé para chavear a carga.',
  };
}
