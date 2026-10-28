import { test } from '@playwright/test';

test('capture screenshots of main screens', async ({ page }, testInfo) => {
  const isMobile = testInfo.project.name.includes('Mobile');
  const folder = isMobile ? 'mobile' : 'desktop';

  // Home
  await page.goto('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/#/');
  await page.screenshot({ path: `screenshots/${folder}/01_home.png`, fullPage: false });

  // Substituições
  await page.goto('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/#/substituicoes');
  await page.screenshot({ path: `screenshots/${folder}/02_substituicoes.png`, fullPage: false });

  // Calculadoras
  await page.goto('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/#/calculadoras?tab=cores');
  await page.screenshot({ path: `screenshots/${folder}/03_calculadoras.png`, fullPage: false });

  // Tensões
  await page.goto('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/#/tensoes');
  await page.screenshot({ path: `screenshots/${folder}/04_tensoes.png`, fullPage: false });

  // Trocas Perigosas
  await page.goto('/Pe-a-Certa-faltou-uma-pe-a-Seu-projeto-n-o-para/#/trocas-perigosas');
  await page.screenshot({ path: `screenshots/${folder}/05_trocas_perigosas.png`, fullPage: false });
});
