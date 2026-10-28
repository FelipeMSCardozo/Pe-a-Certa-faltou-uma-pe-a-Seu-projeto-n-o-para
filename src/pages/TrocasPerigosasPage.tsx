import React from 'react';
import { AlertTriangle, Flame } from 'lucide-react';
import { Card } from '../components/ui';
import { TROCAS_PERIGOSAS } from '../content/trocasPerigosas';

export const TrocasPerigosasPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-4xl mx-auto">
      {/* CABEÇALHO */}
      <div>
        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
          Erros Fatais de Bancada
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
          <AlertTriangle className="w-7 h-7 text-rose-500" />
          "Não Faça Isso!": Trocas Perigosas Comuns
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          Aprenda com os erros mais caros dos iniciantes para não queimar sua placa.
        </p>
      </div>

      <div className="space-y-4">
        {TROCAS_PERIGOSAS.map((item, idx) => (
          <Card key={item.id} className="space-y-4 border-l-4 border-l-rose-500">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-xl bg-rose-500 text-white font-bold text-sm flex items-center justify-center shrink-0">
                #{idx + 1}
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink">{item.titulo}</h2>
                <p className="text-xs text-ink-muted mt-0.5 italic">
                  "{item.oQueMuitosFazem}"
                </p>
              </div>
            </div>

            <div className="pl-10 space-y-3">
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs sm:text-sm text-ink leading-relaxed">
                <span className="font-bold text-rose-500 block mb-1 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  Por que é perigoso:
                </span>
                {item.porQueEPorigoso}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-bench-elevated border border-bench-border space-y-1">
                  <strong className="text-rose-500 uppercase block tracking-wider">O que acontece na placa:</strong>
                  <p className="text-ink-muted leading-relaxed">{item.oQueAconteceNaPlaca}</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <strong className="text-emerald-500 uppercase block tracking-wider">Como fazer do jeito certo:</strong>
                  <p className="text-ink leading-relaxed">{item.comoFazerCerto}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
