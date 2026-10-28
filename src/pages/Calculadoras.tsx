import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Calculator,
  AlertTriangle,
} from 'lucide-react';
import { Card, Tabs } from '../components/ui';
import { ResistorSvg } from '../illustrations/HardwareSvgs';
import {
  calcularResistorLed,
  combinarResistores,
  decodificarCores4Faixas,
  calcularDivisorTensao,
  verificarCorrentePino,
  TABELA_CORES,
  TOLERANCIAS,
} from '../utils/calculadoras';

export const Calculadoras: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'resistor-led';

  const [activeTab, setActiveTab] = useState(tabParam);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setSearchParams({ tab: id });
  };

  /* --- 1. ESTADO RESISTOR PARA LED --- */
  const [vFonte, setVFonte] = useState(5.0);
  const [corLed, setCorLed] = useState('vermelho');
  const [vLedCustom, setVLedCustom] = useState(2.0);
  const [iLed, setILed] = useState(15);

  const tensoesPorCor: Record<string, number> = {
    vermelho: 2.0,
    amarelo: 2.1,
    verde: 2.8,
    azul: 3.2,
    branco: 3.2,
  };

  const vLedEfetivo = corLed === 'custom' ? vLedCustom : tensoesPorCor[corLed] || 2.0;

  let resultadoResistorLed;
  let erroResistorLed = '';
  try {
    resultadoResistorLed = calcularResistorLed(vFonte, vLedEfetivo, iLed);
  } catch (err) {
    erroResistorLed = (err as Error).message;
  }

  /* --- 2. ESTADO COMBINADOR DE RESISTORES --- */
  const [alvoOhms, setAlvoOhms] = useState(500);
  const [resistoresDisponiveisStr, setResistoresDisponiveisStr] = useState(
    '100, 220, 330, 470, 1000, 2200, 10000'
  );

  const disponiveisArray = resistoresDisponiveisStr
    .split(',')
    .map((s) => parseFloat(s.trim()))
    .filter((n) => Number.isFinite(n) && n > 0);

  const combinacoes = combinarResistores(alvoOhms, disponiveisArray);

  /* --- 3. ESTADO CÓDIGO DE CORES --- */
  const [faixa1, setFaixa1] = useState('vermelho');
  const [faixa2, setFaixa2] = useState('vermelho');
  const [faixa3, setFaixa3] = useState('marrom');
  const [faixa4, setFaixa4] = useState('ouro');

  let resultadoCores;
  try {
    resultadoCores = decodificarCores4Faixas(faixa1, faixa2, faixa3, faixa4);
  } catch {
    resultadoCores = { ohms: 220, textoFormatado: '220 Ω ±5%' };
  }

  /* --- 4. ESTADO DIVISOR DE TENSÃO --- */
  const [divVin, setDivVin] = useState(5.0);
  const [divR1, setDivR1] = useState(1000);
  const [divR2, setDivR2] = useState(2000);

  let resultadoDivisor;
  let erroDivisor = '';
  try {
    resultadoDivisor = calcularDivisorTensao(divVin, divR1, divR2);
  } catch (err) {
    erroDivisor = (err as Error).message;
  }

  /* --- 5. ESTADO VERIFICADOR DE CORRENTE --- */
  const [correnteVerificar, setCorrenteVerificar] = useState(15);
  let statusCorrente;
  try {
    statusCorrente = verificarCorrentePino(correnteVerificar);
  } catch {
    statusCorrente = verificarCorrentePino(20);
  }

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-5xl mx-auto">
      {/* CABEÇALHO */}
      <div>
        <span className="text-xs font-bold text-accent uppercase tracking-wider">
          Ferramentas Automáticas
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
          <Calculator className="w-7 h-7 text-accent" />
          Calculadoras de Bancada Explicadas
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          Resultados imediatos com a série comercial E12 e explicações de segurança para iniciantes.
        </p>
      </div>

      {/* ABAS DAS CALCULADORAS */}
      <Tabs
        tabs={[
          { id: 'resistor-led', label: '1. Resistor para LED' },
          { id: 'combinador', label: '2. Combinador de Resistores' },
          { id: 'cores', label: '3. Código de Cores SVG' },
          { id: 'divisor', label: '4. Divisor de Tensão' },
          { id: 'corrente-pino', label: '5. Limite do Pino' },
        ]}
        activeId={activeTab}
        onChange={handleTabChange}
      />

      {/* 1. CALCULADORA DE RESISTOR PARA LED */}
      {activeTab === 'resistor-led' && (
        <Card className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-ink">
              Calculadora de Resistor Limitador para LED
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Fórmula: R = (Vfonte − Vled) / Iled • Sugere o valor comercial E12 imediatamente superior.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase block mb-1">
                Tensão da Fonte (V)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="24"
                value={vFonte}
                onChange={(e) => setVFonte(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bench-elevated border border-bench-border text-ink font-mono font-semibold min-h-[44px]"
              />
              <span className="text-[11px] text-ink-muted mt-1 block">USB do Arduino = 5.0 V</span>
            </div>

            <div>
              <label className="text-xs font-bold text-ink-muted uppercase block mb-1">
                Cor do LED
              </label>
              <select
                value={corLed}
                onChange={(e) => setCorLed(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bench-elevated border border-bench-border text-ink font-semibold min-h-[44px]"
              >
                <option value="vermelho">Vermelho (~2.0 V)</option>
                <option value="amarelo">Amarelo (~2.1 V)</option>
                <option value="verde">Verde (~2.8 V)</option>
                <option value="azul">Azul (~3.2 V)</option>
                <option value="branco">Branco (~3.2 V)</option>
                <option value="custom">Personalizado...</option>
              </select>
              {corLed === 'custom' && (
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="12"
                  value={vLedCustom}
                  onChange={(e) => setVLedCustom(parseFloat(e.target.value) || 0)}
                  placeholder="Vled manual"
                  className="mt-2 w-full px-3 py-1.5 rounded-lg bg-bench-card border border-bench-border text-xs font-mono"
                />
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-ink-muted uppercase block mb-1">
                Corrente Desejada (mA)
              </label>
              <input
                type="number"
                step="1"
                min="1"
                max="40"
                value={iLed}
                onChange={(e) => setILed(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bench-elevated border border-bench-border text-ink font-mono font-semibold min-h-[44px]"
              />
              <span className="text-[11px] text-ink-muted mt-1 block">Padrão seguro: 15 mA</span>
            </div>
          </div>

          {erroResistorLed ? (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              {erroResistorLed}
            </div>
          ) : resultadoResistorLed && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    Resistor Comercial Recomendado (Série E12)
                  </span>
                  <div className="text-3xl font-extrabold text-ink font-mono mt-1">
                    {resultadoResistorLed.rComercialE12} Ω
                  </div>
                  <span className="text-xs text-ink-muted">
                    (Valor exato calculado da fórmula: {resultadoResistorLed.rCalculado} Ω)
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-ink-muted uppercase block">Corrente Real no LED</span>
                  <span className="text-xl font-bold font-mono text-ink">
                    {resultadoResistorLed.correnteReal_mA} mA
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-500/20 text-xs text-ink leading-relaxed">
                <strong>Análise de Potência:</strong> {resultadoResistorLed.potencia_W} W. {resultadoResistorLed.mensagem}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* 2. COMBINADOR DE RESISTORES */}
      {activeTab === 'combinador' && (
        <Card className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-ink">
              Combinador de Resistores (Série e Paralelo)
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Não tem a peça exata? Veja como combinar resistores que você já tem para chegar no valor que precisa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase block mb-1">
                Resistência Alvo (Ω)
              </label>
              <input
                type="number"
                step="1"
                min="1"
                value={alvoOhms}
                onChange={(e) => setAlvoOhms(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bench-elevated border border-bench-border text-ink font-mono font-semibold min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink-muted uppercase block mb-1">
                Resistores Disponíveis na Gaveta (separados por vírgula)
              </label>
              <input
                type="text"
                value={resistoresDisponiveisStr}
                onChange={(e) => setResistoresDisponiveisStr(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bench-elevated border border-bench-border text-ink font-mono font-semibold min-h-[44px]"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
              Melhores Combinações Encontradas:
            </h3>

            {combinacoes.length > 0 ? (
              <div className="space-y-2">
                {combinacoes.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-bench-elevated border border-bench-border flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <span className="font-mono font-bold text-base text-ink block">
                        {c.formula}
                      </span>
                      <span className="text-xs text-ink-muted">
                        Resultado: {c.rResultante} Ω
                      </span>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                          c.erroPercentual === 0
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : 'bg-accent/20 text-accent'
                        }`}
                      >
                        {c.erroPercentual === 0 ? 'Exato (0% erro)' : `Erro: ${c.erroPercentual}%`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-ink-muted">
                Nenhuma combinação próxima encontrada com os valores digitados. Adicione mais resistores na lista.
              </p>
            )}
          </div>
        </Card>
      )}

      {/* 3. CÓDIGO DE CORES COM SVG */}
      {activeTab === 'cores' && (
        <Card className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-ink">
              Código de Cores de Resistor (4 Faixas) com SVG Vetorial
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Selecione as cores das faixas para ver a resistência exata ou desenhe na bancada.
            </p>
          </div>

          {/* SVG DO RESISTOR DINÂMICO */}
          <div className="p-6 rounded-2xl bg-[#0A0E14] border border-bench-border flex flex-col items-center justify-center">
            <p className="text-xs text-slate-400 font-mono mb-3">
              Resistor desenhado com as cores selecionadas:
            </p>
            <ResistorSvg
              bands={[
                TABELA_CORES[faixa1]?.corHex || '#DC2626',
                TABELA_CORES[faixa2]?.corHex || '#DC2626',
                TABELA_CORES[faixa3]?.corHex || '#78350F',
                TOLERANCIAS[faixa4]?.corHex || '#D97706',
              ]}
              valueLabel={resultadoCores.textoFormatado}
            />
          </div>

          {/* SELETORES DE FAIXAS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-bold text-ink-muted uppercase block mb-1">
                1ª Faixa (1º Dígito)
              </label>
              <select
                value={faixa1}
                onChange={(e) => setFaixa1(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-bench-elevated border border-bench-border text-xs font-semibold min-h-[44px]"
              >
                {Object.entries(TABELA_CORES)
                  .filter(([k]) => k !== 'preto')
                  .map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.nomePt} ({item.digito})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-ink-muted uppercase block mb-1">
                2ª Faixa (2º Dígito)
              </label>
              <select
                value={faixa2}
                onChange={(e) => setFaixa2(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-bench-elevated border border-bench-border text-xs font-semibold min-h-[44px]"
              >
                {Object.entries(TABELA_CORES).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.nomePt} ({item.digito})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-ink-muted uppercase block mb-1">
                3ª Faixa (Multiplicador)
              </label>
              <select
                value={faixa3}
                onChange={(e) => setFaixa3(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-bench-elevated border border-bench-border text-xs font-semibold min-h-[44px]"
              >
                {Object.entries(TABELA_CORES).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.nomePt} (x{item.mult >= 1000 ? `${item.mult / 1000}k` : item.mult})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-ink-muted uppercase block mb-1">
                4ª Faixa (Tolerância)
              </label>
              <select
                value={faixa4}
                onChange={(e) => setFaixa4(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-bench-elevated border border-bench-border text-xs font-semibold min-h-[44px]"
              >
                {Object.entries(TOLERANCIAS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.nomePt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      )}

      {/* 4. DIVISOR DE TENSÃO */}
      {activeTab === 'divisor' && (
        <Card className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-ink">
              Calculadora de Divisor de Tensão Resistivo
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Fórmula: Vout = Vin × (R2 / (R1 + R2)) • Ideal para converter sinais de 5V para 3.3V com segurança.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-ink-muted uppercase block mb-1">
                Tensão de Entrada Vin (V)
              </label>
              <input
                type="number"
                step="0.1"
                value={divVin}
                onChange={(e) => setDivVin(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bench-elevated border border-bench-border text-ink font-mono font-semibold min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink-muted uppercase block mb-1">
                Resistor Superior R1 (Ω)
              </label>
              <input
                type="number"
                step="100"
                value={divR1}
                onChange={(e) => setDivR1(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bench-elevated border border-bench-border text-ink font-mono font-semibold min-h-[44px]"
              />
              <span className="text-[11px] text-ink-muted mt-1 block">Recomendado: 1000 Ω (1k)</span>
            </div>

            <div>
              <label className="text-xs font-bold text-ink-muted uppercase block mb-1">
                Resistor Inferior R2 (ligado ao GND) (Ω)
              </label>
              <input
                type="number"
                step="100"
                value={divR2}
                onChange={(e) => setDivR2(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bench-elevated border border-bench-border text-ink font-mono font-semibold min-h-[44px]"
              />
              <span className="text-[11px] text-ink-muted mt-1 block">Recomendado: 2000 Ω (2k)</span>
            </div>
          </div>

          {erroDivisor ? (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm font-semibold">
              {erroDivisor}
            </div>
          ) : resultadoDivisor && (
            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block">
                    Tensão de Saída (Vout)
                  </span>
                  <span className="text-3xl font-extrabold text-ink font-mono">
                    {resultadoDivisor.vOut} V
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-ink-muted uppercase block">Corrente Drenada</span>
                  <span className="text-lg font-bold font-mono text-ink">
                    {resultadoDivisor.corrente_mA} mA
                  </span>
                </div>
              </div>
              <p className="text-xs text-ink leading-relaxed pt-2 border-t border-cyan-500/20">
                {resultadoDivisor.mensagem}
              </p>
            </div>
          )}
        </Card>
      )}

      {/* 5. VERIFICADOR DE CORRENTE DO PINO */}
      {activeTab === 'corrente-pino' && (
        <Card className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-ink">
              Verificador de Corrente por Pino do Arduino Uno
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Conheça os limites elétricos do microcontrolador ATmega328P e evite queimar portas digitais.
            </p>
          </div>

          <div className="max-w-md">
            <label className="text-xs font-bold text-ink-muted uppercase block mb-1">
              Corrente que a carga vai drenar (mA)
            </label>
            <input
              type="number"
              step="1"
              min="1"
              value={correnteVerificar}
              onChange={(e) => setCorrenteVerificar(parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bench-elevated border border-bench-border text-ink font-mono font-semibold min-h-[44px]"
            />
          </div>

          <div
            className="p-5 rounded-2xl border space-y-3"
            style={{
              backgroundColor: `${statusCorrente.cor}15`,
              borderColor: `${statusCorrente.cor}40`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-ink font-mono">
                {statusCorrente.titulo}
              </span>
            </div>

            <p className="text-sm text-ink leading-relaxed">
              {statusCorrente.explicacao}
            </p>

            <div className="p-3.5 rounded-xl bg-bench-card border border-bench-border text-xs text-ink-muted space-y-1">
              <strong className="text-ink block">Recomendação de Bancada:</strong>
              {statusCorrente.recomendacao}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
