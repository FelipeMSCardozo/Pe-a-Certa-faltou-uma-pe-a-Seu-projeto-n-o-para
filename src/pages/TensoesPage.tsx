import React from 'react';
import { Zap } from 'lucide-react';
import { Card, ResponsiveTable } from '../components/ui';
import { BluetoothDividerDiagramSvg } from '../illustrations/HardwareSvgs';
import { MODULOS_TENSAO } from '../content/tensoes';

export const TensoesPage: React.FC = () => {
  const tableRows = MODULOS_TENSAO.map((m) => [
    m.nome,
    m.tensaoAlimentacao,
    m.tensaoSinalLogico,
    m.tolerancia5V ? 'Sim (Aceita 5V)' : 'NÃO (Risco de queima)',
    m.comoProteger,
  ]);

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-5xl mx-auto">
      {/* CABEÇALHO */}
      <div>
        <span className="text-xs font-bold text-accent uppercase tracking-wider">
          Compatibilidade Lógica
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
          <Zap className="w-7 h-7 text-accent" />
          Tabela de Tensões: 5V vs 3.3V
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          Saiba quais módulos aceitam 5V direto e quais exigem proteção para não queimar.
        </p>
      </div>

      {/* DIAGRAMA DO DIVISOR DE TENSÃO */}
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-ink">
              Como Proteger Módulos de 3.3V (Circuito Divisor 1kΩ + 2kΩ)
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Converte os 5V do pino TX do Arduino para 3.33V seguros para o pino RX do módulo.
            </p>
          </div>
        </div>
        <BluetoothDividerDiagramSvg />
      </Card>

      {/* TABELA DE MÓDULOS */}
      <Card className="space-y-4">
        <h2 className="text-base font-bold text-ink">
          Módulos Mais Usados e Compatibilidade
        </h2>
        <ResponsiveTable
          headers={['Módulo / Sensor', 'Alimentação VCC', 'Nível Lógico', 'Tolera 5V no Sinal?', 'Como Ligar com Segurança']}
          rows={tableRows}
        />
      </Card>

      {/* CARDS DETALHADOS DE ALERTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULOS_TENSAO.map((mod) => (
          <Card key={mod.nome} className={`space-y-2 ${mod.tolerancia5V ? 'border-emerald-500/30' : 'border-amber-500/30'}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ink text-base">{mod.nome}</h3>
              {mod.tolerancia5V ? (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  5V Seguro
                </span>
              ) : (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  Exige 3.3V
                </span>
              )}
            </div>

            <p className="text-xs text-ink leading-relaxed">
              <strong>Risco de erro:</strong> {mod.riscoSeLigar5V}
            </p>

            <div className="p-3 rounded-xl bg-bench-elevated border border-bench-border text-xs text-ink-muted">
              <strong>Como proteger:</strong> {mod.comoProteger}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
