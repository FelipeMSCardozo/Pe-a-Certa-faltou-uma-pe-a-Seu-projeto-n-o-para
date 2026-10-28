import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shuffle,
  Calculator,
  Zap,
  AlertTriangle,
  ArrowRight,
  Search,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Card, Button, SearchBar } from '../components/ui';

export const Home: React.FC = () => {
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busca.trim()) {
      navigate(`/substituicoes?busca=${encodeURIComponent(busca.trim())}`);
    } else {
      navigate('/substituicoes');
    }
  };

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      {/* HERO BANNER DE BANCADA */}
      <section className="relative overflow-hidden rounded-3xl border border-bench-border bg-gradient-to-br from-bench-card via-bench-card to-cyan-950/20 p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-bold text-accent-text dark:text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guia de Substituições • 80 Projetos Arduino</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight">
            Faltou o resistor exato ou o sensor da lista? <br className="hidden sm:inline" />
            <span className="text-accent underline decoration-accent/40 decoration-wavy">
              Seu projeto não para.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Descubra quais peças você pode trocar com total segurança pelas que já tem na sua gaveta, o que muda na ligação física, o que alterar no código e como usar as calculadoras de bancada automáticas.
          </p>

          {/* BUSCA RÁPIDA NO HERO */}
          <form onSubmit={handleSearchSubmit} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="flex-1">
              <SearchBar
                value={busca}
                onChange={setBusca}
                placeholder="Qual peça está faltando? Ex: resistor 220, bc547, buzzer..."
              />
            </div>
            <Button type="submit" variant="primary" icon={<Search className="w-4 h-4" />}>
              Consultar Peça
            </Button>
          </form>
        </div>
      </section>

      {/* REGRAS DE OURO DA SUBSTITUIÇÃO */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="space-y-2 border-emerald-500/30 bg-emerald-500/5">
          <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Troca Direta</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Mesma pinagem, mesma tensão e funcionamento 100% idêntico. Exemplo: LED 5mm por 3mm ou Servo SG90 por MG90S.
          </p>
        </Card>

        <Card className="space-y-2 border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400 text-sm">
            <Shuffle className="w-5 h-5" />
            <span>Troca com Ajuste</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Funciona perfeitamente, mas exige atenção à pinagem (como transistores BC vs 2N) ou 1 linha no código (DHT11 vs DHT22).
          </p>
        </Card>

        <Card className="space-y-2 border-rose-500/30 bg-rose-500/5">
          <div className="flex items-center gap-2 font-bold text-rose-500 text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>Não Troque</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Trocas arriscadas que podem queimar o pino do Arduino ou o componente. Exemplo: ligar motor direto sem transistor.
          </p>
        </Card>
      </section>

      {/* ATALHOS PARA AS CALCULADORAS DE BANCADA */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
              <Calculator className="w-6 h-6 text-accent" />
              Calculadoras de Bancada com Resultado Explicado
            </h2>
            <p className="text-sm text-ink-muted">
              Cálculos elétricos automáticos com sugestão de valores comerciais E12:
            </p>
          </div>
          <Link to="/calculadoras" className="text-xs font-bold text-accent hover:underline hidden sm:inline">
            Abrir todas as 5 calculadoras →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/calculadoras?tab=resistor-led">
            <Card interactive className="h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-accent block mb-1">Lei de Ohm</span>
                <h3 className="font-bold text-ink text-base mb-1">Resistor para LED</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Calcule o resistor exato para qualquer cor de LED e veja o valor comercial da série E12 imediatamente acima.
                </p>
              </div>
              <div className="pt-3 text-xs font-bold text-accent flex items-center gap-1">
                <span>Calcular resistor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          </Link>

          <Link to="/calculadoras?tab=combinador">
            <Card interactive className="h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-accent block mb-1">Série e Paralelo</span>
                <h3 className="font-bold text-ink text-base mb-1">Combinador de Resistores</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  "Tenho estes resistores na gaveta, quero atingir X ohms". Sugere associações em série ou paralelo instantâneas.
                </p>
              </div>
              <div className="pt-3 text-xs font-bold text-accent flex items-center gap-1">
                <span>Combinar peças</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          </Link>

          <Link to="/calculadoras?tab=cores">
            <Card interactive className="h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-accent block mb-1">4 e 5 Faixas</span>
                <h3 className="font-bold text-ink text-base mb-1">Código de Cores com SVG</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Decodifique cores em ohms ou gere os anéis coloridos exatos do resistor desenhados no código vetorial.
                </p>
              </div>
              <div className="pt-3 text-xs font-bold text-accent flex items-center gap-1">
                <span>Decodificar anéis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* GUIA DE TENSÕES E TROCAS PERIGOSAS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/tensoes">
          <Card interactive className="h-full">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-500 font-bold shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-ink text-base">Tabela de Tensões (5V vs 3.3V)</h3>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Quais módulos aceitam 5V diretamente e quais queimam (como ESP8266, cartões MicroSD e NRF24L01), com circuitos de proteção simples.
                </p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/trocas-perigosas">
          <Card interactive className="h-full">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/15 text-rose-500 font-bold shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-ink text-base">"Não Faça Isso!": Trocas Perigosas</h3>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Os 4 maiores erros de bancada que queimam placas e componentes: motores direto no pino, bateria de 9V em servos e troca de resistor por jumper.
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </section>
    </div>
  );
};
