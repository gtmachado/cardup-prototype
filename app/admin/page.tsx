"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers, getRestaurantsByEmail, type StoredUser } from "@/lib/storage";
import { mockAdmin } from "@/data/mockData";
import { 
  Users, CreditCard, TrendingUp, Activity, LogOut, Menu,
  ChevronRight, Shield, CheckCircle, XCircle, Crown, Zap, Star
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [users, setUsers] = useState<StoredUser[]>([]);

  useEffect(() => {
    if (!user || user.email !== mockAdmin.email) {
      router.push("/login");
      return;
    }
    const allUsers = getAllUsers();
    setUsers(allUsers);
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user || user.email !== mockAdmin.email) {
    return null;
  }

  const stats = {
    totalUsers: users.length,
    freeUsers: users.filter(u => u.plan === 'free').length,
    paidUsers: users.filter(u => u.plan !== 'free').length,
    activeSubscriptions: users.filter(u => u.plan !== 'free' && u.plan !== 'gente-grande-franquias').length,
  };

  const planIcons = {
    'free': Star,
    'up': Zap,
    'gente-grande': Crown,
    'gente-grande-franquias': Crown,
  };

  const planColors = {
    'free': 'bg-gray-100 text-gray-600',
    'up': 'bg-orange-100 text-orange-600',
    'gente-grande': 'bg-purple-100 text-purple-600',
    'gente-grande-franquias': 'bg-yellow-100 text-yellow-600',
  };

  const planNames = {
    'free': 'Vitrine',
    'up': 'UP',
    'gente-grande': 'Gente Grande',
    'gente-grande-franquias': 'Franquias',
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Sidebar */}
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
              <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        <div className={`p-6 border-b border-gray-100 ${!sidebarOpen ? 'px-4' : ''}`}>
          <div className={`flex items-center ${!sidebarOpen ? 'justify-center' : 'gap-4'}`}>
            <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#0F0F0F] truncate">Admin</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: Activity, label: 'Visão Geral', href: '/admin' },
            { icon: Users, label: 'Usuários', href: '/admin/usuarios' },
            { icon: CreditCard, label: 'Assinaturas', href: '/admin/assinaturas' },
          ].map((item) => (
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
                <h1 className="text-xl font-bold text-[#0F0F0F]">Painel Administrativo</h1>
                <p className="text-sm text-gray-500">Gerencie usuários e assinaturas</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total de Usuários</p>
                  <p className="text-3xl font-bold text-[#0F0F0F] mt-1">{stats.totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Plano Gratuito</p>
                  <p className="text-3xl font-bold text-[#0F0F0F] mt-1">{stats.freeUsers}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Usuários Pagos</p>
                  <p className="text-3xl font-bold text-[#0F0F0F] mt-1">{stats.paidUsers}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Receita Mensal</p>
                  <p className="text-3xl font-bold text-[#0F0F0F] mt-1">R$ 0</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0F0F0F]">Usuários Recentes</h2>
              <Link href="/admin/usuarios" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                Ver todos
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuário</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plano</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data de Registro</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cardápios</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.slice(0, 5).map((u) => {
                    const PlanIcon = planIcons[u.plan];
                    const userRestaurants = getRestaurantsByEmail(u.email);
                    return (
                      <tr key={u.email} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-semibold">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-[#0F0F0F]">{u.name}</p>
                              <p className="text-xs text-gray-500">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${planColors[u.plan]}`}>
                            <PlanIcon className="w-3 h-3" />
                            {planNames[u.plan]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {userRestaurants.length}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Ativo
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        Nenhum usuário registrado ainda
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white animate-slide-up">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <Image src="/logo-cardup.png" alt="CardUp" width={120} height={35} />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {[
                { icon: Activity, label: 'Visão Geral', href: '/admin' },
                { icon: Users, label: 'Usuários', href: '/admin/usuarios' },
                { icon: CreditCard, label: 'Assinaturas', href: '/admin/assinaturas' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
