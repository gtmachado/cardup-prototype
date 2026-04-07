"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Eye, EyeOff, Check, Loader2, KeyRound, ArrowLeft } from "lucide-react";

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (novaSenha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }
    if (novaSenha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setSuccess(true);
    setTimeout(() => router.push("/login"), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F0F0F] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <Link href="/" className="mb-12">
            <Image src="/logo-cardup.png" alt="CardUp" width={180} height={52} className="brightness-0 invert" />
          </Link>
          <div className="max-w-md text-center">
            <div className="w-20 h-20 bg-orange-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <KeyRound className="w-10 h-10 text-orange-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Crie uma nova senha
            </h1>
            <p className="text-gray-400">
              Escolha uma senha forte para proteger sua conta. Use pelo menos 6 caracteres.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#FAFAFA]">
        <div className="w-full max-w-md">
          <Link href="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Voltar ao login</span>
          </Link>

          <div className="bg-white rounded-3xl shadow-card p-8 lg:p-10">
            <div className="lg:hidden text-center mb-8">
              <Link href="/">
                <Image src="/logo-cardup.png" alt="CardUp" width={140} height={40} className="mx-auto" />
              </Link>
            </div>

            {success ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F0F0F] mb-2">Senha redefinida!</h2>
                <p className="text-gray-500 mb-6">
                  Sua senha foi alterada com sucesso. Use a nova senha para fazer login.
                </p>
                <p className="text-sm text-gray-400">Redirecionando...</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#0F0F0F] mb-2">Nova senha</h2>
                  <p className="text-gray-500 text-sm">
                    Digite sua nova senha abaixo.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm animate-fade-in">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2 tracking-wider">
                      NOVA SENHA
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2 tracking-wider">
                      CONFIRMAR SENHA
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        placeholder="Repita a senha"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Password requirements */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-2">Sua senha deve ter:</p>
                    <div className="space-y-1">
                      {[
                        { met: novaSenha.length >= 6, text: 'Pelo menos 6 caracteres' },
                        { met: novaSenha === confirmarSenha && novaSenha.length > 0, text: 'Senhas coincidem' },
                      ].map((req, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-100' : 'bg-gray-200'}`}>
                            {req.met && <Check className="w-2.5 h-2.5 text-green-500" />}
                          </div>
                          <span className={req.met ? 'text-green-600' : 'text-gray-400'}>{req.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-brand text-white py-4 rounded-xl font-semibold text-sm hover:shadow-glow-orange transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Redefinindo...
                      </>
                    ) : (
                      "Redefinir senha"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
