import Link from "next/link";
import { getRestaurantBySlug } from "@/lib/storage";
import { mockRestaurants } from "@/data/mockData";
import { ArrowLeft } from "lucide-react";

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = getRestaurantBySlug(slug) || mockRestaurants.find((r) => r.slug === slug);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-[#0F0F0F] mb-2">Cardápio não encontrado</h1>
          <Link href="/dashboard" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
            Voltar ao dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!restaurant.active) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-[#0F0F0F] mb-2">Estamos fechados</h1>
          <p className="text-gray-500">Este estabelecimento está fechado no momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Preview Banner */}
      <div className="bg-orange-500 px-4 py-2 flex items-center justify-center gap-4 text-sm">
        <Link 
          href={`/editar/${restaurant.id}`} 
          className="text-white/80 hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Sair do modo visualização
        </Link>
        <span className="text-white/60">|</span>
        <span className="text-white font-medium">Modo Preview</span>
      </div>

      {/* Hero Header */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.banner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Restaurant info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white">
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">{restaurant.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-green-400 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Aberto
                  </span>
                  <span className="text-white/80 text-sm">{restaurant.sections.length} categorias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-2xl text-gray-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="flex-1 text-left text-sm">Buscar no cardápio...</span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-[72px] z-10 bg-[#FAFAFA] border-b border-gray-100">
        <div className="flex gap-3 px-4 py-4 overflow-x-auto scrollbar-hide">
          {restaurant.sections.map((section, idx) => (
            <button
              key={section.id}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                idx === 0
                  ? 'bg-[#0F0F0F] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {section.name}
              <span className={`ml-2 text-xs ${idx === 0 ? 'text-white/70' : 'text-gray-400'}`}>
                {section.items.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu content */}
      <main className="px-4 py-6 space-y-8 pb-32">
        {restaurant.sections.map((section) => (
          <section key={section.id} className="scroll-mt-36">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0F0F0F]">{section.name}</h2>
              <span className="text-sm text-gray-400">{section.items.length} itens</span>
            </div>
            
            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-4xl">🍽️</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-semibold text-[#0F0F0F] text-base sm:text-lg leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xl font-bold text-orange-500">
                          R$ {item.price.toFixed(2).replace(".", ",")}
                        </p>
                        {!item.available && (
                          <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                            Esgotado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA] to-transparent pt-8">
        <button className="w-full bg-gradient-brand text-white py-4 rounded-2xl font-bold text-lg hover:shadow-glow-orange transition-all flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Fazer pedido
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] text-white py-8 mt-12">
        <div className="px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/simbolo-cardup.png" alt="" width={20} height={20} className="invert brightness-0" />
            <span className="font-semibold">CardUp</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-gray-500 text-xs">Powered by</span>
            <img src="/logo-nexor.png" alt="Nexor" width={50} height={14} className="brightness-0 invert opacity-60" />
          </div>
          <p className="text-gray-500 text-xs">
            © 2026 CardUp. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
