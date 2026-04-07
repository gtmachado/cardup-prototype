"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (login(email, password)) {
      router.push("/dashboard");
    } else {
      setError("E-mail ou senha incorretos. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-brand relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <div className="max-w-md text-center">
            <Link href="/" className="inline-block mb-12">
              <Image src="/logo-cardup.png" alt="CardUp" width={180} height={52} className="brightness-0 invert" />
            </Link>

            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Bem-vindo de volta!
            </h1>
            <p className="text-xl text-white/80 mb-12">
              Continue gerenciando seu cardápio digital e conquiste mais clientes.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '2.000+', label: 'Restaurantes' },
                { value: '50.000+', label: 'Cardápios' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#FAFAFA]">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link href="/">
              <Image src="/logo-cardup.png" alt="CardUp" width={140} height={40} className="mx-auto" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-card p-8 lg:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#0F0F0F] mb-2">Fazer login</h2>
              <p className="text-gray-500 text-sm">
                Entre para gerenciar seu cardápio
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm animate-fade-in">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 tracking-wider">
                  E-MAIL
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-gray-700 tracking-wider">
                    SENHA
                  </label>
                  <Link href="/recuperar-senha" className="text-xs text-orange-500 hover:text-orange-600 font-medium">
                    Esqueceu?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    required
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-brand text-white py-4 rounded-xl font-semibold text-sm hover:shadow-glow-orange transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">ou</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="bg-orange-50 rounded-xl p-4 mb-6">
              <p className="text-xs text-orange-600 font-medium mb-2">🔑 Demo para testar:</p>
              <p className="text-xs text-orange-500">admin@cardup.com / 123456</p>
            </div>

            <p className="text-center text-sm text-gray-500">
              Não tem uma conta?{' '}
              <Link href="/cadastro" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                Criar conta grátis
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Ao entrar, você concorda com nossos{' '}
            <a href="#" className="text-gray-500 hover:text-gray-700">Termos de Uso</a>
            {' '}e{' '}
            <a href="#" className="text-gray-500 hover:text-gray-700">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
}
