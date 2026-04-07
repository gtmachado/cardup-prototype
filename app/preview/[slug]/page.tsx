import Link from "next/link";
import Image from "next/image";
import { getRestaurantBySlug } from "@/lib/storage";
import { mockRestaurants } from "@/data/mockData";
import { ArrowLeft, Search, Sun, Moon } from "lucide-react";

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = getRestaurantBySlug(slug) || mockRestaurants.find((r) => r.slug === slug);

  if (!restaurant || !restaurant.active) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cardápio indisponível</h1>
          <p className="text-gray-500">Este cardápio não está ativo no momento.</p>
          <Link href="/dashboard" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
            Voltar ao painel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-orange-500 px-4 py-2 flex items-center justify-between sticky top-0 z-20">
        <Link href={`/editar/${restaurant.id}`} className="text-white/80 hover:text-white flex items-center gap-1 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Sair do modo visualização
        </Link>
        <div className="flex items-center gap-2">
          <button className="bg-white/20 rounded-full p-1.5 hover:bg-white/30 transition">
            <Sun className="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

      {/* Banner */}
      <div className="relative h-48 lg:h-56 overflow-hidden">
        <Image
          src={restaurant.banner}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image src={restaurant.logo} alt="" width={80} height={80} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-white font-semibold text-lg mt-2">{restaurant.name}</h1>
          <span className="bg-green-400 text-white text-xs px-4 py-1 rounded-full font-medium mt-1">Aberto</span>
        </div>
      </div>

      {/* Section tabs */}
      <div className="bg-white border-b sticky top-10 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            {restaurant.sections.map((section, idx) => (
              <button
                key={section.id}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  idx === 0
                    ? "bg-green-400 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {section.name}
              </button>
            ))}
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {restaurant.sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.name}</h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex gap-3 p-3 rounded-xl transition ${
                      item.available ? "" : "opacity-50"
                    }`}
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</h3>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.description}</p>
                      <p className="text-gray-900 font-bold text-sm mt-1">
                        R$ {item.price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
