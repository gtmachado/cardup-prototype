"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import type { Restaurant } from "@/data/mockData";
import { 
  Plus, Eye, Pencil, Trash2, QrCode, Settings, LogOut, User,
  ChevronDown, Menu, X, ExternalLink, Sparkles, Check, Edit3
} from "lucide-react";
import { PlanLimitModal } from "@/components/PlanLimitModal";
import { canCreateMenu } from "@/lib/plans";
import { QuickStartModal } from "@/components/QuickStartModal";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, restaurants, setRestaurants, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitType, setLimitType] = useState<"menus" | "sections" | "items">("menus");
  const [showQuickStart, setShowQuickStart] = useState(false);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este cardápio?")) {
      const updated = restaurants.filter((r) => r.id !== id);
      setRestaurants(updated);
    }
  };

  const handleToggle = (id: string) => {
    const updated = restaurants.map((r) =>
      r.id === id ? { ...r, active: !r.active } : r
    );
    setRestaurants(updated);
  };

  const handleStartEditName = (restaurant: Restaurant) => {
    setEditingName(restaurant.id);
    setTempName(restaurant.name);
  };

  const handleSaveName = (id: string) => {
    if (tempName.trim()) {
      const updated = restaurants.map((r) =>
        r.id === id ? { ...r, name: tempName.trim(), slug: tempName.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") } : r
      );
      setRestaurants(updated);
    }
    setEditingName(null);
  };

  const handleNewMenu = () => {
    if (!canCreateMenu("free", restaurants.length)) {
      setLimitType("menus");
      setShowLimitModal(true);
      return;
    }
    const count = restaurants.length + 1;
    const newRestaurant: Restaurant = {
      id: String(Date.now()),
      name: `Meu Restaurante ${count}`,
      slug: `meu-restaurante-${count}`,
      email: user?.email || "",
      logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&crop=center",
      banner: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1200&h=400&fit=crop",
      active: true,
      sections: [],
    };
    setRestaurants([...restaurants, newRestaurant]);
  };

  const handleQuickStartImport = (sections: { name: string; items: { name: string; description: string; price: number }[] }[]) => {
    if (!canCreateMenu("free", restaurants.length)) {
      setLimitType("menus");
      setShowLimitModal(true);
      return;
    }
    const count = restaurants.length + 1;
    const newRestaurant: Restaurant = {
      id: String(Date.now()),
      name: `Cardápio IA ${count}`,
      slug: `cardapio-ia-${count}`,
      email: user?.email || "",
      logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&crop=center",
      banner: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1200&h=400&fit=crop",
      active: true,
      sections: sections.map((s, si) => ({
        id: `s${Date.now()}-${si}`,
        name: s.name,
        items: s.items.map((item, ii) => ({
          id: `i${Date.now()}-${si}-${ii}`,
          name: item.name,
          description: item.description,
          price: item.price,
          image: "",
          available: true,
        })),
      })),
    };
    setRestaurants([...restaurants, newRestaurant]);
  };

  const firstRestaurant = restaurants[0];

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex">
        <DashboardContent 
          user={user}
          restaurants={restaurants}
          sidebarOpen={sidebarOpen}
          mobileMenuOpen={mobileMenuOpen}
          setSidebarOpen={setSidebarOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          handleLogout={handleLogout}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
          handleNewMenu={handleNewMenu}
          handleStartEditName={handleStartEditName}
          handleSaveName={handleSaveName}
          editingName={editingName}
          tempName={tempName}
          setTempName={setTempName}
          showLimitModal={showLimitModal}
          limitType={limitType}
          setShowLimitModal={setShowLimitModal}
          showQuickStart={showQuickStart}
          setShowQuickStart={setShowQuickStart}
          handleQuickStartImport={handleQuickStartImport}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      <DashboardContent 
        user={user}
        restaurants={restaurants}
        sidebarOpen={sidebarOpen}
        mobileMenuOpen={mobileMenuOpen}
        setSidebarOpen={setSidebarOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleLogout={handleLogout}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        handleNewMenu={handleNewMenu}
        handleStartEditName={handleStartEditName}
        handleSaveName={handleSaveName}
        editingName={editingName}
        tempName={tempName}
        setTempName={setTempName}
        showLimitModal={showLimitModal}
        limitType={limitType}
        setShowLimitModal={setShowLimitModal}
        showQuickStart={showQuickStart}
        setShowQuickStart={setShowQuickStart}
        handleQuickStartImport={handleQuickStartImport}
      />
    </div>
  );
}

interface DashboardContentProps {
  user: { email: string; name: string } | null;
  restaurants: Restaurant[];
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  handleLogout: () => void;
  handleDelete: (id: string) => void;
  handleToggle: (id: string) => void;
  handleNewMenu: () => void;
  handleStartEditName: (restaurant: Restaurant) => void;
  handleSaveName: (id: string) => void;
  editingName: string | null;
  tempName: string;
  setTempName: (name: string) => void;
  showLimitModal: boolean;
  limitType: "menus" | "sections" | "items";
  setShowLimitModal: (show: boolean) => void;
  showQuickStart: boolean;
  setShowQuickStart: (show: boolean) => void;
  handleQuickStartImport: (sections: { name: string; items: { name: string; description: string; price: number }[] }[]) => void;
}

function DashboardContent({
  user,
  restaurants,
  sidebarOpen,
  mobileMenuOpen,
  setSidebarOpen,
  setMobileMenuOpen,
  handleLogout,
  handleDelete,
  handleToggle,
  handleNewMenu,
  handleStartEditName,
  handleSaveName,
  editingName,
  tempName,
  setTempName,
  showLimitModal,
  limitType,
  setShowLimitModal,
  showQuickStart,
  setShowQuickStart,
  handleQuickStartImport,
}: DashboardContentProps) {
  const router = useRouter();
  const { isAdmin } = useAuth();

  const menuItems = isAdmin ? [
    { icon: User, label: 'Visão Geral', href: '/admin' },
    { icon: QrCode, label: 'Usuários', href: '/admin/usuarios' },
    { icon: Settings, label: 'Assinaturas', href: '/admin/assinaturas' },
  ] : [
    { icon: User, label: 'Meu Perfil', href: '/perfil' },
    { icon: Settings, label: 'Configurações', href: '/perfil' },
  ];

  return (
    <>
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo-cardup.png" alt="CardUp" width={120} height={35} />
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${!sidebarOpen ? '-rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        <div className={`p-6 border-b border-gray-100 ${!sidebarOpen ? 'px-4' : ''}`}>
          <div className={`flex items-center ${!sidebarOpen ? 'justify-center' : 'gap-4'}`}>
            <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#0F0F0F] truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-[#0F0F0F] transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors w-full ${!sidebarOpen ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-[#0F0F0F]">Meus Cardápios</h1>
                <p className="text-sm text-gray-500">{restaurants.length} cardápio(s)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/planos"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600"
              >
                <Sparkles className="w-4 h-4" />
                Planos
              </Link>
              <button
                onClick={handleNewMenu}
                className="bg-gradient-brand text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-glow-orange transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Novo Cardápio</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {restaurants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <QrCode className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F0F0F] mb-2">Nenhum cardápio ainda</h2>
              <p className="text-gray-500 mb-8 max-w-md">
                Crie seu primeiro cardápio digital e comece a vender mais com QR Codes!
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleNewMenu}
                  className="bg-gradient-brand text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-glow-orange transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Criar cardápio
                </button>
                <button
                  onClick={() => setShowQuickStart(true)}
                  className="bg-white border-2 border-orange-200 text-orange-500 px-8 py-4 rounded-2xl font-semibold hover:bg-orange-50 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Criar com IA
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className={`group bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 ${
                    !restaurant.active ? 'opacity-70' : ''
                  }`}
                >
                  <div className="relative h-40 overflow-hidden cursor-pointer" onClick={() => router.push(`/editar/${restaurant.id}`)}>
                    <Image
                      src={restaurant.banner}
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        restaurant.active 
                          ? 'bg-green-400 text-white' 
                          : 'bg-gray-400 text-white'
                      }`}>
                        {restaurant.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                          <Image
                            src={restaurant.logo}
                            alt=""
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          {editingName === restaurant.id ? (
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveName(restaurant.id)}
                                className="w-full px-2 py-1 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveName(restaurant.id)}
                                className="p-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleStartEditName(restaurant); }}
                              className="flex items-center gap-1 text-white hover:text-orange-300 transition-colors w-full"
                            >
                              <h3 className="font-bold text-lg drop-shadow">{restaurant.name}</h3>
                              <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          )}
                          <p className="text-white/80 text-xs">{restaurant.sections.length} seções</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between border-t border-gray-50">
                    <button
                      onClick={() => handleToggle(restaurant.id)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        restaurant.active ? 'bg-green-400' : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-transform ${
                          restaurant.active ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/qr/${restaurant.slug}`}
                        className="p-2 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors group/btn"
                        title="QR Code"
                      >
                        <QrCode className="w-5 h-5 text-orange-500 group-hover/btn:scale-110 transition-transform" />
                      </Link>
                      <Link
                        href={`/cardapio/${restaurant.slug}`}
                        target="_blank"
                        className="p-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group/btn"
                        title="Ver público"
                      >
                        <Eye className="w-5 h-5 text-blue-500 group-hover/btn:scale-110 transition-transform" />
                      </Link>
                      <Link
                        href={`/editar/${restaurant.id}`}
                        className="p-2 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group/btn"
                        title="Editar"
                      >
                        <Pencil className="w-5 h-5 text-green-500 group-hover/btn:scale-110 transition-transform" />
                      </Link>
                      <button
                        onClick={() => handleDelete(restaurant.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 rounded-xl transition-colors group/btn"
                        title="Excluir"
                      >
                        <Trash2 className="w-5 h-5 text-red-500 group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="grid grid-rows-2 gap-4 min-h-[200px]">
                <button
                  onClick={handleNewMenu}
                  className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-orange-300 hover:bg-orange-50/50 transition-all flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="font-semibold text-gray-600 text-sm">Criar cardápio</p>
                </button>
                <button
                  onClick={() => setShowQuickStart(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 hover:shadow-glow-orange transition-all flex flex-col items-center justify-center gap-3 text-white"
                >
                  <Sparkles className="w-6 h-6" />
                  <p className="font-semibold text-sm">Criar com IA</p>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white animate-slide-up">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <Image src="/logo-cardup.png" alt="CardUp" width={120} height={35} />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-[#0F0F0F]">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plan Limit Modal */}
      <PlanLimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        currentPlan="free"
        limitType={limitType}
      />

      {/* Quick Start Modal */}
      <QuickStartModal
        isOpen={showQuickStart}
        onClose={() => setShowQuickStart(false)}
        onImport={handleQuickStartImport}
      />
    </>
  );
}
