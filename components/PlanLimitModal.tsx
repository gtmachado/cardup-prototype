"use client";

import { Sparkles, Zap, Crown, ArrowRight, X } from "lucide-react";
import Link from "next/link";

interface PlanLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  limitType: "menus" | "sections" | "items";
}

export function PlanLimitModal({ isOpen, onClose, currentPlan, limitType }: PlanLimitModalProps) {
  if (!isOpen) return null;

  const messages = {
    free: {
      menus: {
        title: "Limite de cardápios atingido!",
        description: "No plano Gratuito você pode ter apenas 1 cardápio ativo. Faça upgrade para o Plano UP e tenha até 5 cardápios!",
      },
      sections: {
        title: "Limite de seções atingido!",
        description: "No plano Gratuito você pode ter até 4 seções por cardápio. Faça upgrade para o Plano UP e tenha até 10 seções!",
      },
      items: {
        title: "Limite de itens atingido!",
        description: "No plano Gratuito você pode ter até 8 itens por seção. Faça upgrade para o Plano UP e tenha até 20 itens!",
      },
    },
    up: {
      menus: {
        title: "Limite de cardápios atingido!",
        description: "No plano UP você pode ter até 5 cardápios ativos. Faça upgrade para o Plano Gente Grande e tenha até 10 cardápios!",
      },
      sections: {
        title: "Limite de seções atingido!",
        description: "No plano UP você pode ter até 10 seções por cardápio. Faça upgrade para o Plano Gente Grande e tenha seções ilimitadas!",
      },
      items: {
        title: "Limite de itens atingido!",
        description: "No plano UP você pode ter até 20 itens por seção. Faça upgrade para o Plano Gente Grande e tenha itens ilimitados!",
      },
    },
  };

  const currentMessages = messages[currentPlan as keyof typeof messages]?.[limitType] || messages.free.menus;

  const nextPlan = currentPlan === "free" ? "up" : "gente-grande";
  const nextPlanNames = { up: "UP", "gente-grande": "Gente Grande" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden animate-scale-in">
        {/* Header gradient */}
        <div className="bg-gradient-brand p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {currentPlan === "free" ? (
              <Zap className="w-8 h-8 text-white" />
            ) : (
              <Crown className="w-8 h-8 text-white" />
            )}
          </div>
          <h3 className="text-xl font-bold text-white">{currentMessages.title}</h3>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-sm text-center mb-6">
            {currentMessages.description}
          </p>

          {/* Feature comparison */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase">Seu plano</span>
              <span className="text-xs font-medium text-gray-500 uppercase">Plano {nextPlanNames[nextPlan as keyof typeof nextPlanNames]}</span>
            </div>
            <div className="space-y-2">
              {limitType === "menus" && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Cardápios</span>
                    <span className="font-semibold text-orange-500">
                      {currentPlan === "free" ? "1 → 5" : "5 → 10"}
                    </span>
                  </div>
                </>
              )}
              {limitType === "sections" && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Seções</span>
                    <span className="font-semibold text-orange-500">
                      {currentPlan === "free" ? "4 → 10" : "10 → ∞"}
                    </span>
                  </div>
                </>
              )}
              {limitType === "items" && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Itens/seção</span>
                    <span className="font-semibold text-orange-500">
                      {currentPlan === "free" ? "8 → 20" : "20 → ∞"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/planos"
              onClick={onClose}
              className="block w-full bg-gradient-brand text-white py-3.5 rounded-xl font-semibold text-center hover:shadow-glow-orange transition-all flex items-center justify-center gap-2"
            >
              Ver planos e preços
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={onClose}
              className="block w-full bg-gray-100 text-gray-700 py-3.5 rounded-xl font-medium text-center hover:bg-gray-200 transition-colors"
            >
              Talvez depois
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
