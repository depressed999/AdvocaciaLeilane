import { test, expect } from '@playwright/test';

test.describe('Suite de Testes Institucionais — Dra. Leilane dos Santos', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('1. Deofuscação segura de contatos via JavaScript', async ({ page }) => {
    // Valida que os seletores ofuscados foram decodificados com sucesso no cliente
    const phone1 = page.locator('[data-obf-type="phone1"]').first();
    await expect(phone1).toHaveText('(49) 9 8898-3043');

    const phone2 = page.locator('[data-obf-type="phone2"]').first();
    await expect(phone2).toHaveText('(69) 9 8472-5169');

    const email = page.locator('[data-obf-type="email"]').first();
    await expect(email).toHaveText('leilanesantos.adv@gmail.com');
  });

  test('2. Validação acessível do consentimento LGPD no formulário', async ({ page }) => {
    const consentCheckbox = page.locator('#lgpdConsent');
    const consentError = page.locator('#consentError');
    const btnSendWhatsApp = page.locator('#btnSendWhatsApp');

    // 1. Garante que o checkbox inicia desmarcado
    await expect(consentCheckbox).not.toBeChecked();
    await expect(consentError).not.toBeVisible();

    // 2. Tenta enviar sem consentimento -> deve exibir erro acessível (role="alert" / aria-live)
    await btnSendWhatsApp.click();
    await expect(consentError).toBeVisible();
    await expect(consentError).toContainText('É necessário concordar');
    await expect(consentCheckbox).toHaveAttribute('aria-invalid', 'true');

    // 3. Ao marcar o consentimento -> o erro deve ser limpo automaticamente
    await consentCheckbox.check();
    await expect(consentError).not.toBeVisible();
    await expect(consentCheckbox).not.toHaveAttribute('aria-invalid', 'true');
  });

  test('3. Bloqueio anti-bot através do campo Honeypot', async ({ page }) => {
    const consentCheckbox = page.locator('#lgpdConsent');
    const honeypot = page.locator('#contact_hp');
    const btnSendWhatsApp = page.locator('#btnSendWhatsApp');

    // Marca consentimento legítimo
    await consentCheckbox.check();

    // Simula bot preenchendo o campo invisível honeypot (usando force: true para campos ocultos)
    await honeypot.evaluate((el) => { el.value = 'https://spam-bot-link.example.com'; });

    // Monitora se alguma janela do WhatsApp tenta ser aberta
    let popupOpened = false;
    page.on('popup', () => { popupOpened = true; });

    await btnSendWhatsApp.click();
    await page.waitForTimeout(400);

    // O envio deve ser bloqueado silenciosamente
    expect(popupOpened).toBe(false);
  });

  test('4. CTAs dinâmicos por contexto nas Áreas de Atuação', async ({ page }) => {
    const areaSelect = page.locator('#contactArea');
    const messageInput = page.locator('#contactMessage');

    // Clica no CTA da especialidade Direito Trabalhista
    const trabalhistaBtn = page.locator('[data-cta-area="Direito Trabalhista"]');
    await trabalhistaBtn.click();

    // Deve preencher o select com a área clicada
    await expect(areaSelect).toHaveValue('Direito Trabalhista');
    // Deve preencher contexto inicial no textarea (usando toHaveValue para elementos de formulário)
    await expect(messageInput).toHaveValue(/Direito Trabalhista/);
  });

  test('5. Verificação de ausência de scroll horizontal (responsividade)', async ({ page }) => {
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });

  test('6. Navegação e carregamento da Política de Privacidade', async ({ page }) => {
    await page.goto('/politica-de-privacidade.html');
    await page.waitForLoadState('networkidle');

    const heading = page.locator('h1');
    await expect(heading).toHaveText('Política de Privacidade');

    // Deve citar expressamente a Lei nº 13.709/2018 (LGPD) e o sigilo da OAB
    const content = page.locator('.privacy-article');
    await expect(content).toContainText('13.709/2018');
    await expect(content).toContainText('OAB/RO');
    await expect(content).toContainText('OAB/SC');
  });

  test('7. Transição correta da barra ativa do menu superior (sem retenção indevida de Atendimento)', async ({ page, isMobile }) => {
    test.skip(isMobile, 'A barra seletora inferior do menu superior é uma característica exclusiva do cabeçalho desktop');

    // 1. Clicar em Atendimento
    const atendimentoLink = page.locator('header nav a[href="#atendimento"]');
    await atendimentoLink.click();
    await page.waitForTimeout(400);
    await expect(atendimentoLink).toHaveClass(/active/);

    // 2. Clicar em Áreas de Atuação -> Atendimento NÃO deve permanecer ativo
    const areasLink = page.locator('header nav a[href="#areas"]');
    await areasLink.click();
    await page.waitForTimeout(400);
    await expect(areasLink).toHaveClass(/active/);
    await expect(atendimentoLink).not.toHaveClass(/active/);

    // 3. Clicar em Contato -> Áreas de Atuação e Atendimento NÃO devem permanecer ativos
    const contatoLink = page.locator('header nav a[href="#contato"]');
    await contatoLink.click();
    await page.waitForTimeout(400);
    await expect(contatoLink).toHaveClass(/active/);
    await expect(atendimentoLink).not.toHaveClass(/active/);
    await expect(areasLink).not.toHaveClass(/active/);
  });

});
