"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Pencil, Camera, Save, LogOut, Shield, Bell, HelpCircle, ChevronRight, Loader2 } from "lucide-react";

export default function PerfilPage() {
  const router = useRouter();
  const { user, logout, restaurants } = useAuth();
  const restaurant = restaurants[0];
  
  const [name, setName] = useState(user?.name || restaurant?.name || "");
  const [email, setEmail] = useState(user?.email || restaurant?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-gradient-brand px-6 py-8 pt-16">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span className="text-sm font-medium">Voltar ao dashboard</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl">
              <Image
                src={restaurant?.logo || "/simbolo-cardup.png"}
                alt={restaurant?.name || "Logo"}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="text-white">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-white/80 text-sm">{email}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Profile section */}
        <div className="bg-white rounded-3xl shadow-card p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#0F0F0F]">Informações do perfil</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600"
              >
                <Pencil className="w-4 h-4" />
                Editar
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setIsEditing(false); setName(user?.name || ""); setEmail(user?.email || ""); }}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 text-sm font-medium text-green-500 hover:text-green-600"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Salvo!' : 'Salvar'}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 tracking-wider">
                NOME DO ESTABELECIMENTO
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl text-sm ${
                  isEditing ? 'bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20' : 'bg-transparent'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 tracking-wider">
                E-MAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl text-sm ${
                  isEditing ? 'bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20' : 'bg-transparent'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Menu section */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden mb-6">
          <h2 className="text-lg font-bold text-[#0F0F0F] p-6 border-b border-gray-100">Configurações</h2>
          
          <div className="divide-y divide-gray-100">
            {[
              { icon: Shield, label: 'Privacidade e Segurança', description: 'Gerencie suas configurações de segurança' },
              { icon: Bell, label: 'Notificações', description: 'Configure como recebe alertas' },
              { icon: HelpCircle, label: 'Central de Ajuda', description: 'Tire suas dúvidas sobre o CardUp' },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#0F0F0F]">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Account section */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden">
          <h2 className="text-lg font-bold text-[#0F0F0F] p-6 border-b border-gray-100">Conta</h2>
          
          <div className="divide-y divide-gray-100">
            <button className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors text-left">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#0F0F0F]">Alterar senha</p>
                <p className="text-xs text-gray-500 mt-0.5">Atualize sua senha de acesso</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-5 hover:bg-red-50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-red-500">Sair da conta</p>
                <p className="text-xs text-red-400/70 mt-0.5">Faça logout do CardUp</p>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            CardUp v1.0.0 • © 2026 Nexor
          </p>
        </div>
      </main>
    </div>
  );
}
