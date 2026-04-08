import Link from "next/link";
import Image from "next/image";
import { 
  QrCode, 
  Zap, 
  Smartphone, 
  TrendingUp, 
  ArrowRight, 
  Star,
  CheckCircle,
  Star as StarOutline,
  Zap as ZapOutline,
  Crown
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/logo-cardup.png" alt="CardUp" width={140} height={40} />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
                Recursos
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
                Como funciona
              </a>
              <Link href="/contato" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
                Contato
              </Link>
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="bg-gradient-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-glow-orange transition-all"
              >
                Começar grátis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-up">
                <Star className="w-4 h-4" />
                <span>Mais de 2.000 restaurantes já usam</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F0F0F] leading-tight mb-6 animate-fade-up stagger-1">
                Cardápio digital que{' '}
                <span className="text-gradient">vende mais</span>{' '}
                e custa menos
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up stagger-2">
                Elimine reimpressões, atualize preços em tempo real e conquiste clientes com uma experiência moderna. 
                <strong className="text-[#0F0F0F]"> Primeira semana grátis.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up stagger-3">
                <Link
                  href="/cadastro"
                  className="group bg-gradient-brand text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-glow-orange transition-all flex items-center justify-center gap-2"
                >
                  Criar cardápio grátis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/cardapio/la-brasa-gourmet"
                  className="group border-2 border-gray-200 text-[#0F0F0F] px-8 py-4 rounded-2xl font-semibold text-lg hover:border-orange-500 hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Ver exemplo ao vivo
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 animate-fade-up stagger-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Sem cartão de crédito</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Setup em 2 minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Suporte 24/7</span>
                </div>
              </div>
            </div>

            {/* Right - Phone mockup */}
            <div className="relative hidden lg:flex justify-center animate-fade-up stagger-2">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-brand rounded-[3rem] blur-3xl opacity-20 scale-95" />
                
                {/* Phone frame */}
                <div className="relative w-80 bg-[#0F0F0F] rounded-[3rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Phone header */}
                    <div className="bg-gradient-brand px-6 py-4 flex items-center justify-between">
                      <Image src="/simbolo-cardup.png" alt="" width={24} height={24} className="invert brightness-0" />
                      <div className="w-6 h-6 bg-white/20 rounded-full" />
                    </div>
                    
                    {/* Banner */}
                    <div className="relative h-44">
                      <Image
                        src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&h=300&fit=crop"
                        alt="Restaurant"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Logo overlay */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                          <Image
                            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop"
                            alt="Logo"
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-10 pb-4 px-4">
                      <h3 className="text-center font-bold text-lg mb-1">La Brasa Gourmet</h3>
                      <div className="flex justify-center mb-4">
                        <span className="bg-green-400 text-white text-xs px-3 py-1 rounded-full font-medium">Aberto agora</span>
                      </div>

                      {/* Tabs */}
                      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-2">
                        {['Pizzas', 'Burgers', 'Bebidas'].map((tab, i) => (
                          <button
                            key={tab}
                            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap ${
                              i === 0 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Menu items */}
                      <div className="space-y-3">
                        {[
                          { name: 'Pizza Margherita', price: 'R$ 42,90', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop' },
                          { name: 'Smash Burger', price: 'R$ 38,90', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
                        ].map((item) => (
                          <div key={item.name} className="flex gap-3 bg-gray-50 p-3 rounded-xl">
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                              <Image src={item.img} alt={item.name} width={56} height={56} className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                              <p className="text-orange-500 font-bold text-sm">{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -left-8 top-20 bg-white rounded-2xl p-4 shadow-xl animate-bounce-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">QR Code</p>
                      <p className="text-sm font-semibold">Gerado!</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 bottom-20 bg-white rounded-2xl p-4 shadow-xl animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pedidos</p>
                      <p className="text-sm font-semibold text-green-600">+127%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-8">Usado por restaurantes em todo o Brasil</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60 grayscale">
            {['Pizza Hut', 'McDonald\'s', 'Burger King', 'Subway', 'Starbucks'].map((brand) => (
              <span key={brand} className="text-lg font-bold text-gray-400">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Recursos</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F0F0F] mt-3 mb-4">
              Tudo que você precisa para vender mais
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ferramentas completas para gerenciar seu cardápio digital e aumentar suas vendas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: QrCode,
                title: 'QR Code Instantâneo',
                description: 'Gere QR Codes automaticamente. Clientes escaneiam e acessam seu cardápio em segundos.',
                color: 'bg-orange-100'
              },
              {
                icon: Zap,
                title: 'Atualização em Tempo Real',
                description: 'Mude preços, adicione itens ou altere disponibilidade instantaneamente.',
                color: 'bg-yellow-100'
              },
              {
                icon: Smartphone,
                title: '100% Mobile First',
                description: 'Design otimizado para smartphones. Seus clientes vão adorar a experiência.',
                color: 'bg-blue-100'
              },
              {
                icon: TrendingUp,
                title: 'Analytics e Insights',
                description: 'Veja quais itens são mais vendidos e tome decisões baseadas em dados.',
                color: 'bg-green-100'
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl p-8 border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-[#0F0F0F]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F0F0F] mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Planos</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F0F0F] mt-3 mb-4">
              Planos que crescem com você
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comece grátis e faça upgrade quando precisar. Sem compromisso, sem cartão de crédito.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <StarOutline className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F0F0F]">Vitrine</h3>
                  <p className="text-xs text-gray-500">Para começar</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-4xl font-bold text-[#0F0F0F]">Grátis</p>
              </div>

              <p className="text-sm text-gray-600 mb-6">Cardápio digital gratuito para testar o CardUp</p>

              <ul className="space-y-3 mb-8">
                {['1 cardápio ativo', 'Até 4 seções', 'Até 8 itens por seção', 'Upload de imagens', 'QR Code automático'].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/cadastro"
                className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm bg-gray-100 text-[#0F0F0F] hover:bg-gray-200 transition-colors"
              >
                Começar grátis
              </Link>
            </div>

            {/* UP Plan - Popular */}
            <div className="relative bg-white rounded-3xl p-8 border-2 border-orange-500 shadow-xl shadow-orange-100/50 transform scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-brand text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                  Mais Popular
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <ZapOutline className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F0F0F]">UP</h3>
                  <p className="text-xs text-gray-500">Mais popular</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#0F0F0F]">149</span>
                  <span className="text-xl font-bold text-[#0F0F0F]">,98</span>
                  <span className="text-sm text-gray-500">/mês</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">Transforme seu cardápio em PDV completo</p>

              <ul className="space-y-3 mb-8">
                {['Até 5 cardápios ativos', 'Modo PDV com pagamento', 'Carrinho de compras', 'CRM Básico', 'Analytics Básico', 'Suporte prioritário'].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/cadastro"
                className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm bg-gradient-brand text-white hover:shadow-glow-orange transition-all"
              >
                Assinar UP
              </Link>
            </div>

            {/* Gente Grande Plan */}
            <div className="relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F0F0F]">Gente Grande</h3>
                  <p className="text-xs text-gray-500">Para quem quer mais</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#0F0F0F]">279</span>
                  <span className="text-xl font-bold text-[#0F0F0F]">,98</span>
                  <span className="text-sm text-gray-500">/mês</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">Tudo ilimitado + IA + PDV Caixa</p>

              <ul className="space-y-3 mb-8">
                {['Até 10 cardápios ativos', 'Seções e itens ilimitados', 'Assistente de IA', 'Controle de Pedidos', 'PDV Caixa', 'CRM Completo'].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/cadastro"
                className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm bg-gray-100 text-[#0F0F0F] hover:bg-gray-200 transition-colors"
              >
                Assinar Gente Grande
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-[#0F0F0F] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Como funciona</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-3 mb-4">
              Comece em 3 passos simples
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Sem complicação. Em poucos minutos seu cardápio digital está no ar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Cadastre seu restaurante',
                description: 'Preencha as informações do seu estabelecimento em menos de 2 minutos.'
              },
              {
                step: '02',
                title: 'Monte seu cardápio',
                description: 'Adicione seções, itens, preços e fotos. Interface simples e intuitiva.'
              },
              {
                step: '03',
                title: 'Compartilhe com clientes',
                description: 'Gere o QR Code e coloque nas mesas. Pronto! Seus clientes já podem acessar.'
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-7xl lg:text-8xl font-bold text-white/5 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-12">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-brand relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Pronto para revolutionar seu restaurante?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de estabelecimentos que já economizam tempo e aumentaram suas vendas com o CardUp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cadastro"
              className="group bg-white text-orange-500 px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              Criar conta grátis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <p className="text-white/60 text-sm mt-6">
            Sem compromisso. Sem cartão de crédito. Configuração em 2 minutos.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Image src="/logo-cardup.png" alt="CardUp" width={140} height={40} className="mb-4 brightness-0 invert" />
              <p className="text-gray-400 text-sm max-w-sm mb-6">
                Cardápio digital moderno para restaurantes, bares e lanchonetes. 
                A solução completa para eliminar reimpressões e vender mais.
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Feito com</span>
                <span className="text-red-500">❤</span>
                <span>por</span>
                <Image src="/logo-nexor.png" alt="Nexor" width={60} height={18} className="brightness-0 invert opacity-60" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="#features" className="hover:text-white transition-colors">Recursos</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Preços</Link></li>
                <li><Link href="/cadastro" className="hover:text-white transition-colors">Cadastro</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="/contato" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
                <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
                <li><Link href="/contato" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 CardUp. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
