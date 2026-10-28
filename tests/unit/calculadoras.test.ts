import { describe, it, expect } from 'vitest';
import {
  calcularResistorLed,
  combinarResistores,
  decodificarCores4Faixas,
  calcularDivisorTensao,
  verificarCorrentePino,
} from '../../src/utils/calculadoras';

describe('App 2 - Calculadoras Unit Tests', () => {
  describe('Calculadora de Resistor para LED', () => {
    it('calcula corretamente para LED Vermelho comum (5V, 2V, 15mA)', () => {
      // R = (5 - 2) / 0.015 = 200 Ω -> E12 superior = 220 Ω
      const res = calcularResistorLed(5, 2, 15);
      expect(res.rCalculado).toBe(200);
      expect(res.rComercialE12).toBe(220);
      expect(res.correnteReal_mA).toBeCloseTo(13.6, 1);
      expect(res.potencia_W).toBeLessThan(0.1);
    });

    it('calcula para LED Azul (5V, 3.2V, 20mA)', () => {
      // R = (5 - 3.2) / 0.02 = 90 Ω -> E12 superior = 100 Ω
      const res = calcularResistorLed(5, 3.2, 20);
      expect(res.rCalculado).toBe(90);
      expect(res.rComercialE12).toBe(100);
    });

    it('rejeita entradas inválidas: zero, negativo, fonte menor que LED', () => {
      expect(() => calcularResistorLed(0, 2, 15)).toThrow();
      expect(() => calcularResistorLed(5, 0, 15)).toThrow();
      expect(() => calcularResistorLed(5, 2, -10)).toThrow();
      expect(() => calcularResistorLed(3, 3.5, 15)).toThrow('precisa ser maior');
      expect(() => calcularResistorLed(NaN, 2, 15)).toThrow();
    });
  });

  describe('Combinador de Resistores', () => {
    it('encontra valor exato se disponível', () => {
      const res = combinarResistores(220, [100, 220, 1000]);
      expect(res[0].tipo).toBe('exato');
      expect(res[0].erroPercentual).toBe(0);
    });

    it('calcula associação em série quando não tem o valor exato', () => {
      // Alvo 440 Ω -> Série 220 + 220 = 440 Ω
      const res = combinarResistores(440, [100, 220, 1000]);
      const serie = res.find((r) => r.tipo === 'serie');
      expect(serie).toBeDefined();
      expect(serie?.rResultante).toBe(440);
      expect(serie?.erroPercentual).toBe(0);
    });

    it('calcula associação em paralelo', () => {
      // Alvo 500 Ω com dois de 1000 Ω -> 1000 // 1000 = 500 Ω
      const res = combinarResistores(500, [1000, 220]);
      const paralelo = res.find((r) => r.tipo === 'paralelo');
      expect(paralelo).toBeDefined();
      expect(paralelo?.rResultante).toBe(500);
      expect(paralelo?.erroPercentual).toBe(0);
    });

    it('lida com lista vazia ou entradas inválidas sem quebrar', () => {
      expect(combinarResistores(0, [100])).toEqual([]);
      expect(combinarResistores(220, [])).toEqual([]);
      expect(combinarResistores(-50, [100])).toEqual([]);
    });
  });

  describe('Decodificador de Código de Cores', () => {
    it('decodifica resistor de 220 Ω (Vermelho, Vermelho, Marrom, Ouro)', () => {
      const res = decodificarCores4Faixas('vermelho', 'vermelho', 'marrom', 'ouro');
      expect(res.ohms).toBe(220);
      expect(res.textoFormatado).toBe('220 Ω ±5%');
    });

    it('decodifica resistor de 10 kΩ (Marrom, Preto, Laranja, Ouro)', () => {
      const res = decodificarCores4Faixas('marrom', 'preto', 'laranja', 'ouro');
      expect(res.ohms).toBe(10000);
      expect(res.textoFormatado).toBe('10 kΩ ±5%');
    });

    it('decodifica resistor de 1 MΩ (Marrom, Preto, Verde, Ouro)', () => {
      const res = decodificarCores4Faixas('marrom', 'preto', 'verde', 'ouro');
      expect(res.ohms).toBe(1000000);
      expect(res.textoFormatado).toBe('1 MΩ ±5%');
    });

    it('rejeita cores inexistentes', () => {
      expect(() => decodificarCores4Faixas('invalida', 'vermelho', 'marrom', 'ouro')).toThrow();
    });
  });

  describe('Divisor de Tensão', () => {
    it('calcula divisor padrão 5V para 3.3V com 1kΩ e 2kΩ', () => {
      // Vout = 5 * (2000 / (1000 + 2000)) = 5 * 2/3 = 3.33V
      const res = calcularDivisorTensao(5, 1000, 2000);
      expect(res.vOut).toBe(3.33);
      expect(res.adequadoPara3v3).toBe(true);
      expect(res.corrente_mA).toBeCloseTo(1.67, 1);
    });

    it('rejeita entradas inválidas ou negativas', () => {
      expect(() => calcularDivisorTensao(0, 1000, 2000)).toThrow();
      expect(() => calcularDivisorTensao(5, -100, 2000)).toThrow();
      expect(() => calcularDivisorTensao(5, 1000, 0)).toThrow();
    });
  });

  describe('Verificador de Corrente do Pino', () => {
    it('avalia como seguro correntes até 20mA', () => {
      const res = verificarCorrentePino(15);
      expect(res.status).toBe('seguro');
    });

    it('avalia como atenção correntes entre 21 e 40mA', () => {
      const res = verificarCorrentePino(30);
      expect(res.status).toBe('atencao');
    });

    it('avalia como perigo correntes acima de 40mA', () => {
      const res = verificarCorrentePino(120);
      expect(res.status).toBe('perigo');
      expect(res.recomendacao).toContain('transistor');
    });

    it('rejeita valores negativos', () => {
      expect(() => verificarCorrentePino(-5)).toThrow();
    });
  });
});
