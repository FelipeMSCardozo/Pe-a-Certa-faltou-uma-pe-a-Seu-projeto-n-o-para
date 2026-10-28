import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Substituicoes } from './pages/Substituicoes';
import { Calculadoras } from './pages/Calculadoras';
import { TensoesPage } from './pages/TensoesPage';
import { TrocasPerigosasPage } from './pages/TrocasPerigosasPage';
import { SobrePage } from './pages/SobrePage';

export default function App() {
  return (
    <div data-app="peca-certa" className="min-h-screen bg-bench text-ink flex flex-col transition-colors selection:bg-accent/20">
      <Navigation />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/substituicoes" element={<Substituicoes />} />
          <Route path="/calculadoras" element={<Calculadoras />} />
          <Route path="/tensoes" element={<TensoesPage />} />
          <Route path="/trocas-perigosas" element={<TrocasPerigosasPage />} />
          <Route path="/sobre" element={<SobrePage />} />
        </Routes>
      </main>
      <footer className="hidden md:block py-6 border-t border-bench-border text-center text-xs text-ink-muted">
        Peça Certa • Bônus Exclusivo 80 Projetos Arduino
      </footer>
    </div>
  );
}
