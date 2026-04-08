"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers, getRestaurantsByEmail, updateUser, type StoredUser } from "@/lib/storage";
import { mockAdmin } from "@/data/mockData";
import { 
  Users, Search, Filter, ChevronLeft, ChevronRight,
  Crown, Zap, Star, MoreVertical, Edit, Trash2, Eye
} from "lucide-react";

export default function AdminUsersPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<StoredUser | null>(null);
  const usersPerPage = 10;

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

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === "all" || u.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[#0F0F0F]">Usuários</h1>
              <p className="text-sm text-gray-500">{filteredUsers.length} usuários</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="Buscar por nome ou e-mail..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterPlan}
                onChange={(e) => { setFilterPlan(e.target.value); setCurrentPage(1); }}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              >
                <option value="all">Todos os planos</option>
                <option value="free">Vitrine</option>
                <option value="up">UP</option>
                <option value="gente-grande">Gente Grande</option>
                <option value="gente-grande-franquias">Franquias</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Usuário</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Plano</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Data de Registro</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Cardápios</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedUsers.map((u) => {
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
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedUser(u)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Ver detalhes"
                          >
                            <Eye className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {paginatedUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Mostrando {(currentPage - 1) * usersPerPage + 1} a {Math.min(currentPage * usersPerPage, filteredUsers.length)} de {filteredUsers.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedUser(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-lg p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0F0F0F]">Detalhes do Usuário</h3>
              <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-2xl">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-[#0F0F0F] text-xl">{selectedUser.name}</p>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Plano</p>
                  <p className="font-semibold text-[#0F0F0F]">{planNames[selectedUser.plan]}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Cardápios</p>
                  <p className="font-semibold text-[#0F0F0F]">{getRestaurantsByEmail(selectedUser.email).length}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Data de Registro</p>
                  <p className="font-semibold text-[#0F0F0F]">{new Date(selectedUser.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <p className="font-semibold text-green-600">Ativo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
