export interface ModuloTensao {
  nome: string;
  tolerancia5V: boolean;
  tensaoAlimentacao: string;
  tensaoSinalLogico: string;
  riscoSeLigar5V: string;
  comoProteger: string;
}

export const MODULOS_TENSAO: ModuloTensao[] = [
  {
    nome: 'Bluetooth HC-05 / HC-06',
    tolerancia5V: false,
    tensaoAlimentacao: '5V (VCC possui regulador na plaquinha)',
    tensaoSinalLogico: '3.3V nos pinos RX e TX',
    riscoSeLigar5V: 'O pino RX do Bluetooth recebe 5V do TX do Arduino e superaquece o chip de rádio, diminuindo o alcance ou queimando a recepção após alguns dias.',
    comoProteger: 'Use um divisor de tensão resistivo simples: resistor de 1 kΩ entre o TX do Arduino e o RX do módulo, e resistor de 2 kΩ (ou dois de 1k em série) entre o RX do módulo e o GND.',
  },
  {
    nome: 'Módulo de Cartão MicroSD (Sem conversor)',
    tolerancia5V: false,
    tensaoAlimentacao: '3.3V obrigatório',
    tensaoSinalLogico: '3.3V (SPI: MOSI, SCK, CS)',
    riscoSeLigar5V: 'Queima instantânea do cartão de memória e perda irreversível de dados.',
    comoProteger: 'Prefira módulos que já venham de fábrica com chip conversor de nível (chip de 14 pinos 74LVC125A) ou use resistores divisores em todas as linhas de sinal que saem do Arduino.',
  },
  {
    nome: 'Display OLED 0.96" I2C (SSD1306)',
    tolerancia5V: true,
    tensaoAlimentacao: '3.3V a 5.0V (regulador interno embutido)',
    tensaoSinalLogico: 'Compatível com 3.3V e 5V nos pinos SDA e SCL',
    riscoSeLigar5V: 'Operação segura na maioria dos módulos comuns com regulador de 662K na parte traseira.',
    comoProteger: 'Pode ligar diretamente no 5V, GND, A4 (SDA) e A5 (SCL) do Arduino Uno.',
  },
  {
    nome: 'Módulo de Rádio NRF24L01+ (2.4GHz)',
    tolerancia5V: false,
    tensaoAlimentacao: '3.3V RIGOROSO (Máximo 3.6V)',
    tensaoSinalLogico: 'Pinos de sinal toleram 5V, mas o pino VCC queima com mais de 3.6V',
    riscoSeLigar5V: 'Queima imediata do transmissor de radiofrequência.',
    comoProteger: 'Ligue o pino VCC apenas na saída 3.3V do Arduino (e adicione um capacitor eletrolítico de 10µF entre VCC e GND para estabilizar os pulsos de transmissão).',
  },
  {
    nome: 'Módulo Wi-Fi ESP8266 (ESP-01)',
    tolerancia5V: false,
    tensaoAlimentacao: '3.3V RIGOROSO',
    tensaoSinalLogico: '3.3V nos pinos RX e TX',
    riscoSeLigar5V: 'Destruição do microcontrolador Tensilica interno.',
    comoProteger: 'Use fonte externa de 3.3V (o pino 3.3V do Arduino Uno não fornece a corrente de pico de 300mA que o ESP8266 exige ao transmitir Wi-Fi).',
  },
  {
    nome: 'Sensor Ultrassônico HC-SR04 Tradicional',
    tolerancia5V: true,
    tensaoAlimentacao: '5V obrigatório (não funciona em 3.3V puro)',
    tensaoSinalLogico: 'Sinais de 5V nos pinos Trig e Echo',
    riscoSeLigar5V: 'Totalmente seguro no Arduino Uno.',
    comoProteger: 'Se for usar o HC-SR04 tradicional em placas de 3.3V (como ESP32 ou Raspberry Pi), coloque divisor no pino Echo.',
  },
];
