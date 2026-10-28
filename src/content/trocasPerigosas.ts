export interface TrocaPerigosa {
  id: string;
  titulo: string;
  oQueMuitosFazem: string;
  porQueEPorigoso: string;
  oQueAconteceNaPlaca: string;
  comoFazerCerto: string;
}

export const TROCAS_PERIGOSAS: TrocaPerigosa[] = [
  {
    id: 'motor-direto-no-pino',
    titulo: 'Ligar Motor DC ou Solenoide Direto no Pino do Arduino',
    oQueMuitosFazem: 'Conectar os dois fios de um motor elétrico diretamente entre um pino digital (ex: D9) e o GND.',
    porQueEPorigoso: 'Motores exigem centenas de miliamperes para dar a partida. O limite seguro de um pino do Arduino é de apenas 20 mA. Além disso, quando o motor desliga, as bobinas geram um pico de tensão reversa ("kickback indutivo") de dezenas de volts.',
    oQueAconteceNaPlaca: 'A porta digital queima na mesma hora ou o microcontrolador ATmega328P para de responder permanentemente.',
    comoFazerCerto: 'Sempre acione motores através de um transistor NPN (BC337 com diodo 1N4007 em antiparalelo para absorver o pico) ou use um módulo driver como L298N ou L9110S.',
  },
  {
    id: 'bateria-9v-em-servos',
    titulo: 'Alimentar 4 Servomotores com uma Única Bateria Retangular de 9V',
    oQueMuitosFazem: 'Espetar 4 servos no Arduino e ligar uma bateria de 9V comum no conector Jack para alimentar tudo.',
    porQueEPorigoso: 'A bateria de 9V comum tem resistência interna alta e baixa capacidade de corrente. Quando os servos se movem juntos, a corrente passa de 1.5A, a tensão da bateria despenca para menos de 4V e o regulador de 5V da placa superaquece.',
    oQueAconteceNaPlaca: 'O Arduino reinicia continuamente em loop (reset por brownout) e o regulador 1117 da placa pode queimar por sobretemperatura.',
    comoFazerCerto: 'Alimente os servomotores com uma fonte externa de 5V/6V (ou suporte para 4 pilhas AA alcalinas), compartilhando o fio GND com o Arduino.',
  },
  {
    id: 'injecao-mais-5v-no-pino-5v',
    titulo: 'Injetar 9V ou 12V Direto no Pino Marcado "5V"',
    oQueMuitosFazem: 'Ligar uma fonte de 12V diretamente no pino "5V" da barra de conectores.',
    porQueEPorigoso: 'O pino marcado como "5V" é a saída pós-regulador. Ele não possui proteção contra sobretensão.',
    oQueAconteceNaPlaca: 'Todos os chips da placa recebem 12V instantâneos e queimam imediatamente, inutilizando o microcontrolador e o conversor USB.',
    comoFazerCerto: 'Tensões acima de 7V (até 12V) devem ser ligadas SEMPRE no pino "Vin" ou no conector Jack P4 circular, onde o regulador interno reduz para 5V com segurança.',
  },
  {
    id: 'trocar-resistor-por-jumper',
    titulo: 'Substituir o Resistor do LED por um Jumper Direto',
    oQueMuitosFazem: '"Não tenho resistor de 220 ohms, vou ligar o LED direto no pino digital só pra ver se funciona rapidinho".',
    porQueEPorigoso: 'Um diodo emissor de luz quando aceso tem resistência interna desprezível. Sem resistor limitador, a corrente dispara para mais de 80 mA.',
    oQueAconteceNaPlaca: 'O LED dá uma piscada muito forte, queima o cristal interno e, pior: drena corrente suficiente para danificar o estágio de saída de silício da porta do microcontrolador.',
    comoFazerCerto: 'Nunca ligue LED sem resistor! Se faltar 220 Ω, use 330 Ω, 470 Ω, 1 kΩ ou até dois resistores associados.',
  },
];
