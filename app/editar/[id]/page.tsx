"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getRestaurantById, updateRestaurant } from "@/lib/storage";
import { mockRestaurants, type Restaurant, type MenuSection, type MenuItem } from "@/data/mockData";
import { 
  Plus, Pencil, Trash2, ArrowLeft, Image as ImageIcon, X, Check, Search,
  Save, Eye, QrCode, Loader2, Sparkles, FileDown
} from "lucide-react";
import { QuickStartModal } from "@/components/QuickStartModal";
import { generateMenuPDF } from "@/lib/pdf";
import { PlanLimitModal } from "@/components/PlanLimitModal";
import { canCreateSection, canCreateItem } from "@/lib/plans";
import { useAuth } from "@/context/AuthContext";

export default function EditMenuPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user, restaurants: userRestaurants, setRestaurants } = useAuth();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newSectionName, setNewSectionName] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitType, setLimitType] = useState<"menus" | "sections" | "items">("sections");

  useEffect(() => {
    if (params.id) {
      // First check user restaurants
      const fromUser = userRestaurants.find((r) => r.id === params.id);
      // Then check mock restaurants (for admin)
      const fromMock = mockRestaurants.find((r) => r.id === params.id);
      // Then check global storage
      const fromStorage = getRestaurantById(params.id);
      
      const found = fromUser || fromMock || fromStorage || mockRestaurants[0];
      setRestaurant(found);
      if (found?.sections[0]) {
        setActiveSection(found.sections[0].id);
      }
    }
  }, [params.id, userRestaurants]);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  const currentSection = restaurant.sections.find((s) => s.id === activeSection);

  const handleSave = async () => {
    if (!restaurant) return;
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Update in local state
    const updatedRestaurants = userRestaurants.map((r) =>
      r.id === restaurant.id ? restaurant : r
    );
    
    // If not found in user restaurants, add to mock or update
    if (!updatedRestaurants.find((r) => r.id === restaurant.id)) {
      const mockIndex = mockRestaurants.findIndex((r) => r.id === restaurant.id);
      if (mockIndex !== -1) {
        mockRestaurants[mockIndex] = restaurant;
      }
    }
    
    setRestaurants(updatedRestaurants.length > 0 ? updatedRestaurants : userRestaurants);
    updateRestaurant(restaurant, user?.email);
    
    setIsSaving(false);
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddSection = () => {
    if (!canCreateSection("free", restaurant.sections.length)) {
      setLimitType("sections");
      setShowLimitModal(true);
      return;
    }
    if (!newSectionName.trim()) return;
    const newSection: MenuSection = {
      id: `s${Date.now()}`,
      name: newSectionName.trim(),
      items: [],
    };
    setRestaurant({ ...restaurant, sections: [...restaurant.sections, newSection] });
    setActiveSection(newSection.id);
    setNewSectionName("");
    setShowAddSection(false);
    setHasChanges(true);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (!confirm("Excluir esta seção e todos os seus itens?")) return;
    const newSections = restaurant.sections.filter((s) => s.id !== sectionId);
    setRestaurant({ ...restaurant, sections: newSections });
    if (activeSection === sectionId && newSections.length > 0) {
      setActiveSection(newSections[0].id);
    }
    setHasChanges(true);
  };

  const handleAddItem = () => {
    const currentItems = currentSection?.items.length || 0;
    if (!canCreateItem("free", currentItems)) {
      setLimitType("items");
      setShowLimitModal(true);
      return;
    }
    const newItem: MenuItem = {
      id: `i${Date.now()}`,
      name: "",
      description: "",
      price: 0,
      image: "",
      available: true,
    };
    setEditingItem(newItem);
    setShowItemModal(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem({ ...item });
    setShowItemModal(true);
  };

  const handleSaveItem = () => {
    if (!editingItem || !editingItem.name.trim()) {
      alert("Nome do item é obrigatório");
      return;
    }
    const updatedSections = restaurant.sections.map((s) =>
      s.id === activeSection
        ? {
            ...s,
            items: s.items.some((i) => i.id === editingItem.id)
              ? s.items.map((i) => (i.id === editingItem.id ? editingItem : i))
              : [...s.items, editingItem],
          }
        : s
    );
    setRestaurant({ ...restaurant, sections: updatedSections });
    setShowItemModal(false);
    setEditingItem(null);
    setHasChanges(true);
  };

  const handleDeleteItem = (itemId: string) => {
    if (!confirm("Excluir este item?")) return;
    const updatedSections = restaurant.sections.map((s) =>
      s.id === activeSection ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s
    );
    setRestaurant({ ...restaurant, sections: updatedSections });
    setHasChanges(true);
  };

  const handleToggleItem = (itemId: string) => {
    const updatedSections = restaurant.sections.map((s) =>
      s.id === activeSection
        ? {
            ...s,
            items: s.items.map((i) => (i.id === itemId ? { ...i, available: !i.available } : i)),
          }
        : s
    );
    setRestaurant({ ...restaurant, sections: updatedSections });
    setHasChanges(true);
  };

  const handleQuickStartImport = (sections: { name: string; items: { name: string; description: string; price: number }[] }[]) => {
    const newSections: MenuSection[] = sections.map((s) => ({
      id: `s${Date.now()}-${Math.random()}`,
      name: s.name,
      items: s.items.map((item) => ({
        id: `i${Date.now()}-${Math.random()}`,
        name: item.name,
        description: item.description,
        price: item.price,
        image: "",
        available: true,
      })),
    }));
    setRestaurant({ ...restaurant, sections: newSections });
    setActiveSection(newSections[0]?.id || "");
    setHasChanges(true);
  };

  const handleGeneratePDF = () => {
    generateMenuPDF(restaurant);
  };

  const filteredItems = currentSection?.items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-gray-200">
                <Image src={restaurant.logo} alt="" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="font-semibold text-[#0F0F0F]">{restaurant.name}</h1>
                <p className="text-xs text-gray-500">Modo edição</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/preview/${restaurant.slug}`}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
            <Link
              href={`/qr/${restaurant.slug}`}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 rounded-xl text-sm font-medium text-orange-600 transition-colors"
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </Link>
            <button
              onClick={handleGeneratePDF}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
            >
              <FileDown className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                hasChanges
                  ? 'bg-gradient-brand text-white hover:shadow-glow-orange'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvando...
                </>
              ) : saved ? (
                <>
                  <Check className="w-4 h-4" />
                  Salvo!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salvar
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Sections */}
        <aside className="lg:w-72 bg-white border-r border-gray-100 lg:h-[calc(100vh-65px)] lg:sticky lg:top-[65px] overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar itens..."
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={() => setShowQuickStart(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-sm font-semibold hover:shadow-glow-orange transition-all mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Criar com IA
            </button>

            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Seções</h2>
              <span className="text-xs text-gray-400">{restaurant.sections.length}/4</span>
            </div>

            <div className="space-y-2">
              {restaurant.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    activeSection === section.id
                      ? 'bg-[#0F0F0F] text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="font-medium text-sm">{section.name}</span>
                  <span className={`text-xs ${activeSection === section.id ? 'text-white/60' : 'text-gray-400'}`}>
                    {section.items.length}
                  </span>
                </button>
              ))}

              {restaurant.sections.length < 4 && (
                <button
                  onClick={() => setShowAddSection(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-orange-300 hover:text-orange-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar seção
                </button>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 mt-auto">
            <div className="relative h-20 rounded-xl overflow-hidden">
              <Image src={restaurant.banner} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setRestaurant({ ...restaurant, active: !restaurant.active })}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      restaurant.active ? 'bg-green-400 text-white' : 'bg-gray-400 text-white'
                    }`}
                  >
                    {restaurant.active ? 'Aberto' : 'Fechado'}
                  </button>
                  <button className="p-1.5 bg-white/90 rounded-lg">
                    <Pencil className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {currentSection && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F0F0F]">{currentSection.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{currentSection.items.length} itens</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteSection(currentSection.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleAddItem}
                    className="bg-gradient-brand text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-glow-orange transition-all flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Novo item
                  </button>
                </div>
              </div>

              {filteredItems.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-[#0F0F0F] mb-2">Nenhum item nesta seção</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Adicione itens ao seu cardápio para começar
                  </p>
                  <button
                    onClick={handleAddItem}
                    className="bg-gradient-brand text-white px-6 py-3 rounded-xl font-semibold hover:shadow-glow-orange transition-all inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Adicionar primeiro item
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all ${
                        !item.available ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-[#0F0F0F] truncate">{item.name || 'Sem nome'}</h4>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description || 'Sem descrição'}</p>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEditItem(item)}
                                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <Pencil className="w-3.5 h-3.5 text-gray-600" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-lg font-bold text-orange-500">
                              R$ {item.price.toFixed(2).replace(".", ",")}
                            </p>
                            <button
                              onClick={() => handleToggleItem(item.id)}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                item.available
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {item.available ? 'Disponível' : 'Indisponível'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add Section Modal */}
      {showAddSection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0F0F0F]">Nova Seção</h3>
              <button onClick={() => setShowAddSection(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Ex: Pizzas, Bebidas, Sobremesas"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setShowAddSection(false); setNewSectionName(""); }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSection}
                disabled={!newSectionName.trim()}
                className="flex-1 bg-gradient-brand text-white py-3 rounded-xl font-semibold hover:shadow-glow-orange transition-all disabled:opacity-50"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showItemModal && editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0F0F0F]">
                {editingItem.name ? 'Editar item' : 'Novo item'}
              </h3>
              <button onClick={() => { setShowItemModal(false); setEditingItem(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Imagem</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {editingItem.image ? (
                      <Image src={editingItem.image} alt="" width={80} height={80} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    placeholder="URL da imagem"
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Nome *</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="Nome do item"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
                  placeholder="Descreva o item..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Preço (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                  <button
                    onClick={() => setEditingItem({ ...editingItem, available: !editingItem.available })}
                    className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${
                      editingItem.available
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {editingItem.available ? 'Disponível' : 'Indisponível'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowItemModal(false); setEditingItem(null); }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveItem}
                className="flex-1 bg-gradient-brand text-white py-3 rounded-xl font-semibold hover:shadow-glow-orange transition-all"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Start Modal */}
      <QuickStartModal
        isOpen={showQuickStart}
        onClose={() => setShowQuickStart(false)}
        onImport={handleQuickStartImport}
      />

      {/* Plan Limit Modal */}
      <PlanLimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        currentPlan="free"
        limitType={limitType}
      />
    </div>
  );
}
