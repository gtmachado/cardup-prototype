export type PlanType = 'free' | 'up' | 'gente-grande' | 'gente-grande-franquias';

export interface PlanLimits {
  maxMenus: number;
  maxSectionsPerMenu: number;
  maxItemsPerSection: number;
  hasPDV: boolean;
  hasCRM: boolean;
  hasAnalytics: boolean;
  hasFinance: boolean;
  hasAIAssistant: boolean;
  hasOrderControl: boolean;
  hasCashier: boolean;
  hasMultiUnit: boolean;
  supportLevel: 'email' | 'priority' | 'dedicated';
}

export interface Plan {
  id: PlanType;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  features: string[];
  limits: PlanLimits;
  isPopular?: boolean;
  ctaText: string;
  upgradeText?: string;
}

export const PLANS: Record<PlanType, Plan> = {
  free: {
    id: 'free',
    name: 'Vitrine',
    tagline: 'Para começar',
    monthlyPrice: null,
    annualPrice: null,
    description: 'Cardápio digital gratuito para testar o CardUp',
    features: [
      '1 cardápio ativo',
      'Até 4 seções',
      'Até 8 itens por seção',
      'Upload de imagens',
      'QR Code automático',
      'PDF do cardápio',
    ],
    limits: {
      maxMenus: 1,
      maxSectionsPerMenu: 4,
      maxItemsPerSection: 8,
      hasPDV: false,
      hasCRM: false,
      hasAnalytics: false,
      hasFinance: false,
      hasAIAssistant: false,
      hasOrderControl: false,
      hasCashier: false,
      hasMultiUnit: false,
      supportLevel: 'email',
    },
    ctaText: 'Começar grátis',
  },
  up: {
    id: 'up',
    name: 'UP',
    tagline: 'Mais popular',
    monthlyPrice: 149.98,
    annualPrice: 119.98,
    description: 'Transforme seu cardápio em PDV completo',
    features: [
      'Até 5 cardápios ativos',
      'Até 10 seções por cardápio',
      'Até 20 itens por seção',
      'Modo PDV com pagamento',
      'Carrinho de compras',
      'CRM Básico',
      'Analytics Básico',
      'Financeiro Básico',
      'Suporte prioritário',
    ],
    limits: {
      maxMenus: 5,
      maxSectionsPerMenu: 10,
      maxItemsPerSection: 20,
      hasPDV: true,
      hasCRM: true,
      hasAnalytics: true,
      hasFinance: true,
      hasAIAssistant: false,
      hasOrderControl: false,
      hasCashier: false,
      hasMultiUnit: false,
      supportLevel: 'priority',
    },
    isPopular: true,
    ctaText: 'Assinar UP',
    upgradeText: 'Desbloqueie PDV e CRM',
  },
  'gente-grande': {
    id: 'gente-grande',
    name: 'Gente Grande',
    tagline: 'Para quem quer mais',
    monthlyPrice: 279.98,
    annualPrice: 239.98,
    description: 'Tudo ilimitado + IA + PDV Caixa',
    features: [
      'Até 10 cardápios ativos',
      'Seções e itens ilimitados',
      'Analytics Avançado',
      'CRM Completo',
      'Financeiro Completo',
      'Assistente de IA',
      'Controle de Pedidos',
      'PDV Caixa',
      'Suporte prioritário',
    ],
    limits: {
      maxMenus: 10,
      maxSectionsPerMenu: Infinity,
      maxItemsPerSection: Infinity,
      hasPDV: true,
      hasCRM: true,
      hasAnalytics: true,
      hasFinance: true,
      hasAIAssistant: true,
      hasOrderControl: true,
      hasCashier: true,
      hasMultiUnit: false,
      supportLevel: 'priority',
    },
    ctaText: 'Assinar Gente Grande',
    upgradeText: 'Tudo ilimitado + IA',
  },
  'gente-grande-franquias': {
    id: 'gente-grande-franquias',
    name: 'Franquias',
    tagline: 'Sob consulta',
    monthlyPrice: null,
    annualPrice: null,
    description: 'Solução completa para redes e franquias',
    features: [
      'Cardápios ilimitados',
      'Seções e itens ilimitados',
      'Gestão multi-unidade',
      'Dashboard centralizado',
      'API para integração',
      'Analytics Completo',
      'CRM Completo',
      'Financeiro Completo',
      'Assistente de IA',
      'Suporte dedicado',
    ],
    limits: {
      maxMenus: Infinity,
      maxSectionsPerMenu: Infinity,
      maxItemsPerSection: Infinity,
      hasPDV: true,
      hasCRM: true,
      hasAnalytics: true,
      hasFinance: true,
      hasAIAssistant: true,
      hasOrderControl: true,
      hasCashier: true,
      hasMultiUnit: true,
      supportLevel: 'dedicated',
    },
    ctaText: 'Falar com vendas',
  },
};

export const ADDONS = [
  {
    id: 'whatsapp-ai',
    name: 'Agente IA WhatsApp',
    price: 19.90,
    description: 'Chatbot inteligente para atendimento via WhatsApp',
  },
  {
    id: 'ifood-integration',
    name: 'Integração iFood/Rappi',
    price: 29.90,
    description: 'Sincronização automática com plataformas de delivery',
  },
  {
    id: 'loyalty',
    name: 'Programa de Fidelidade',
    price: 14.90,
    description: 'Sistema de pontos e recompensas para clientes',
  },
  {
    id: 'custom-domain',
    name: 'Domínio Personalizado',
    price: 9.90,
    description: 'cardapio.seurestaurante.com.br',
  },
];

export function getPlanById(id: PlanType): Plan {
  return PLANS[id];
}

export function canCreateMenu(userPlan: PlanType, currentMenus: number): boolean {
  const plan = PLANS[userPlan];
  return currentMenus < plan.limits.maxMenus;
}

export function canCreateSection(userPlan: PlanType, currentSections: number): boolean {
  const plan = PLANS[userPlan];
  return currentSections < plan.limits.maxSectionsPerMenu;
}

export function canCreateItem(userPlan: PlanType, currentItems: number): boolean {
  const plan = PLANS[userPlan];
  return currentItems < plan.limits.maxItemsPerSection;
}

export function getUpgradeMessage(userPlan: PlanType, limitType: 'menus' | 'sections' | 'items'): string {
  const plan = PLANS[userPlan];
  
  if (userPlan === 'free') {
    return 'Você atingiu o limite do plano Gratuito. Faça upgrade para o Plano UP e tenha até 5 cardápios!';
  }
  
  if (userPlan === 'up') {
    return 'Você atingiu o limite do plano UP. Faça upgrade para o Plano Gente Grande e tenha limites ilimitados!';
  }
  
  return 'Entre em contato para desbloquear mais recursos.';
}
