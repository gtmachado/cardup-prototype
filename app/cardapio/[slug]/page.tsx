"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getRestaurantBySlug } from "@/lib/storage";
import { mockRestaurants } from "@/data/mockData";
import { Search, X, ChevronLeft, Clock, Heart, Share2, Phone } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function PublicMenuPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [liked, setLiked] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const slug = params?.slug || "";
  const restaurant = slug ? (getRestaurantBySlug(slug) || mockRestaurants.find((r) => r.slug === slug)) : undefined;

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: restaurant?.name || 'Cardápio Digital',
      text: `Veja o cardápio de ${restaurant?.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleOrder = () => {
    const phone = '5511999999999';
    const message = `Olá! Gostaria de fazer um pedido do cardápio: ${restaurant?.name}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!slug || !restaurant) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F0F0F] mb-2">Cardápio não encontrado</h1>
          <p className="text-gray-500">Este cardápio pode ter sido removido ou está indisponível.</p>
        </div>
      </div>
    );
  }

  if (!restaurant.active) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F0F0F] mb-2">Estamos fechados</h1>
          <p className="text-gray-500">Este estabelecimento está fechado no momento. Volte mais tarde!</p>
        </div>
      </div>
    );
  }

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredSections = restaurant.sections.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        item.available &&
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
  })).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Header */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.banner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLiked(!liked)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                liked ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={handleShare}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
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
                  <span className="text-white/80 text-sm">{restaurant.sections.length} seções</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3">
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="w-full flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="flex-1 text-left text-sm">Buscar no cardápio...</span>
          {searchOpen && (
            <button onClick={(e) => { e.stopPropagation(); setSearchTerm(''); setSearchOpen(false); }}>
              <X className="w-5 h-5" />
            </button>
          )}
        </button>
        
        {searchOpen && (
          <div className="mt-3 animate-fade-in">
            <input
              ref={searchRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: Pizza, Hambúrguer..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
            {searchTerm && (
              <p className="text-xs text-gray-500 mt-2">
                {filteredSections.reduce((acc, s) => acc + s.items.length, 0)} resultado(s) encontrado(s)
              </p>
            )}
          </div>
        )}
      </div>

      {/* Category tabs */}
      <div className="sticky top-[72px] z-10 bg-[#FAFAFA] border-b border-gray-100">
        <div className="flex gap-3 px-4 py-4 overflow-x-auto scrollbar-hide">
          {restaurant.sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(idx)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeSection === idx
                  ? 'bg-[#0F0F0F] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {section.name}
              <span className={`ml-2 text-xs ${activeSection === idx ? 'text-white/70' : 'text-gray-400'}`}>
                {section.items.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu content */}
      <main className="px-4 py-6 space-y-8 pb-32">
        {filteredSections.map((section, sectionIndex) => (
          <section
            key={section.id}
            ref={(el) => { sectionRefs.current[sectionIndex] = el; }}
            className="scroll-mt-36"
          >
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

        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Nenhum item encontrado</p>
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA] to-transparent pt-8">
        <button 
          onClick={handleOrder}
          className="w-full bg-gradient-brand text-white py-4 rounded-2xl font-bold text-lg hover:shadow-glow-orange transition-all flex items-center justify-center gap-2"
        >
          <Phone className="w-5 h-5" />
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
