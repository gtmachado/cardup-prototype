"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MessageCircle, Send, X, CheckCircle, Mail, Phone, MapPin,
  Clock, ChevronDown, ChevronUp, User, HelpCircle, Zap, CreditCard
} from "lucide-react";

export default function ContatoPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Como funciona o CardUp?',
      a: 'O CardUp é uma plataforma de cardápios digitais. Você cria sua conta, monta seu cardápio com seções e itens, gera um QR Code e seus clientes acessam pelo celular. Simples assim!',
    },
    {
      q: 'Preciso pagar para usar?',
      a: 'Não! Temos um plano gratuito (Vitrine) que permite 1 cardápio com até 4 seções e 8 itens por seção. Se precisar de mais recursos, oferecemos planos pagos a partir de R$ 149,98/mês.',
    },
    {
      q: 'Como gero o QR Code?',
      a: 'Após criar seu cardápio, clique no ícone de QR Code no card do seu cardápio no dashboard. Lá você pode baixar em PNG ou copiar o link para compartilhar.',
    },
    {
      q: 'Posso atualizar preços em tempo real?',
      a: 'Sim! Uma das principais vantagens do CardUp é a atualização instantânea. Altere preços, adicione itens ou mude disponibilidade e seus clientes já veem as mudanças.',
    },
    {
      q: 'O CardUp funciona offline?',
      a: 'O cardápio digital precisa de internet para ser acessado, mas uma vez carregado, funciona caching automático para visualizações básicas.',
    },
  ];

  const initialBotMessage = {
    id: 1,
    from: 'bot' as const,
    text: 'Olá! 👋 Eu sou a Luna, sua assistente virtual do CardUp! Como posso te ajudar hoje?',
    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  };

  const quickReplies = [
    { icon: HelpCircle, text: 'Como funciona?', response: 'O CardUp é uma plataforma de cardápios digitais. Você cria sua conta, monta seu cardápio com seções e itens, gera um QR Code e seus clientes acessam pelo celular. Simples assim!' },
    { icon: CreditCard, text: 'Planos e preços', response: 'Temos o plano gratuito (Vitrine) com 1 cardápio, 4 seções e 8 itens por seção. Para mais recursos, oferecemos:\n\n• UP: R$ 149,98/mês\n• Gente Grande: R$ 279,98/mês\n• Franquias: Sob consulta' },
    { icon: Zap, text: 'Quick Start com IA', response: 'O Quick Start é uma 功能 incrível! Você pode enviar uma foto do seu cardápio físico, um PDF ou colar o texto, e nossa IA extrai automaticamente todas as seções, itens, descrições e preços. Depois é só revisar e confirmar!' },
    { icon: MessageCircle, text: 'Falar com suporte', response: 'Claro! Para falar com nosso time de suporte, você pode:\n\n📧 Email: suporte@cardup.com.br\n\nNosso time responde em até 24 horas úteis. Enquanto isso, posso tentar ajudar com outras dúvidas!' },
  ];

  const botResponses: Record<string, string> = {
    'oi': 'Olá! 👋 Que bom ter você aqui! Sou a Luna, sua assistente virtual do CardUp. Como posso te ajudar hoje?',
    'olá': 'Olá! 👋 Que bom ter você aqui! Sou a Luna, sua assistente virtual do CardUp. Como posso te ajudar hoje?',
    'olá!': 'Olá! 👋 Que bom ter você aqui! Sou a Luna, sua assistente virtual do CardUp. Como posso te ajudar hoje?',
    'oi!': 'Olá! 👋 Que bom ter você aqui! Sou a Luna, sua assistente virtual do CardUp. Como posso te ajudar hoje?',
    'como funciona': 'O CardUp é simples e poderoso! Você:\n\n1️⃣ Cria sua conta (grátis!)\n2️⃣ Monta seu cardápio digital\n3️⃣ Gera QR Codes para suas mesas\n4️⃣ Clientes escaneiam e pedem pelo celular!\n\nSem耗 reimpressões, atualização de preços em tempo real, e seus clientes amam a experiência moderna 🎉',
    'preço': 'Temos opções para todos os bolsos!\n\n🥇 **Vitrine (Grátis)**: 1 cardápio, 4 seções, 8 itens\n🥈 **UP (R$ 149,98/mês)**: 5 cardápios, PDV, CRM\n🥇 **Gente Grande (R$ 279,98/mês)**: Tudo ilimitado + IA\n\nQuer saber mais detalhes de algum plano?',
    'plano': 'Temos opções para todos os bolsos!\n\n🥇 **Vitrine (Grátis)**: 1 cardápio, 4 seções, 8 itens\n🥈 **UP (R$ 149,98/mês)**: 5 cardápios, PDV, CRM\n🥇 **Gente Grande (R$ 279,98/mês)**: Tudo ilimitado + IA\n\nQuer saber mais detalhes de algum plano?',
    'custo': 'Temos opções para todos os bolsos!\n\n🥇 **Vitrine (Grátis)**: 1 cardápio, 4 seções, 8 itens\n🥈 **UP (R$ 149,98/mês)**: 5 cardápios, PDV, CRM\n🥇 **Gente Grande (R$ 279,98/mês)**: Tudo ilimitado + IA\n\nQuer saber mais detalhes de algum plano?',
    'suporte': 'Nosso time de suporte está pronto para ajudar! 📧\n\n**Email**: suporte@cardup.com.br\n\nRespondemos em até 24 horas úteis. Enquanto isso, posso tentar ajudar com outras dúvidas! 😊',
    'contato': 'Você pode entrar em contato conosco por:\n\n📧 **Email**: suporte@cardup.com.br\n\nNosso time responde em até 24 horas úteis. Estamos aqui para ajudar! 💪',
    'qr': 'Gerar QR Codes é superfácil! 🚀\n\n1️⃣ Vá até seu Dashboard\n2️⃣ Clique no ícone de QR Code do seu cardápio\n3️⃣ Baixe em PNG ou copie o link\n\nVocê pode imprimir e colocar nas mesas do seu restaurante! 📋✨',
    'qr code': 'Gerar QR Codes é superfácil! 🚀\n\n1️⃣ Vá até seu Dashboard\n2️⃣ Clique no ícone de QR Code do seu cardápio\n3️⃣ Baixe em PNG ou copie o link\n\nVocê pode imprimir e colocar nas mesas do seu restaurante! 📋✨',
    'obrigado': 'De nada! 😊 Foi um prazer ajudar! Se tiver mais alguma dúvida, é só chamar. Boas vendas! 🛒✨',
    'obrigada': 'De nada! 😊 Foi um prazer ajudar! Se tiver mais alguma dúvida, é só chamar. Boas vendas! 🛒✨',
    'valeu': 'De nada! 😊 Foi um prazer ajudar! Se tiver mais alguma dúvida, é só chamar. Boas vendas! 🛒✨',
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      from: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = input.toLowerCase().trim();
      let response = "Hmm, não entendi muito bem. 🤔 Pode reformular sua pergunta? Também posso ajudar com:\n\n• Como funciona o CardUp\n• Planos e preços\n• Como gerar QR Code\n• Suporte e contato\n\nOu clique em uma das opções rápidas abaixo!";

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        from: 'bot',
        text: response,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: typeof quickReplies[0]) => {
    const userMessage: Message = {
      id: Date.now(),
      from: 'user',
      text: reply.text,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        from: 'bot',
        text: reply.response,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-cardup.png" alt="CardUp" width={120} height={35} />
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
              Entrar
            </Link>
            <Link href="/cadastro" className="bg-gradient-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-glow-orange transition-all">
              Começar grátis
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <div>
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              Fale com a gente
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#0F0F0F] mb-6">
              Como podemos<br />te ajudar? 💬
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Estamos aqui para responder suas dúvidas e ajudar você a vender mais com o CardUp.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F0F0F] mb-1">E-mail</h3>
                  <p className="text-gray-500">suporte@cardup.com.br</p>
                  <p className="text-sm text-gray-400 mt-1">Respondemos em até 24h</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F0F0F] mb-1">Chatbot Luna</h3>
                  <p className="text-gray-500">Respostas instantâneas 24/7</p>
                  <p className="text-sm text-gray-400 mt-1">Clique no balão no canto inferior</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F0F0F] mb-1">Horário de atendimento</h3>
                  <p className="text-gray-500">Seg a Sex: 9h às 18h</p>
                  <p className="text-sm text-gray-400 mt-1">E-mail: até 24h úteis</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-[#0F0F0F] mb-6">Perguntas Frequentes</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-medium text-[#0F0F0F]">{faq.q}</span>
                      {faqOpen === i ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {faqOpen === i && (
                      <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white rounded-3xl shadow-card p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-[#0F0F0F] mb-2">Envie uma mensagem</h2>
            <p className="text-gray-500 mb-8">Preencha o formulário abaixo e responderemos em breve.</p>

            <form className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 tracking-wider">
                  NOME
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 tracking-wider">
                  E-MAIL
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 tracking-wider">
                  ASSUNTO
                </label>
                <select className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500">
                  <option>Selecione um assunto</option>
                  <option>Dúvidas sobre planos</option>
                  <option>Problemas técnicos</option>
                  <option>Sugestões</option>
                  <option>Parcerias</option>
                  <option>Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 tracking-wider">
                  MENSAGEM
                </label>
                <textarea
                  rows={5}
                  placeholder="Como podemos ajudar?"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                />
              </div>

              <button
                type="button"
                className="w-full bg-gradient-brand text-white py-4 rounded-xl font-semibold hover:shadow-glow-orange transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Luna Chat Widget */}
      <LunaChatWidget
        isOpen={chatOpen}
        setIsOpen={setChatOpen}
        messages={messages}
        setMessages={setMessages}
        input={input}
        setInput={setInput}
        isTyping={isTyping}
        sendMessage={sendMessage}
        handleKeyDown={handleKeyDown}
        handleQuickReply={handleQuickReply}
        quickReplies={quickReplies}
        initialBotMessage={initialBotMessage}
      />

      {/* Footer */}
      <footer className="bg-[#0F0F0F] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Image src="/logo-cardup.png" alt="CardUp" width={120} height={35} className="mx-auto mb-4 brightness-0 invert" />
          <p className="text-gray-500 text-sm">© 2026 CardUp by Nexor. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

interface Message {
  id: number;
  from: 'user' | 'bot';
  text: string;
  time: string;
}

interface QuickReplyOption {
  icon: any;
  text: string;
  response: string;
}

interface LunaChatWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  input: string;
  setInput: (input: string) => void;
  isTyping: boolean;
  sendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleQuickReply: (reply: QuickReplyOption) => void;
  quickReplies: QuickReplyOption[];
  initialBotMessage: Message;
}

function LunaChatWidget({
  isOpen,
  setIsOpen,
  messages,
  setMessages,
  input,
  setInput,
  isTyping,
  sendMessage,
  handleKeyDown,
  handleQuickReply,
  quickReplies,
  initialBotMessage,
}: LunaChatWidgetProps) {
  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => {
          if (!isOpen && messages.length === 0) {
            setMessages([initialBotMessage]);
          }
          setIsOpen(!isOpen);
        }}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 ${
          isOpen
            ? 'bg-gray-800 text-white'
            : 'bg-gradient-brand text-white hover:shadow-glow-orange'
        }`}
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <div className="relative">
            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" fill="white" fillOpacity="0.2"/>
              <circle cx="14" cy="16" r="3" fill="white"/>
              <circle cx="26" cy="16" r="3" fill="white"/>
              <circle cx="14" cy="16" r="1.5" fill="#0F0F0F"/>
              <circle cx="26" cy="16" r="1.5" fill="#0F0F0F"/>
              <path d="M12 25 Q20 32 28 25" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-brand p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" fill="white" fillOpacity="0.2"/>
                  <circle cx="14" cy="16" r="3" fill="white"/>
                  <circle cx="26" cy="16" r="3" fill="white"/>
                  <circle cx="14" cy="16" r="1.5" fill="#F97316"/>
                  <circle cx="26" cy="16" r="1.5" fill="#F97316"/>
                  <path d="M12 25 Q20 32 28 25" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Luna</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Online agora
                </p>
              </div>
            </div>
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="p-3 bg-gray-50 border-b border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Respostas rápidas:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply: QuickReplyOption, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-colors"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                    msg.from === "user"
                      ? "bg-gradient-brand text-white rounded-br-md"
                      : "bg-white text-gray-700 shadow-sm rounded-bl-md"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === "user" ? "text-white/60" : "text-gray-400"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="p-2.5 bg-gradient-brand text-white rounded-xl hover:shadow-glow-orange transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
