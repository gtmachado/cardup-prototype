import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-[#0F0F0F]">Política de Privacidade</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-card p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-6">Política de Privacidade do CardUp</h2>
          <p className="text-sm text-gray-500 mb-8">Última atualização: 08 de Abril de 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
            <p>
              A Nexor (&ldquo;Empresa&rdquo;, &ldquo;nós&rdquo;, &ldquo;nosso&rdquo;) opera o CardUp. 
              Esta Política de Privacidade informa como coletamos, usamos e protegemos suas informações.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">1. Informações que Coletamos</h3>
            <p>Coletamos as seguintes informações:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Dados de conta:</strong> nome, email, senha (criptografada)</li>
              <li><strong>Dados do estabelecimento:</strong> nome do restaurante, logo, banner</li>
              <li><strong>Conteúdo do cardápio:</strong> seções, itens, preços, descrições</li>
              <li><strong>Dados de uso:</strong> páginas visitadas, tempo de uso</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">2. Como Usamos suas Informações</h3>
            <p>Usamos suas informações para:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fornecer e manter o serviço</li>
              <li>Personalizar sua experiência</li>
              <li>Comunicar sobre sua conta</li>
              <li>Melhorar nossos serviços</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">3. Armazenamento e Segurança</h3>
            <p>
              Suas informações são armazenadas de forma segura. Implementamos medidas técnicas e 
              organizacionais para proteger seus dados contra acesso não autorizado, alteração ou destruição.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">4. Compartilhamento de Dados</h3>
            <p>
              Não vendemos suas informações pessoais. Compartilhamos dados apenas quando necessário para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fornecer o serviço (ex: processamento de pagamento)</li>
              <li>Cumprir requisitos legais</li>
              <li>Proteger nossos direitos</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">5. Seus Direitos</h3>
            <p>Você tem direito a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir informações incorretas</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Exportar seus dados</li>
              <li>Revogar consentimento</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">6. Cookies</h3>
            <p>
              Usamos cookies para lembrar suas preferências e melhorar sua experiência. Você pode 
              configurar seu navegador para recusar cookies.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">7. Retenção de Dados</h3>
            <p>
              Mantemos seus dados enquanto sua conta estiver ativa ou enquanto necessário para 
              fornecer serviços. Você pode solicitar a exclusão a qualquer momento.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">8. Crianças</h3>
            <p>
              O CardUp não é direcionado a menores de 18 anos. Não coletamos intencionalmente 
              informações de crianças.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">9. Alterações</h3>
            <p>
              Podemos atualizar esta política periodicamente. Notificaremos sobre alterações significativas.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">10. Contato</h3>
            <p>
              Para questões sobre esta Política de Privacidade, entre em contato pelo email:{' '}
              <a href="mailto:privacidade@cardup.com.br" className="text-orange-500 hover:underline">
                privacidade@cardup.com.br
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
