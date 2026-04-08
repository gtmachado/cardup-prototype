"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers, type StoredUser } from "@/lib/storage";
import { mockAdmin } from "@/data/mockData";
import { 
  CreditCard, Search, ChevronLeft, Crown, Zap, Star, 
  Check, X, TrendingUp, Calendar, DollarSign
} from "lucide-react";

export default function AdminSubscriptionsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [filterPlan, setFilterPlan] = useState<string>("all");

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

  const paidUsers = users.filter(u => u.plan !== 'free');
  const freeUsers = users.filter(u => u.plan === 'free');

  const planDetails = {
    'free': { name: 'Vitrine', price: 0, icon: Star, color: 'gray' },
    'up': { name: 'UP', price: 149.98, icon: Zap, color: 'orange' },
    'gente-grande': { name: 'Gente Grande', price: 279.98, icon: Crown, color: 'purple' },
    'gente-grande-franquias': { name: 'Franquias', price: 0, icon: Crown, color: 'yellow' },
  };

  const filteredUsers = users.filter(u => {
    return filterPlan === "all" || u.plan === filterPlan;
  });

  const stats = {
    totalMRR: paidUsers.reduce((acc, u) => acc + (planDetails[u.plan]?.price || 0), 0),
    activeSubscriptions: paidUsers.length,
    churnRate: 0,
    avgRevenue: paidUsers.length > 0 ? paidUsers.reduce((acc, u) => acc + (planDetails[u.plan]?.price || 0), 0) / paidUsers.length : 0,
  };

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
              <h1 className="text-xl font-bold text-[#0F0F0F]">Assinaturas</h1>
              <p className="text-sm text-gray-500">Gerencie planos e pagamentos</p>
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Receita Mensal</p>
                <p className="text-3xl font-bold text-[#0F0F0F] mt-1">
                  R$ {stats.totalMRR.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Assinaturas Ativas</p>
                <p className="text-3xl font-bold text-[#0F0F0F] mt-1">{stats.activeSubscriptions}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ticket Médio</p>
                <p className="text-3xl font-bold text-[#0F0F0F] mt-1">
                  R$ {stats.avgRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Churn Rate</p>
                <p className="text-3xl font-bold text-[#0F0F0F] mt-1">0%</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <X className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <h2 className="text-lg font-bold text-[#0F0F0F] mb-6">Distribuição por Plano</h2>
            <div className="space-y-4">
              {Object.entries(planDetails).map(([key, plan]) => {
                const count = users.filter(u => u.plan === key).length;
                const percentage = users.length > 0 ? (count / users.length) * 100 : 0;
                const PlanIcon = plan.icon;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${plan.color}-100`}>
                          <PlanIcon className={`w-4 h-4 text-${plan.color}-600`} />
                        </div>
                        <span className="font-medium text-[#0F0F0F]">{plan.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{count} usuários</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`bg-${plan.color}-500 h-2 rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card">
            <h2 className="text-lg font-bold text-[#0F0F0F] mb-6">Resumo de Planos</h2>
            <div className="space-y-4">
              {Object.entries(planDetails).map(([key, plan]) => {
                const count = users.filter(u => u.plan === key).length;
                const revenue = count * plan.price;
                const PlanIcon = plan.icon;
                return (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${plan.color}-100`}>
                        <PlanIcon className={`w-5 h-5 text-${plan.color}-600`} />
                      </div>
                      <div>
                        <p className="font-medium text-[#0F0F0F]">{plan.name}</p>
                        <p className="text-xs text-gray-500">
                          {plan.price > 0 ? `R$ ${plan.price.toFixed(2).replace('.', ',')}/mês` : 'Sob consulta'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0F0F0F]">{count}</p>
                      <p className="text-xs text-gray-500">
                        {plan.price > 0 ? `R$ ${revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0F0F0F]">Todas as Assinaturas</h2>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
            >
              <option value="all">Todos</option>
              <option value="free">Vitrine</option>
              <option value="up">UP</option>
              <option value="gente-grande">Gente Grande</option>
              <option value="gente-grande-franquias">Franquias</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Plano</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Próximo Pagamento</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((u) => {
                  const plan = planDetails[u.plan];
                  const PlanIcon = plan.icon;
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
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-${plan.color}-100 text-${plan.color}-600`}>
                          <PlanIcon className="w-3 h-3" />
                          {plan.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {plan.price > 0 ? `R$ ${plan.price.toFixed(2).replace('.', ',')}` : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {u.plan === 'free' ? '-' : (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(new Date(u.createdAt).setMonth(new Date(u.createdAt).getMonth() + 1)).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                          <Check className="w-4 h-4" />
                          Ativo
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      Nenhuma assinatura encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
