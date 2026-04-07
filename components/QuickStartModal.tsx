"use client";

import { useState, useRef } from "react";
import { Camera, FileText, Upload, Sparkles, Loader2, Check, X, AlertCircle } from "lucide-react";

interface QuickStartProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (sections: { name: string; items: { name: string; description: string; price: number }[] }[]) => void;
}

type Step = 'choice' | 'upload' | 'processing' | 'review' | 'done';
type InputMethod = 'photo' | 'pdf' | 'text';

export function QuickStartModal({ isOpen, onClose, onImport }: QuickStartProps) {
  const [step, setStep] = useState<Step>('choice');
  const [method, setMethod] = useState<InputMethod>('photo');
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [extractedData, setExtractedData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target?.result as string);
        reader.readAsDataURL(selectedFile);
      }
      setStep('processing');
      simulateProcessing();
    }
  };

  const simulateProcessing = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Mock AI extraction
    const mockData = [
      {
        name: "Pizzas",
        items: [
          { name: "Pizza Margherita", description: "Molho de tomate, muçarela de búfala e manjericão fresco", price: 42.90 },
          { name: "Pizza Quatro Queijos", description: "Muçarela, gorgonzola, parmesão e provolone", price: 49.90 },
          { name: "Pizza Calabresa", description: "Calabresa fatiada, cebola e azeitonas", price: 39.90 },
        ]
      },
      {
        name: "Bebidas",
        items: [
          { name: "Suco Natural", description: "Laranja, limão ou maracujá - 500ml", price: 14.90 },
          { name: "Refrigerante", description: "Coca-Cola, Guaraná ou Sprite - lata", price: 8.90 },
        ]
      },
      {
        name: "Sobremesas",
        items: [
          { name: "Petit Gâteau", description: "Bolo quente de chocolate com sorvete", price: 32.90 },
          { name: "Cheesecake", description: "Cheesecake cremoso com calda de frutas", price: 28.90 },
        ]
      }
    ];

    setExtractedData(mockData);
    setStep('review');
  };

  const handleTextSubmit = async () => {
    if (!text.trim()) {
      setError("Cole o texto do seu cardápio");
      return;
    }
    setStep('processing');
    await simulateProcessing();
  };

  const handleConfirm = () => {
    onImport(extractedData);
    setStep('done');
    setTimeout(() => {
      onClose();
      setStep('choice');
      setFile(null);
      setPreview("");
      setText("");
      setExtractedData([]);
      setError("");
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setStep('choice');
    setFile(null);
    setPreview("");
    setText("");
    setExtractedData([]);
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F0F0F]">Quick Start com IA</h3>
              <p className="text-xs text-gray-500">Crie seu cardápio automaticamente</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Choose method */}
          {step === 'choice' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center mb-6">
                Como você quer criar seu cardápio?
              </p>

              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => { setMethod('photo'); setStep('upload'); }}
                  className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-2xl hover:bg-orange-50 hover:border-orange-200 border-2 border-transparent transition-all group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <Camera className="w-7 h-7 text-orange-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Tirar foto</span>
                  <span className="text-xs text-gray-400 text-center">Foto do cardápio físico</span>
                </button>

                <button
                  onClick={() => { setMethod('pdf'); setStep('upload'); }}
                  className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-2xl hover:bg-orange-50 hover:border-orange-200 border-2 border-transparent transition-all group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <FileText className="w-7 h-7 text-orange-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Upload PDF</span>
                  <span className="text-xs text-gray-400 text-center">PDF ou imagem</span>
                </button>

                <button
                  onClick={() => { setMethod('text'); setStep('upload'); }}
                  className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-2xl hover:bg-orange-50 hover:border-orange-200 border-2 border-transparent transition-all group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <Upload className="w-7 h-7 text-orange-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Colar texto</span>
                  <span className="text-xs text-gray-400 text-center">Texto do cardápio</span>
                </button>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-700">Como funciona?</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Nossa IA analisa seu cardápio e extrai automaticamente as seções, nomes dos itens, descrições e preços. 
                      Você pode revisar e editar antes de confirmar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Upload */}
          {step === 'upload' && (
            <div>
              {(method === 'photo' || method === 'pdf') ? (
                <div className="text-center">
                  <div 
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-12 hover:border-orange-300 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {preview ? (
                      <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-xl" />
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          {method === 'photo' ? (
                            <Camera className="w-8 h-8 text-orange-500" />
                          ) : (
                            <FileText className="w-8 h-8 text-orange-500" />
                          )}
                        </div>
                        <p className="font-medium text-[#0F0F0F] mb-1">
                          {method === 'photo' ? 'Tire uma foto do cardápio' : 'Arraste ou clique para enviar'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {method === 'photo' ? 'Ou escolha da galeria' : 'PDF, JPG ou PNG (máx. 10MB)'}
                        </p>
                      </>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={method === 'photo' ? 'image/*' : '.pdf,image/*'}
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {method === 'photo' && (
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  )}

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep('choice')}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      Voltar
                    </button>
                    {method === 'photo' && (
                      <button
                        onClick={() => cameraInputRef.current?.click()}
                        className="flex-1 bg-gradient-brand text-white py-3 rounded-xl font-medium hover:shadow-glow-orange transition-all"
                      >
                        Abrir câmera
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cole o texto do seu cardápio
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`Exemplo:
PIZZAS
Margherita - Molho de tomate, muçarela - R$ 42,90
Quatro Queijos - Muçarela, gorgonzola - R$ 49,90

BEBIDAS
Suco Natural - Laranja, limão - R$ 14,90
Refrigerante - Coca-Cola, Guaraná - R$ 8,90`}
                    rows={10}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none text-sm"
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setStep('choice')}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleTextSubmit}
                      disabled={!text.trim()}
                      className="flex-1 bg-gradient-brand text-white py-3 rounded-xl font-medium hover:shadow-glow-orange transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Processar com IA
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 'processing' && (
            <div className="text-center py-12">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping" />
                <div className="relative w-20 h-20 bg-gradient-brand rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">Processando seu cardápio...</h3>
              <p className="text-gray-500 text-sm">
                Nossa IA está analisando e extraindo as informações
              </p>
              <div className="mt-6 w-64 mx-auto bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-brand rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 'review' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0F0F0F]">Cardápio extraído!</h3>
                  <p className="text-xs text-gray-500">Revise e confirme antes de importar</p>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {extractedData.map((section, si) => (
                  <div key={si} className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-[#0F0F0F] mb-3">{section.name}</h4>
                    <div className="space-y-2">
                      {section.items.map((item: any, ii: number) => (
                        <div key={ii} className="flex items-center justify-between bg-white rounded-xl p-3">
                          <div>
                            <p className="font-medium text-sm text-[#0F0F0F]">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                          <span className="font-bold text-orange-500 text-sm">
                            R$ {item.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep('choice')}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-gradient-brand text-white py-3 rounded-xl font-semibold hover:shadow-glow-orange transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Confirmar e importar
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Done */}
          {step === 'done' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">Cardápio importado!</h3>
              <p className="text-gray-500">Seu cardápio foi criado com sucesso</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
