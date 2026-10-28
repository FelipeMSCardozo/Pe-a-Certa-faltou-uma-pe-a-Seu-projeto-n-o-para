export type NivelConfianca = 'troca-direta' | 'troca-com-ajuste' | 'nao-troque';

export type CategoriaPeca =
  | 'resistores'
  | 'leds'
  | 'capacitores'
  | 'botoes'
  | 'audio'
  | 'potenciometros'
  | 'semicondutores'
  | 'sensores'
  | 'atuadores'
  | 'drivers'
  | 'placas'
  | 'displays'
  | 'conexoes'
  | 'alimentacao';

export interface SubstituicaoItem {
  id: string;
  pecaFaltante: string;
  categoria: CategoriaPeca;
  confianca: NivelConfianca;
  substitutoRecomendado: string;
  resumoTroca: string;
  oQueMudaLigacao: string;
  oQueMudaCodigo: string;
  cuidadosTensaoCorrente: string;
  alertaPinagem?: string;
  tagsBusca: string[];
}

export const SUBSTITUICOES: SubstituicaoItem[] = [
  {
    id: 'resistor-valor-proximo',
    pecaFaltante: 'Resistor de 220 Ω (para LED)',
    categoria: 'resistores',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'Resistor de 270 Ω, 330 Ω ou dois de 100 Ω em série',
    resumoTroca: 'Pode usar qualquer resistor entre 150 Ω e 470 Ω para limitar corrente de LED.',
    oQueMudaLigacao: 'Encaixe exatamente no mesmo lugar. O resistor não tem polaridade (+ ou -).',
    oQueMudaCodigo: 'Nenhuma alteração no código (.ino). O microcontrolador continua enviando o mesmo sinal digital.',
    cuidadosTensaoCorrente: 'Quanto maior a resistência (ex: 470 Ω), menor a corrente e mais fraco o brilho do LED. Valores abaixo de 150 Ω podem superar 25mA e aquecer a porta do Arduino.',
    tagsBusca: ['resistor', '220', '330', 'led', 'limitador', 'resistencia', 'ohms'],
  },
  {
    id: 'resistor-combinacao',
    pecaFaltante: 'Resistor de 1 kΩ',
    categoria: 'resistores',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'Dois resistores de 470 Ω em série ou dois de 2 kΩ (2.2k) em paralelo',
    resumoTroca: 'Em série as resistências somam (R1 + R2). Em paralelo com dois iguais, o valor cai pela metade.',
    oQueMudaLigacao: 'Em série: ligue a perna do primeiro na perna do segundo na protoboard. Em paralelo: coloque os dois nas mesmas duas trilhas.',
    oQueMudaCodigo: 'Nenhuma alteração no código.',
    cuidadosTensaoCorrente: 'Certifique-se de que as pernas descalças de arame não encostem em trilhas vizinhas.',
    tagsBusca: ['resistor', '1k', 'serie', 'paralelo', 'associacao'],
  },
  {
    id: 'led-cores-diferentes',
    pecaFaltante: 'LED Vermelho 5mm',
    categoria: 'leds',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'LED Amarelo, Verde, Azul ou Branco',
    resumoTroca: 'Cores diferentes possuem quedas de tensão direta (Vf) diferentes e precisam de cálculo conferido.',
    oQueMudaLigacao: 'Mesma ligação física: perna longa (ânodo) no sinal via resistor, perna curta (cátodo) no GND.',
    oQueMudaCodigo: 'Nenhuma alteração no código.',
    cuidadosTensaoCorrente: 'LEDs vermelhos operam com ~1.8V a 2.0V (resistor de 220 Ω dá 14mA). LEDs azuis e brancos operam com ~3.0V a 3.3V: com o mesmo resistor de 220 Ω em 5V a corrente cai para ~8mA (o que é seguro e tem ótimo brilho). Para azul/branco, um resistor de 150 Ω a 220 Ω é ideal.',
    tagsBusca: ['led', 'vermelho', 'verde', 'azul', 'branco', 'amarelo', 'cor', 'queda de tensao'],
  },
  {
    id: 'led-5mm-vs-3mm',
    pecaFaltante: 'LED Difuso de 5mm',
    categoria: 'leds',
    confianca: 'troca-direta',
    substitutoRecomendado: 'LED Difuso de 3mm da mesma cor',
    resumoTroca: 'Troca 100% direta sem necessidade de alterar resistores.',
    oQueMudaLigacao: 'Encaixe idêntico na protoboard. Respeite ânodo (+) e cátodo (-).',
    oQueMudaCodigo: 'Nenhuma alteração necessária.',
    cuidadosTensaoCorrente: 'O LED de 3mm suporta os mesmos 20mA máximos de corrente contínua que o modelo de 5mm.',
    tagsBusca: ['led', '3mm', '5mm', 'tamanho', 'capsula'],
  },
  {
    id: 'capacitor-tensao-capacitancia',
    pecaFaltante: 'Capacitor Eletrolítico 10 µF / 16V',
    categoria: 'capacitores',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'Capacitor Eletrolítico de 10 µF a 100 µF com tensão nominal de 25V, 35V ou 50V',
    resumoTroca: 'A tensão marcada na carcaça é a tensão MÁXIMA que o capacitor suporta. Pode ser maior, nunca menor.',
    oQueMudaLigacao: 'ATENÇÃO À POLARIDADE: A faixa com sinal negativo (-) estampada no corpo precisa SEMPRE ser ligada ao GND. Em circuitos AC ou inversores, use capacitor cerâmico (sem polaridade).',
    oQueMudaCodigo: 'Nenhuma alteração no código.',
    cuidadosTensaoCorrente: 'NUNCA use um capacitor com tensão nominal menor que a alimentação do circuito (ex: nunca use capacitor de 6.3V em fonte de 9V/12V, pois ele explode).',
    tagsBusca: ['capacitor', 'eletrolitico', 'microfarad', 'voltagem', 'filtro', 'polaridade'],
  },
  {
    id: 'botao-push-vs-chave',
    pecaFaltante: 'Botão Tátil Push-button (Normal Aberto)',
    categoria: 'botoes',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'Chave alavanca, jumper solto ou botão de arcade',
    resumoTroca: 'Qualquer contato mecânico de 2 terminais que feche circuito quando acionado pode substituir o botão.',
    oQueMudaLigacao: 'Ligue um terminal no pino digital do Arduino e o outro no GND.',
    oQueMudaCodigo: 'Se trocar botão momentâneo por chave de alternância (on/off), o código que dependia de clique de borda continuará lendo LOW enquanto a chave estiver ligada.',
    cuidadosTensaoCorrente: 'Use sempre pinMode(PINO, INPUT_PULLUP) no Arduino para dispensar qualquer resistor externo de pull-up.',
    tagsBusca: ['botao', 'pushbutton', 'chave', 'interruptor', 'alavanca', 'pullup'],
  },
  {
    id: 'buzzer-ativo-vs-passivo',
    pecaFaltante: 'Buzzer Ativo de 5V',
    categoria: 'audio',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'Buzzer Passivo (ou mini alto-falante 8 Ω com resistor de 100 Ω)',
    resumoTroca: 'O buzzer ativo possui oscilador interno e apita apenas com digitalWrite(HIGH). O passivo precisa de frequências geradas pelo código com tone().',
    oQueMudaLigacao: 'Ligação física idêntica (positivo no pino do Arduino e negativo no GND). Se usar alto-falante de 8 Ω, adicione um resistor de 100 Ω em série para não queimar a porta.',
    oQueMudaCodigo: 'IMPORTANTE: No buzzer ativo, usa-se digitalWrite(pino, HIGH). Para o buzzer passivo apitar, troque por: tone(pino, 1000) para tocar 1kHz e noTone(pino) para silenciar!',
    cuidadosTensaoCorrente: 'Nunca ligue alto-falante de 4 Ω ou 8 Ω direto no pino do Arduino sem resistor limitador (5V / 8Ω = 625mA, o que destruiria a porta de 40mA na hora).',
    tagsBusca: ['buzzer', 'ativo', 'passivo', 'som', 'alarme', 'piezo', 'tone', 'frequencia'],
  },
  {
    id: 'potenciometro-valores',
    pecaFaltante: 'Potenciômetro Linear de 10 kΩ',
    categoria: 'potenciometros',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'Potenciômetro de 5 kΩ, 20 kΩ ou 50 kΩ linear',
    resumoTroca: 'Como o potenciômetro atua como divisor de tensão (0V a 5V) no pino analógico A0, o valor total tem pouco impacto na leitura.',
    oQueMudaLigacao: 'Terminais das pontas no 5V e GND; terminal central (cursor) no pino A0.',
    oQueMudaCodigo: 'Nenhuma alteração! A leitura analogRead(A0) continuará variando de 0 a 1023 proporcionalmente ao ângulo de giro.',
    cuidadosTensaoCorrente: 'Não use potenciômetros muito baixos (como 100 Ω), pois 5V / 100Ω drena 50mA contínuos da linha de alimentação sem necessidade. Valores entre 5k e 50k são perfeitos.',
    tagsBusca: ['potenciometro', 'trimpot', '10k', '5k', '50k', '100k', 'analogico'],
  },
  {
    id: 'transistores-npn-pinagem',
    pecaFaltante: 'Transistor NPN BC547',
    categoria: 'semicondutores',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'BC337, 2N2222 ou 2N3904 (NPN)',
    resumoTroca: 'Troca totalmente viável para acionar cargas de corrente média, MAS A PINAGEM FÍSICA MUDA!',
    oQueMudaLigacao: 'ALERTA MÁXIMO DE PINAGEM: A família BC (BC547, BC337) olhando de frente com a face plana tem pinagem Coletor - Base - Emissor (C-B-E). Já a família 2N (2N2222, 2N3904) tem pinagem Emissor - Base - Coletor (E-B-C)! Confira sempre a pinagem da peça antes de espetar na protoboard.',
    oQueMudaCodigo: 'Nenhuma alteração no código.',
    cuidadosTensaoCorrente: 'BC547 suporta até 100mA. O BC337 e o 2N2222 suportam até 800mA (muito mais robustos para relés e motores). Use sempre um resistor de base (1kΩ a 2.2kΩ).',
    alertaPinagem: 'PERIGO DE INVERSÃO: Olhando a face reta do transistor com as pernas para baixo:\n- BC547 / BC337: Pino 1 = Coletor, Pino 2 = Base, Pino 3 = Emissor (C-B-E)\n- 2N2222 / 2N3904: Pino 1 = Emissor, Pino 2 = Base, Pino 3 = Coletor (E-B-C)!',
    tagsBusca: ['transistor', 'bc547', 'bc337', '2n2222', '2n3904', 'npn', 'pinagem', 'base', 'coletor', 'emissor'],
  },
  {
    id: 'dht11-vs-dht22',
    pecaFaltante: 'Sensor de Temperatura e Umidade DHT11 (Azul)',
    categoria: 'sensores',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'Sensor DHT22 / AM2302 (Branco)',
    resumoTroca: 'O DHT22 é mais preciso e tem faixa de temperatura mais ampla, mas exige alterar a definição no código.',
    oQueMudaLigacao: 'Pinagem física igual (VCC no 5V, DATA no pino digital com resistor de pull-up de 10k, GND no terra).',
    oQueMudaCodigo: 'No código, altere a linha de configuração de #define DHTTYPE DHT11 para: #define DHTTYPE DHT22!',
    cuidadosTensaoCorrente: 'Ambos funcionam perfeitamente com 5V do Arduino Uno.',
    tagsBusca: ['dht11', 'dht22', 'am2302', 'temperatura', 'umidade', 'clima'],
  },
  {
    id: 'servo-sg90-vs-mg90s',
    pecaFaltante: 'Micro Servo Motor SG90 (Azul plástico)',
    categoria: 'atuadores',
    confianca: 'troca-direta',
    substitutoRecomendado: 'Micro Servo MG90S (Engrenagens metálicas)',
    resumoTroca: 'O MG90S tem o mesmo tamanho e torque superior, com engrenagens de metal mais resistentes.',
    oQueMudaLigacao: 'Conector de 3 fios com pinagem idêntica: Marrom = GND, Vermelho = VCC (5V), Laranja = Sinal PWM.',
    oQueMudaCodigo: 'Código 100% idêntico usando a biblioteca <Servo.h>.',
    cuidadosTensaoCorrente: 'Por ter engrenagens metálicas e mais força, o MG90S consome picos de corrente maiores (até 800mA em esforço). Evite alimentar múltiplos servos pelo pino 5V do Arduino; use fonte externa de 5V ou 6V.',
    tagsBusca: ['servo', 'sg90', 'mg90s', 'motor', 'angulo', 'engrenagem'],
  },
  {
    id: 'driver-motor-l298n-vs-l9110s',
    pecaFaltante: 'Módulo Ponte H L298N',
    categoria: 'drivers',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'Módulo Driver L9110S (Mini ponte H) ou Shield de Motor',
    resumoTroca: 'Ambos controlam 2 motores DC com sentido de rotação e velocidade PWM.',
    oQueMudaLigacao: 'O L298N usa 3 pinos por motor (ENA, IN1, IN2). O L9110S usa apenas 2 pinos por motor (A-IA, A-IB), simplificando a ligação.',
    oQueMudaCodigo: 'No L9110S, o controle de velocidade e sentido é feito aplicando PWM diretamente em uma das entradas enquanto a outra fica em LOW.',
    cuidadosTensaoCorrente: 'O L9110S suporta até 800mA contínuos por motor (ideal para motores amarelos com redução 48:1). O L298N suporta até 2A por canal, mas tem maior queda interna de tensão (~2V).',
    tagsBusca: ['driver', 'ponte h', 'l298n', 'l9110s', 'motor', 'dc', 'carrinho'],
  },
  {
    id: 'placas-uno-nano-mega',
    pecaFaltante: 'Placa Arduino Uno R3',
    categoria: 'placas',
    confianca: 'troca-direta',
    substitutoRecomendado: 'Arduino Nano V3 ou Arduino Mega 2560',
    resumoTroca: 'O Arduino Nano tem o mesmo microcontrolador (ATmega328P) do Uno, com os mesmos pinos D0 a D13 e A0 a A7.',
    oQueMudaLigacao: 'O Nano é montado diretamente na protoboard. O mapeamento de pinos é idêntico (D2 é D2, D8 é D8, A0 é A0).',
    oQueMudaCodigo: 'Na IDE do Arduino, mude a placa selecionada em Ferramentas -> Placa para "Arduino Nano" (e processador "ATmega328P Old Bootloader" se for clone chinês).',
    cuidadosTensaoCorrente: 'O regulador de 3.3V do Nano suporta menos corrente que o do Uno (cerca de 50mA).',
    tagsBusca: ['arduino', 'uno', 'nano', 'mega', 'placa', 'compativel', 'substituir placa'],
  },
  {
    id: 'display-lcd-i2c-vs-paralelo',
    pecaFaltante: 'Módulo I2C para Display LCD 16x2',
    categoria: 'displays',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'LCD 16x2 em modo paralelo direto de 16 pinos (ou Display OLED I2C SSD1306)',
    resumoTroca: 'O módulo I2C reduz a ligação de 16 fios para apenas 4 fios (VCC, GND, SDA, SCL). Sem ele, você pode ligar em paralelo ocupando 6 pinos do Arduino.',
    oQueMudaLigacao: 'Em paralelo, ligue os pinos RS, E, D4, D5, D6, D7 no Arduino e um potenciômetro de 10k para ajuste de contraste nos pinos V0, VDD e VSS.',
    oQueMudaCodigo: 'Troque a biblioteca LiquidCrystal_I2C por LiquidCrystal lcd(rs, en, d4, d5, d6, d7).',
    cuidadosTensaoCorrente: 'Atenção ao endereço I2C: se usar display I2C, a maioria usa endereço 0x27 ou 0x3F.',
    tagsBusca: ['lcd', '16x2', 'i2c', 'paralelo', 'display', 'liquidcrystal', 'tela'],
  },
  {
    id: 'jumpers-vs-fio-rigido',
    pecaFaltante: 'Jumpers Macho-Macho para protoboard',
    categoria: 'conexoes',
    confianca: 'troca-direta',
    substitutoRecomendado: 'Fio de rede UTP sólido (Cat5e / Cat6) desencapado',
    resumoTroca: 'O fio de cabo de rede de par trançado sólido (bitola 24 AWG) é um dos melhores condutores para protoboard.',
    oQueMudaLigacao: 'Corte no tamanho exato e desencape cerca de 6mm em cada ponta.',
    oQueMudaCodigo: 'Nenhuma alteração no código.',
    cuidadosTensaoCorrente: 'Fios rígidos ficam rentes à placa, diminuindo o risco de desconexão acidental durante testes.',
    tagsBusca: ['jumper', 'fio', 'cabo', 'conexao', 'rede', 'utp'],
  },
  {
    id: 'fonte-e-bateria-limites',
    pecaFaltante: 'Bateria de 9V com conector P4',
    categoria: 'alimentacao',
    confianca: 'troca-com-ajuste',
    substitutoRecomendado: 'Fonte de celular USB (5V) ou Fonte 9V/12V DC no pino Vin / Jack P4',
    resumoTroca: 'O Arduino Uno possui duas entradas de energia distintas com regras de tensão rigorosas.',
    oQueMudaLigacao: 'Pino Vin ou conector Jack redonda: Tensão permitida de 7V a 12V DC (o regulador interno abaixa para 5V). Pino 5V: Alimentação regulada de 5.0V EXATOS.',
    oQueMudaCodigo: 'Nenhuma alteração no código.',
    cuidadosTensaoCorrente: 'NUNCA injete mais de 5.5V diretamente no pino marcado como "5V"! Essa linha não passa pelo regulador e queima o microcontrolador na mesma hora.',
    tagsBusca: ['fonte', 'bateria', 'vin', '5v', 'alimentacao', 'jack p4', 'tensao'],
  },
];
