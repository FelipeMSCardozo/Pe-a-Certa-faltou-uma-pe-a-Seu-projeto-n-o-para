import React from 'react';
import { Shuffle, Smartphone, WifiOff, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui';

export const SobrePage: React.FC = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-bold text-accent uppercase tracking-wider">
          Guia do Usuário
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
          <Shuffle className="w-7 h-7 text-accent" />
          Sobre o Peça Certa
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          O consultor definitivo de compatibilidade para sua bancada de eletrônica.
        </p>
      </div>

      <Card className="space-y-4">
        <h2 className="text-lg font-bold text-ink">Nunca mais desista de um projeto por falta de uma peça</h2>
        <p className="text-sm text-ink-muted leading-relaxed">
          A maioria dos iniciantes desiste de montar um circuito quando percebe que a lista de materiais pede um resistor de 330 ohms e ele só tem de 220, ou quando o projeto usa transistor BC547 e na caixinha dele só tem 2N2222.
        </p>
        <p className="text-sm text-ink-muted leading-relaxed">
          O <strong>Peça Certa</strong> elimina essa trava mental: ele orienta como adaptar ligações, o que ajustar no código e calcula valores comerciais em segundos, garantindo que você aproveite ao máximo cada componente que já comprou.
        </p>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="space-y-2">
          <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-bold">
            <WifiOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ink text-sm">Offline na Bancada</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Todas as calculadoras e tabelas funcionam 100% offline direto no seu dispositivo.
          </p>
        </Card>

        <Card className="space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ink text-sm">Instalável (PWA)</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Instale na tela do celular como um aplicativo nativo para consultar na bancada.
          </p>
        </Card>

        <Card className="space-y-2">
          <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-500 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ink text-sm">100% Confiável</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Sem números inventados. Todos os limites e pinagens foram conferidos em datasheets reais de fabricantes.
          </p>
        </Card>
      </div>

      <footer className="pt-8 border-t border-bench-border text-center text-xs text-ink-muted">
        Peça Certa • Bônus Exclusivo do treinamento "80 Projetos Arduino"
      </footer>
    </div>
  );
};
