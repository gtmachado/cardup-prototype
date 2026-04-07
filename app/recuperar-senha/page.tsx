"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowLeft, Check, Loader2, KeyRound } from "lucide-react";

export default function RecuperarSenhaPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSent(true);
    setIsLoading(false);
    setTimeout(() => router.push("/redefinir-senha"), 2500);
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
              Esqueceu sua senha?
            </h1>
            <p className="text-gray-400">
              Não se preocupe! Happens com os melhores. Informe seu e-mail e vamos te ajudar a recuperar o acesso.
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

            {sent ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F0F0F] mb-2">E-mail enviado!</h2>
                <p className="text-gray-500 mb-6">
                  Enviamos um link de recuperação para <strong>{email}</strong>. Verifique sua caixa de entrada.
                </p>
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm text-orange-600">
                    💡 Dica: Verifique também a pasta de spam/lixo eletrônico.
                  </p>
                </div>
                <p className="text-sm text-gray-400 mt-6">Redirecionando...</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#0F0F0F] mb-2">Recuperar senha</h2>
                  <p className="text-gray-500 text-sm">
                    Informe o e-mail cadastrado para receber o link de recuperação.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
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

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-brand text-white py-4 rounded-xl font-semibold text-sm hover:shadow-glow-orange transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar link de recuperação"
                    )}
                  </button>
                </form>
              </>
            )}

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Lembrou a senha?{' '}
                <Link href="/login" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                  Fazer login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
