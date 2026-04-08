import { PLANS, ADDONS, type PlanType } from "@/lib/plans";
import Link from "next/link";
import { Check, X, ArrowRight, Star, Zap, Crown, Building2 } from "lucide-react";

export default function PlanosPage() {
  const plans = Object.values(PLANS).filter(p => p.id !== 'gente-grande-franquias');
  const franchisePlan = PLANS['gente-grande-franquias'];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-cardup.png" alt="CardUp" className="h-8" />
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
              Entrar
            </Link>
            <Link href="/cadastro" className="bg-gradient-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-glow-orange transition-all">
              Começar grátis
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Escolha o plano ideal para seu negócio
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0F0F0F] mb-6">
            Planos que crescem com você
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comece grátis e faça upgrade quando precisar. Sem compromisso, sem cartão de crédito.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Plan */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] rounded-3xl p-8 lg:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{franchisePlan.name}</h3>
                <p className="text-gray-400 mb-4">{franchisePlan.description}</p>
                <ul className="grid md:grid-cols-2 gap-2">
                  {franchisePlan.features.slice(0, 6).map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:text-right flex-shrink-0">
                <p className="text-3xl font-bold text-orange-400 mb-2">Sob consulta</p>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Falar com vendas
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F0F0F] mb-4">Add-ons</h2>
            <p className="text-gray-600">Potencialize seu plano com recursos adicionais</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {ADDONS.map((addon) => (
              <div key={addon.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#0F0F0F]">{addon.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{addon.description}</p>
                  </div>
                  <span className="text-lg font-bold text-orange-500">+R$ {addon.price.toFixed(2).replace('.', ',')}/mês</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0F0F0F] text-center mb-12">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Posso cancelar a qualquer momento?',
                a: 'Sim! Você pode cancelar sua assinatura a qualquer momento. Não há multa ou taxa de cancelamento.'
              },
              {
                q: 'O que acontece se eu ultrapassar o limite do meu plano?',
                a: 'Você receberá um aviso e poderá fazer upgrade para um plano superior. Seus dados serão mantidos.'
              },
              {
                q: 'O plano gratuito tem alguma limitação?',
                a: 'O plano gratuito permite 1 cardápio ativo com até 4 seções e 8 itens por seção. Ideal para testar a plataforma.'
              },
              {
                q: 'Como funciona o pagamento?',
                a: 'Aceitamos cartão de crédito via Stripe. O pagamento é processado de forma segura e recorrente.'
              },
              {
                q: 'Posso mudar de plano depois?',
                a: 'Sim! Você pode fazer upgrade ou downgrade a qualquer momento. A diferença será calculada proporcionalmente.'
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-2xl">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-medium text-[#0F0F0F]">
                  {faq.q}
                  <span className="ml-4 transition-transform group-open:rotate-180">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-brand">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Crie sua conta grátis e tenha seu cardápio digital em minutos.
          </p>
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 bg-white text-orange-500 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all"
          >
            Criar conta grátis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <img src="/logo-cardup.png" alt="CardUp" className="h-8 mx-auto mb-4 brightness-0 invert" />
          <p className="text-gray-500 text-sm">© 2026 CardUp by Nexor. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function PlanCard({ plan }: { plan: typeof PLANS.free }) {
  const iconMap = {
    free: <Star className="w-6 h-6" />,
    up: <Zap className="w-6 h-6" />,
    'gente-grande': <Crown className="w-6 h-6" />,
  };

  return (
    <div className={`relative bg-white rounded-3xl p-8 border-2 transition-all hover:shadow-xl ${
      plan.isPopular ? 'border-orange-500 shadow-lg' : 'border-gray-100'
    }`}>
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-brand text-white px-4 py-1.5 rounded-full text-xs font-semibold">
            Mais Popular
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          plan.id === 'free' ? 'bg-gray-100 text-gray-600' :
          plan.id === 'up' ? 'bg-orange-100 text-orange-600' :
          'bg-purple-100 text-purple-600'
        }`}>
          {iconMap[plan.id as keyof typeof iconMap]}
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0F0F0F]">{plan.name}</h3>
          <p className="text-xs text-gray-500">{plan.tagline}</p>
        </div>
      </div>

      <div className="mb-6">
        {plan.monthlyPrice ? (
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-500">R$</span>
              <span className="text-4xl font-bold text-[#0F0F0F]">
                {plan.monthlyPrice.toFixed(2).replace('.', ',').split(',')[0]}
              </span>
              <span className="text-2xl font-bold text-[#0F0F0F]">
                ,{plan.monthlyPrice.toFixed(2).split('.')[1]}
              </span>
              <span className="text-sm text-gray-500">/mês</span>
            </div>
            {plan.annualPrice && (
              <p className="text-sm text-green-600 mt-1">
                ou R$ {plan.annualPrice.toFixed(2).replace('.', ',')}/mês no plano anual
                <span className="ml-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  Economize R$ {(plan.monthlyPrice - plan.annualPrice) * 12}
                </span>
              </p>
            )}
          </div>
        ) : (
          <p className="text-4xl font-bold text-[#0F0F0F]">Grátis</p>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-6">{plan.description}</p>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/cadastro"
        className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
          plan.isPopular
            ? 'bg-gradient-brand text-white hover:shadow-glow-orange'
            : 'bg-gray-100 text-[#0F0F0F] hover:bg-gray-200'
        }`}
      >
        {plan.ctaText}
      </Link>
    </div>
  );
}
