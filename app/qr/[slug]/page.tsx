"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getRestaurantBySlug } from "@/lib/storage";
import { mockRestaurants } from "@/data/mockData";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Copy, Share2, Download, Check, Smartphone, Printer, Heart } from "lucide-react";
import { useState } from "react";

export default function QRCodePage() {
  const params = useParams<{ slug: string }>();
  const restaurant = params?.slug 
    ? (getRestaurantBySlug(params.slug) || mockRestaurants.find((r) => r.slug === params.slug))
    : null;
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-[#0F0F0F] mb-2">Cardápio não encontrado</h1>
          <Link href="/dashboard" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
            Voltar ao dashboard
          </Link>
        </div>
      </div>
    );
  }

  const menuUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/cardapio/${restaurant.slug}`
    : `https://cardup.com/cardapio/${restaurant.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    const canvas = document.querySelector('#qr-code canvas') as HTMLCanvasElement | null;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${restaurant.slug}-qrcode.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="font-semibold text-[#0F0F0F]">QR Code</h1>
              <p className="text-xs text-gray-500">{restaurant.name}</p>
            </div>
          </div>
          <Link href={`/editar/${restaurant.id}`} className="text-sm text-orange-500 hover:text-orange-600 font-medium">
            Editar cardápio
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-card overflow-hidden">
          {/* Card header */}
          <div className="relative h-32 bg-gradient-brand">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          {/* Content */}
          <div className="px-8 pb-8 -mt-16">
            {/* Restaurant info */}
            <div className="flex items-end gap-4 mb-8">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white">
                <Image 
                  src={restaurant.logo} 
                  alt={restaurant.name} 
                  width={80} 
                  height={80} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 mb-1">
                <h2 className="text-2xl font-bold text-[#0F0F0F]">{restaurant.name}</h2>
                <p className="text-sm text-gray-500">Cardápio digital</p>
              </div>
              <button 
                onClick={() => setLiked(!liked)}
                className={`p-3 rounded-full transition-all ${liked ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100" id="qr-code">
                  <QRCodeSVG
                    value={menuUrl}
                    size={220}
                    level="H"
                    includeMargin
                    fgColor="#0F0F0F"
                    bgColor="#FFFFFF"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-orange-500 rounded-xl -z-10" />
                <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-[#0F0F0F] rounded-xl -z-10" />
              </div>
            </div>

            {/* URL */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-xs text-gray-500 mb-2">Link do cardápio</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={menuUrl}
                  readOnly
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none"
                />
                <button
                  onClick={handleCopy}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                    copied 
                      ? 'bg-green-400 text-white' 
                      : 'bg-gradient-brand text-white hover:shadow-glow-orange'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 bg-[#0F0F0F] text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
              >
                <Download className="w-5 h-5" />
                Baixar PNG
              </button>
              <button 
                onClick={async () => {
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: `${restaurant.name} - Cardápio Digital`,
                        text: `Acesse o cardápio de ${restaurant.name}`,
                        url: menuUrl,
                      });
                    } catch (err) {
                      console.log('Share cancelled');
                    }
                  } else {
                    navigator.clipboard.writeText(menuUrl);
                    alert('Link copiado!');
                  }
                }}
                className="flex items-center justify-center gap-2 bg-gray-100 text-[#0F0F0F] py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Compartilhar
              </button>
            </div>

            {/* Tips */}
            <div className="bg-orange-50 rounded-2xl p-5">
              <h3 className="font-semibold text-[#0F0F0F] mb-3 flex items-center gap-2">
                <Printer className="w-5 h-5 text-orange-500" />
                Dicas de uso
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  Imprima o QR Code e cole nas mesas do seu restaurante
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  Use papéis resistentes ou plastifique para maior durabilidade
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  Coloque em uma moldura ou suporte para ficar mais elegante
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Preview link */}
        <div className="mt-8 text-center">
          <Link
            href={`/cardapio/${restaurant.slug}`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors"
          >
            <Smartphone className="w-4 h-4" />
            <span className="text-sm font-medium">Ver como cliente</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
