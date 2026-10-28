# Peça Certa: faltou uma peça? Seu projeto não para

> **Bônus Exclusivo — 80 Projetos Arduino**  
> Aplicação Web estática (PWA) de bancada, desenvolvida em React + TypeScript + Tailwind CSS, com funcionamento 100% offline e deploy automatizado no GitHub Pages.

---

## 🎯 Promessa do Aplicativo

Faltou o resistor exato ou o sensor da lista? Veja quais peças você pode trocar pelas que já tem em casa e os cuidados com tensão e corrente para fazer a substituição com segurança e sem queimar componentes.

---

## 🚀 Funcionalidades

1. **"Posso trocar?" — Banco de Dados de Substituições:**
   - 16 famílias completas de componentes cobertas (resistores, LEDs de cores e tamanhos variados, capacitores, botões, buzzers ativos e passivos, potenciômetros, transistores NPN BC547/BC337/2N2222, DHT11/DHT22, servos SG90/MG90S, drivers L298N/L9110S, Uno/Nano/Mega, sensores ultrassônicos/LDR/PIR, displays I2C/paralelos, jumpers e fontes).
   - Nível de confiança claro: **Troca direta**, **Troca com ajuste** ou **Não troque**.
   - O que muda na ligação física, o que muda no código e cuidados de corrente.
   - **Alerta Crítico de Pinagem** para transistores (C-B-E vs E-B-C).
2. **5 Calculadoras de Bancada Testadas:**
   - **Resistor para LED:** $R = (V_{fonte} - V_{led}) / I$, sugerindo o valor comercial E12 imediatamente superior.
   - **Combinador de Resistores:** Associações em série e paralelo com resistores da sua gaveta.
   - **Código de Cores:** Decodificador de 4 faixas com desenho do resistor gerado dinamicamente em SVG vetorial.
   - **Divisor de Tensão:** $V_{out} = V_{in} \cdot R_2 / (R_1 + R_2)$ com indicação de compatibilidade 5V para 3.3V.
   - **Verificador de Corrente do Pino:** Avisa visualmente quando ultrapassa o limite seguro de 20mA e orienta o uso de transistores.
3. **Tabela de Tensões (5V vs 3.3V):**
   - Módulos que toleram 5V e módulos que queimam (ESP8266, MicroSD sem regulador, NRF24L01), com circuitos de proteção ilustrados.
4. **"Não Faça Isso!":**
   - Os 4 maiores erros de bancada que danificam portas do microcontrolador.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** React 18 + TypeScript (Strict Mode)
- **Estilos:** Tailwind CSS (Design System com destaque Ciano `#06B6D4`)
- **Roteador:** React Router (HashRouter)
- **PWA:** `vite-plugin-pwa` com precache de assets e funcionamento offline
- **Ícones:** Lucide React
- **Tipografia:** `@fontsource/inter` e `@fontsource/jetbrains-mono`
- **Qualidade & Testes:** Vitest (17 testes unitários nas calculadoras), Playwright (testes E2E em mobile e desktop), ESLint e verificação de textos proibidos.

---

## 💻 Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Rodar testes unitários das calculadoras
npm run test

# Rodar testes E2E (Playwright)
npm run test:e2e

# Verificar qualidade e ausência de termos proibidos
npm run check:forbidden

# Gerar build de produção
npm run build
```

---

## 🌐 Deploy no GitHub Pages

O deploy é executado automaticamente pelo GitHub Actions a cada commit na branch `main`. A URL publicada oficial é:
`https://felipemscardozo.github.io/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/`
