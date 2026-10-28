import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Shuffle,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Wrench,
  Code,
  Zap,
  Filter,
} from 'lucide-react';
import { Card, SearchBar } from '../components/ui';
import {
  SUBSTITUICOES,
  NivelConfianca,
} from '../content/substituicoes';

export const Substituicoes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('busca') || '';

  const [busca, setBusca] = useState(queryParam);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todas');
  const [filtroConfianca] = useState<string>('todas');

  const handleBuscaChange = (val: string) => {
    setBusca(val);
    if (val) {
      setSearchParams({ busca: val });
    } else {
      setSearchParams({});
    }
  };

  const categorias: { id: string; label: string }[] = [
    { id: 'todas', label: 'Todas as Peças' },
    { id: 'resistores', label: 'Resistores' },
    { id: 'leds', label: 'LEDs' },
    { id: 'capacitores', label: 'Capacitores' },
    { id: 'semicondutores', label: 'Transistores' },
    { id: 'sensores', label: 'Sensores' },
    { id: 'atuadores', label: 'Servos & Motores' },
    { id: 'audio', label: 'Buzzers' },
    { id: 'displays', label: 'Displays' },
    { id: 'placas', label: 'Placas Arduino' },
    { id: 'alimentacao', label: 'Alimentação' },
  ];

  const itensFiltrados = SUBSTITUICOES.filter((item) => {
    // Filtro por texto
    const query = busca.toLowerCase().trim();
    const matchTexto =
      !query ||
      item.pecaFaltante.toLowerCase().includes(query) ||
      item.substitutoRecomendado.toLowerCase().includes(query) ||
      item.resumoTroca.toLowerCase().includes(query) ||
      item.tagsBusca.some((t) => t.includes(query));

    // Filtro por categoria
    const matchCategoria =
      categoriaAtiva === 'todas' || item.categoria === categoriaAtiva;

    // Filtro por confiança
    const matchConfianca =
      filtroConfianca === 'todas' || item.confianca === filtroConfianca;

    return matchTexto && matchCategoria && matchConfianca;
  });

  const renderBadgeConfianca = (confianca: NivelConfianca) => {
    switch (confianca) {
      case 'troca-direta':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Troca Direta
          </span>
        );
      case 'troca-com-ajuste':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <Shuffle className="w-3.5 h-3.5" />
            Troca com Ajuste
          </span>
        );
      case 'nao-troque':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-500 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" />
            Não Troque
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-5xl mx-auto">
      {/* CABEÇALHO */}
      <div>
        <span className="text-xs font-bold text-accent uppercase tracking-wider">
          Banco de Dados de Bancada
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
          <Shuffle className="w-7 h-7 text-accent" />
          "Posso Trocar?" — Guia de Substituições
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          Digite a peça da lista que está faltando e veja o que você pode usar no lugar sem queimar nada.
        </p>
      </div>

      {/* BUSCA INSTANTÂNEA */}
      <SearchBar
        value={busca}
        onChange={handleBuscaChange}
        placeholder="Buscar por peça: ex: resistor 220, bc547, buzzer, dht11, servo..."
      />

      {/* FILTROS DE CATEGORIA */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Filter className="w-4 h-4 text-ink-muted shrink-0 mr-1" />
        {categorias.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategoriaAtiva(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border min-h-[38px] ${
              categoriaAtiva === cat.id
                ? 'bg-accent text-white dark:text-slate-950 border-accent font-bold'
                : 'bg-bench-card text-ink-muted hover:text-ink border-bench-border'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* LISTA DE ITENS DE SUBSTITUIÇÃO */}
      <div className="space-y-4">
        {itensFiltrados.map((item) => (
          <Card key={item.id} className="space-y-4">
            {/* TOPO DO CARD: PEÇA FALTANTE & SUBSTITUTO */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-bench-border pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                    Faltou:
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-bench-elevated text-ink">
                    {item.categoria}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-ink">
                  {item.pecaFaltante}
                </h2>
                <div className="mt-1 flex items-center gap-1.5 text-sm font-bold text-accent">
                  <span>Substituto recomendado:</span>
                  <span className="text-ink underline decoration-accent/40">
                    {item.substitutoRecomendado}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                {renderBadgeConfianca(item.confianca)}
              </div>
            </div>

            {/* RESUMO PRÁTICO */}
            <p className="text-sm text-ink leading-relaxed font-medium">
              {item.resumoTroca}
            </p>

            {/* ALERTA DE PINAGEM (SE HOUVER) */}
            {item.alertaPinagem && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Alerta Crítico de Pinagem
                </span>
                <p className="text-xs sm:text-sm font-mono whitespace-pre-line leading-relaxed">
                  {item.alertaPinagem}
                </p>
              </div>
            )}

            {/* GRADE COM O QUE MUDA NA LIGAÇÃO, NO CÓDIGO E CUIDADOS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-bench-elevated border border-bench-border space-y-1">
                <span className="font-bold text-ink flex items-center gap-1.5 uppercase tracking-wider">
                  <Wrench className="w-3.5 h-3.5 text-accent" />
                  O que muda na ligação:
                </span>
                <p className="text-ink-muted leading-relaxed">
                  {item.oQueMudaLigacao}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-bench-elevated border border-bench-border space-y-1">
                <span className="font-bold text-ink flex items-center gap-1.5 uppercase tracking-wider">
                  <Code className="w-3.5 h-3.5 text-accent" />
                  O que muda no código:
                </span>
                <p className="text-ink-muted leading-relaxed">
                  {item.oQueMudaCodigo}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-bench-elevated border border-bench-border space-y-1">
                <span className="font-bold text-ink flex items-center gap-1.5 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-accent" />
                  Cuidados elétricos:
                </span>
                <p className="text-ink-muted leading-relaxed">
                  {item.cuidadosTensaoCorrente}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {itensFiltrados.length === 0 && (
          <Card className="p-10 text-center space-y-3">
            <Shuffle className="w-8 h-8 text-ink-muted mx-auto" />
            <h3 className="font-bold text-ink">Nenhuma substituição encontrada para "{busca}"</h3>
            <p className="text-xs text-ink-muted max-w-md mx-auto">
              Tente buscar por termos mais simples como "resistor", "led", "servo", "transistor" ou limpe a busca para ver todas as 16 famílias catalogadas.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
