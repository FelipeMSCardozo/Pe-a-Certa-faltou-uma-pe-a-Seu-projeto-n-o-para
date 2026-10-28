import { test, expect } from '@playwright/test';

test.describe('App 2: Peça Certa E2E', () => {
  test('navigates routes, tests search and calculators, and checks 0 console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Home
    await page.goto('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/#/');
    await expect(page.locator('h1')).toContainText('Seu projeto não para');

    // 2. Busca de Substituições
    await page.goto('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/#/substituicoes');
    await expect(page.locator('h1')).toContainText('Posso Trocar?');
    await expect(page.getByText('Resistor de 220 Ω (para LED)')).toBeVisible();

    // Filtrar por transistor
    const searchInput = page.getByPlaceholder(/Buscar por peça/i);
    await searchInput.fill('bc547');
    await expect(page.getByText('Transistor NPN BC547')).toBeVisible();
    await expect(page.getByText('Alerta Crítico de Pinagem')).toBeVisible();

    // 3. Calculadoras
    await page.goto('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/#/calculadoras?tab=resistor-led');
    await expect(page.locator('h1')).toContainText('Calculadoras de Bancada');
    await expect(page.getByText('220 Ω')).toBeVisible();

    // Mudar para combinador
    await page.getByRole('tab', { name: /Combinador/ }).click();
    await expect(page.getByText('Melhores Combinações Encontradas')).toBeVisible();

    // Mudar para código de cores
    await page.getByRole('tab', { name: /Código de Cores/ }).click();
    await expect(page.getByText('Resistor desenhado com as cores selecionadas')).toBeVisible();

    // Mudar para divisor de tensão
    await page.getByRole('tab', { name: /Divisor de Tensão/ }).click();
    await expect(page.getByText('3.33 V', { exact: true })).toBeVisible();

    // 4. Tensões 5V vs 3.3V
    await page.goto('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/#/tensoes');
    await expect(page.locator('h1')).toContainText('5V vs 3.3V');
    await expect(page.getByRole('heading', { name: /Bluetooth HC-05/ }).first()).toBeVisible();

    // 5. Trocas Perigosas
    await page.goto('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/#/trocas-perigosas');
    await expect(page.locator('h1')).toContainText('Não Faça Isso');

    // 6. Sobre
    await page.goto('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/#/sobre');
    await expect(page.locator('h1')).toContainText('Sobre o Peça Certa');

    // Zero console errors
    const realErrors = consoleErrors.filter((e) => !e.includes('favicon'));
    expect(realErrors).toEqual([]);
  });

  test('serves PWA manifest and service worker', async ({ request }) => {
    const manifest = await request.get('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/manifest.webmanifest');
    expect(manifest.status()).toBe(200);
    const json = await manifest.json();
    expect(json.name).toContain('Peça Certa');

    const sw = await request.get('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/sw.js');
    expect(sw.status()).toBe(200);
  });
});
