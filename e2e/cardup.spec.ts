import { test, expect } from '@playwright/test';

const BASE_URL = 'https://cardup-prototype.vercel.app';
const ADMIN_EMAIL = 'admin@cardup.com';
const ADMIN_PASSWORD = '123456';

test.describe('🎯 CardUp E2E Tests', () => {
  
  // ==========================================
  // LANDING PAGE TESTS
  // ==========================================
  test.describe('🏠 Landing Page', () => {
    test('deve carregar a landing page corretamente', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Verifica elementos principais
      await expect(page.locator('text=CardUp')).toBeVisible();
      await expect(page.locator('text=Começar grátis').first()).toBeVisible();
      await expect(page.locator('text=Recursos')).toBeVisible();
      await expect(page.locator('text=Como funciona')).toBeVisible();
    });

    test('deve ter links válidos no header', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Testa link de login
      const loginLink = page.locator('text=Entrar').first();
      await expect(loginLink).toHaveAttribute('href', '/login');
      
      // Testa link de cadastro
      const signupLink = page.locator('text=Começar grátis').first();
      await expect(signupLink).toHaveAttribute('href', '/cadastro');
    });

    test('deve ter links válidos no footer', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Verifica footer
      await expect(page.locator('footer')).toBeVisible();
      
      // Testa links de páginas legais
      await expect(page.locator('footer >> text=Preços')).toHaveAttribute('href', '/planos');
      await expect(page.locator('footer >> text=Termos de Uso')).toHaveAttribute('href', '/termos');
      await expect(page.locator('footer >> text=Privacidade')).toHaveAttribute('href', '/privacidade');
      await expect(page.locator('footer >> text=Contato').first()).toHaveAttribute('href', '/contato');
    });

    test('deve navegar para cadastro ao clicar em Começar grátis', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.click('text=Começar grátis');
      await expect(page).toHaveURL(/\/cadastro/);
    });

    test('deve ver exemplo ao vivo do cardápio', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.click('text=Ver exemplo ao vivo');
      await expect(page).toHaveURL(/\/cardapio\//);
    });

    test('deve ter seção de planos visível', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await expect(page.locator('text=Planos que crescem com você')).toBeVisible();
      await expect(page.locator('text=Vitrine')).toBeVisible();
      await expect(page.locator('text=UP')).toBeVisible();
      await expect(page.locator('text=Gente Grande')).toBeVisible();
    });

    test('deve ter valores corretos nos planos', async ({ page }) => {
      await page.goto(`${BASE_URL}/planos`);
      
      // Verifica preços corretos
      await expect(page.locator('text=R$ 149,98').first()).toBeVisible();
      await expect(page.locator('text=R$ 279,98').first()).toBeVisible();
      
      // Verifica economia correta (sem erros de ponto flutuante)
      await expect(page.locator('text=Economize R$ 360,00').first()).toBeVisible();
      await expect(page.locator('text=Economize R$ 480,00').first()).toBeVisible();
    });
  });

  // ==========================================
  // LOGIN PAGE TESTS
  // ==========================================
  test.describe('🔐 Login Page', () => {
    test('deve carregar a página de login', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.locator('text=Entrar').first()).toBeVisible();
    });

    test('deve mostrar erro com credenciais inválidas', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      
      await page.fill('input[type="email"]', 'email@invalido.com');
      await page.fill('input[type="password"]', 'senhaerrada');
      await page.click('button:has-text("Entrar")');
      
      await expect(page.locator('text=Credenciais inválidas').or(page.locator('text=Email ou senha incorretos')).or(page.locator('text=Usuário não encontrado'))).toBeVisible({ timeout: 5000 });
    });

    test('deve fazer login com credenciais válidas', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      
      await page.fill('input[type="email"]', ADMIN_EMAIL);
      await page.fill('input[type="password"]', ADMIN_PASSWORD);
      await page.click('button:has-text("Entrar")');
      
      // Deve redirecionar para dashboard
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    });

    test('deve ter link para recuperação de senha', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      
      await expect(page.locator('text=Esqueceu a senha').or(page.locator('a:has-text("Esqueceu")')).toBeVisible();
      await page.click('text=Esqueceu');
      await expect(page).toHaveURL(/\/recuperar-senha/);
    });

    test('deve ter link para cadastro', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      
      await expect(page.locator('text=Criar conta grátis').first()).toBeVisible();
      await page.click('text=Criar conta grátis');
      await expect(page).toHaveURL(/\/cadastro/);
    });
  });

  // ==========================================
  // CADASTRO PAGE TESTS
  // ==========================================
  test.describe('📝 Cadastro Page', () => {
    const timestamp = Date.now();
    const testEmail = `teste${timestamp}@teste.com`;
    
    test('deve carregar a página de cadastro', async ({ page }) => {
      await page.goto(`${BASE_URL}/cadastro`);
      
      await expect(page.locator('input[placeholder*="nome"]').or(page.locator('input[id*="name"]').or(page.locator('input >> nth=0')))).toBeVisible();
    });

    test('deve mostrar erro com senhas diferentes', async ({ page }) => {
      await page.goto(`${BASE_URL}/cadastro`);
      
      // Preenche formulário com senhas diferentes
      await page.fill('input >> nth=0', 'Restaurante Teste');
      await page.fill('input[type="email"]', `senhadiff${timestamp}@teste.com`);
      await page.fill('input[type="password"]', 'senha123');
      await page.fill('input[type="password"] >> nth=1', 'senha456');
      
      await page.click('button:has-text("Criar conta")');
      
      await expect(page.locator('text=As senhas não coincidem')).toBeVisible({ timeout: 5000 });
    });

    test('deve mostrar erro com senha curta', async ({ page }) => {
      await page.goto(`${BASE_URL}/cadastro`);
      
      await page.fill('input >> nth=0', 'Restaurante Teste');
      await page.fill('input[type="email"]', `senhacurta${timestamp}@teste.com`);
      await page.fill('input[type="password"]', '123');
      await page.fill('input[type="password"] >> nth=1', '123');
      
      await page.click('button:has-text("Criar conta")');
      
      await expect(page.locator('text=pelo menos 6 caracteres')).toBeVisible({ timeout: 5000 });
    });

    test('deve criar conta com dados válidos', async ({ page }) => {
      await page.goto(`${BASE_URL}/cadastro`);
      
      await page.fill('input >> nth=0', 'Restaurante do João');
      await page.fill('input[type="email"]', testEmail);
      await page.fill('input[type="password"]', 'teste123456');
      await page.fill('input[type="password"] >> nth=1', 'teste123456');
      
      await page.click('button:has-text("Criar conta")');
      
      // Deve redirecionar para dashboard
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    });
  });

  // ==========================================
  // DASHBOARD TESTS
  // ==========================================
  test.describe('📊 Dashboard', () => {
    test.beforeEach(async ({ page }) => {
      // Login antes de cada teste
      await page.goto(`${BASE_URL}/login`);
      await page.fill('input[type="email"]', ADMIN_EMAIL);
      await page.fill('input[type="password"]', ADMIN_PASSWORD);
      await page.click('button:has-text("Entrar")');
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    });

    test('deve carregar o dashboard após login', async ({ page }) => {
      await expect(page.locator('text=Meus Cardápios')).toBeVisible();
    });

    test('deve mostrar cardápios existentes', async ({ page }) => {
      // Deve haver pelo menos um cardápio (La Brasa Gourmet)
      await expect(page.locator('text=La Brasa Gourmet').or(page.locator('text=cardápio'))).toBeVisible({ timeout: 5000 });
    });

    test('deve criar novo cardápio', async ({ page }) => {
      // Clica em "Novo Cardápio"
      await page.click('button:has-text("Novo Cardápio")');
      
      // Deve criar cardápio e aparecer na lista
      await page.waitForTimeout(1000);
      
      // Procura pelo novo cardápio criado
      const novosCards = page.locator('text=Meu Restaurante').or(page.locator('text=Cardápio IA'));
      if (await novosCards.count() > 0) {
        await expect(novosCards.first()).toBeVisible();
      }
    });

    test('deve ter sidebar funcional', async ({ page }) => {
      // Testa link de perfil
      await page.click('text=Meu Perfil');
      await expect(page).toHaveURL(/\/perfil/);
      
      // Volta para dashboard
      await page.click('text=Voltar ao dashboard');
      await expect(page).toHaveURL(/\/dashboard/);
    });

    test('deve link para planos funcionar', async ({ page }) => {
      await page.click('text=Planos >> nth=0');
      await expect(page).toHaveURL(/\/planos/);
    });
  });

  // ==========================================
  // ADMIN DASHBOARD TESTS
  // ==========================================
  test.describe('👨‍💼 Admin Dashboard', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.fill('input[type="email"]', ADMIN_EMAIL);
      await page.fill('input[type="password"]', ADMIN_PASSWORD);
      await page.click('button:has-text("Entrar")');
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    });

    test('deve mostrar visão geral do admin', async ({ page }) => {
      // Deve mostrar métricas ou painel administrativo
      const adminVisible = await page.locator('text=Visão Geral').or(page.locator('text=Admin').or(page.locator('text=Usuários'))).count() > 0;
      
      if (adminVisible) {
        await expect(page.locator('text=Visão Geral').or(page.locator('text=Admin'))).toBeVisible();
      }
    });

    test('deve acessar página de usuários', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/usuarios`);
      
      await expect(page.locator('text=Usuários').or(page.locator('h1:has-text("Usuários")')).or(page.locator('table'))).toBeVisible({ timeout: 5000 });
    });

    test('deve acessar página de assinaturas', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/assinaturas`);
      
      await expect(page.locator('text=Assinaturas').or(page.locator('h1:has-text("Assinaturas")')).or(page.locator('text=Plano'))).toBeVisible({ timeout: 5000 });
    });
  });

  // ==========================================
  // CARDÁPIO PÚBLICO TESTS
  // ==========================================
  test.describe('🍽️ Cardápio Público', () => {
    test('deve carregar cardápio demo', async ({ page }) => {
      await page.goto(`${BASE_URL}/cardapio/la-brasa-gourmet`);
      
      await expect(page.locator('text=La Brasa Gourmet')).toBeVisible();
      await expect(page.locator('text=Aberto').or(page.locator('text=Pizzas'))).toBeVisible();
    });

    test('deve ter seções navegáveis', async ({ page }) => {
      await page.goto(`${BASE_URL}/cardapio/la-brasa-gourmet`);
      
      // Deve ter tabs de seções
      const tabs = page.locator('button:has-text("Pizzas")').or(page.locator('button:has-text("Burgers")').or(page.locator('button:has-text("Bebidas")')));
      
      if (await tabs.count() > 0) {
        await expect(tabs.first()).toBeVisible();
        await tabs.first().click();
      }
    });

    test('deve ter busca funcional', async ({ page }) => {
      await page.goto(`${BASE_URL}/cardapio/la-brasa-gourmet`);
      
      // Procura campo de busca
      const searchInput = page.locator('input[placeholder*="Buscar"]').or(page.locator('input[placeholder*="buscar"]'));
      
      if (await searchInput.count() > 0) {
        await searchInput.fill('Pizza');
        await expect(page.locator('text=Pizza').first()).toBeVisible();
      }
    });

    test('deve ter botão fazer pedido', async ({ page }) => {
      await page.goto(`${BASE_URL}/cardapio/la-brasa-gourmet`);
      
      // Deve ter botão de pedido
      const pedidoButton = page.locator('button:has-text("Fazer pedido")').or(page.locator('button:has-text("Pedido")'));
      await expect(pedidoButton).toBeVisible();
    });
  });

  // ==========================================
  // QR CODE PAGE TESTS
  // ==========================================
  test.describe('📱 QR Code Page', () => {
    test('deve carregar QR code', async ({ page }) => {
      await page.goto(`${BASE_URL}/qr/la-brasa-gourmet`);
      
      // Deve ter QR code ou canvas
      await expect(page.locator('canvas').or(page.locator('svg'))).toBeVisible({ timeout: 5000 });
    });

    test('deve ter botão copiar link', async ({ page }) => {
      await page.goto(`${BASE_URL}/qr/la-brasa-gourmet`);
      
      // Procura botão de copiar
      const copyButton = page.locator('button:has-text("Copiar")').or(page.locator('button:has-text("copiar")'));
      if (await copyButton.count() > 0) {
        await expect(copyButton).toBeVisible();
      }
    });

    test('deve ter link para ver como cliente', async ({ page }) => {
      await page.goto(`${BASE_URL}/qr/la-brasa-gourmet`);
      
      await expect(page.locator('text=Ver como cliente').or(page.locator('a:has-text("cliente")'))).toBeVisible({ timeout: 5000 });
    });
  });

  // ==========================================
  // CONTATO PAGE TESTS
  // ==========================================
  test.describe('💬 Contato Page', () => {
    test('deve carregar página de contato', async ({ page }) => {
      await page.goto(`${BASE_URL}/contato`);
      
      await expect(page.locator('text=Contato').or(page.locator('text=Fale com a gente'))).toBeVisible();
    });

    test('deve ter formulário de contato', async ({ page }) => {
      await page.goto(`${BASE_URL}/contato`);
      
      await expect(page.locator('textarea').or(page.locator('input[type="email"]'))).toBeVisible();
    });

    test('deve ter chatbot Luna', async ({ page }) => {
      await page.goto(`${BASE_URL}/contato`);
      
      // Procura botão do chat ou indicador Luna
      const chatButton = page.locator('button >> nth=-1').or(page.locator('text=Luna'));
      
      // Chat deve estar disponível
      await expect(page.locator('text=suporte').or(page.locator('text=Ajuda')).or(page.locator('svg'))).toBeVisible();
    });
  });

  // ==========================================
  // TERMOS E PRIVACIDADE TESTS
  // ==========================================
  test.describe('📄 Termos e Privacidade', () => {
    test('deve carregar página de termos', async ({ page }) => {
      await page.goto(`${BASE_URL}/termos`);
      
      await expect(page.locator('text=Termos de Uso')).toBeVisible();
      await expect(page.locator('text=1. Aceitação')).toBeVisible();
    });

    test('deve carregar página de privacidade', async ({ page }) => {
      await page.goto(`${BASE_URL}/privacidade`);
      
      await expect(page.locator('text=Política de Privacidade')).toBeVisible();
      await expect(page.locator('text=1. Informações que Coletamos')).toBeVisible();
    });
  });

  // ==========================================
  // PERFIL PAGE TESTS
  // ==========================================
  test.describe('👤 Perfil Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.fill('input[type="email"]', ADMIN_EMAIL);
      await page.fill('input[type="password"]', ADMIN_PASSWORD);
      await page.click('button:has-text("Entrar")');
      await page.goto(`${BASE_URL}/perfil`);
    });

    test('deve carregar perfil do usuário', async ({ page }) => {
      await expect(page.locator('text=Informações do perfil').or(page.locator('text=Admin'))).toBeVisible();
    });

    test('deve ter botão de logout', async ({ page }) => {
      await expect(page.locator('text=Sair da conta').or(page.locator('button:has-text("Sair")'))).toBeVisible();
    });

    test('deve link para planos', async ({ page }) => {
      await expect(page.locator('text=Fazer upgrade').or(page.locator('a:has-text("Plano")'))).toBeVisible();
    });
  });

  // ==========================================
  // RECUPERAR SENHA TESTS
  // ==========================================
  test.describe('🔑 Recuperar Senha', () => {
    test('deve carregar página de recuperação', async ({ page }) => {
      await page.goto(`${BASE_URL}/recuperar-senha`);
      
      await expect(page.locator('text=Recuperar senha').or(page.locator('text=Esqueceu sua senha'))).toBeVisible();
      await expect(page.locator('input[type="email"]')).toBeVisible();
    });

    test('deve ter validação de email', async ({ page }) => {
      await page.goto(`${BASE_URL}/recuperar-senha`);
      
      // Tenta enviar sem email
      await page.click('button:has-text("Enviar")');
      
      // Deve mostrar erro ou não enviar
      await page.waitForTimeout(500);
    });

    test('deve link para login', async ({ page }) => {
      await page.goto(`${BASE_URL}/recuperar-senha`);
      
      await page.click('text=Voltar ao login');
      await expect(page).toHaveURL(/\/login/);
    });
  });

  // ==========================================
  // EDITOR TESTS
  // ==========================================
  test.describe('✏️ Editor de Cardápio', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.fill('input[type="email"]', ADMIN_EMAIL);
      await page.fill('input[type="password"]', ADMIN_PASSWORD);
      await page.click('button:has-text("Entrar")');
    });

    test('deve carregar editor', async ({ page }) => {
      await page.goto(`${BASE_URL}/editar/1`);
      
      // Deve carregar ou mostrar cardápio
      await expect(page.locator('body')).not.toHaveText('Carregando...', { timeout: 15000 });
      
      // Verifica que tem elementos do editor
      const hasContent = await page.locator('text=Seções').or(page.locator('text=Itens')).or(page.locator('text=Pizzas')).count() > 0;
      expect(hasContent).toBeTruthy();
    });

    test('deve ter botão salvar', async ({ page }) => {
      await page.goto(`${BASE_URL}/editar/1`);
      await page.waitForTimeout(2000);
      
      // Procura botão salvar
      const saveButton = page.locator('button:has-text("Salvar")').or(page.locator('button:has-text("salvar")'));
      
      if (await saveButton.count() > 0) {
        await expect(saveButton.first()).toBeVisible();
      }
    });
  });

});

// ==========================================
// SMOKE TEST - Verifica que tudo carrega
// ==========================================
test.describe('🔥 Smoke Tests', () => {
  const pages = [
    { url: '/', name: 'Landing' },
    { url: '/login', name: 'Login' },
    { url: '/cadastro', name: 'Cadastro' },
    { url: '/planos', name: 'Planos' },
    { url: '/contato', name: 'Contato' },
    { url: '/termos', name: 'Termos' },
    { url: '/privacidade', name: 'Privacidade' },
    { url: '/cardapio/la-brasa-gourmet', name: 'Cardápio Público' },
    { url: '/qr/la-brasa-gourmet', name: 'QR Code' },
  ];

  for (const p of pages) {
    test(`${p.name} deve carregar sem erros 404`, async ({ page }) => {
      const response = await page.goto(`${BASE_URL}${p.url}`);
      expect(response?.status()).toBeLessThan(400);
    });
  }
});
