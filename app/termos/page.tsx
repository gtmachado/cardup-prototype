import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-[#0F0F0F]">Termos de Uso</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-card p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-[#0F0F0F] mb-6">Termos de Uso do CardUp</h2>
          <p className="text-sm text-gray-500 mb-8">Última atualização: 08 de Abril de 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
            <p>
              Bem-vindo ao CardUp! Estes Termos de Uso (&ldquo;Termos&rdquo;) regem o uso da plataforma CardUp 
              (&ldquo;Serviço&rdquo;) oferecida pela Nexor (&ldquo;Empresa&rdquo;, &ldquo;nós&rdquo; ou &ldquo;nosso&rdquo;).
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">1. Aceitação dos Termos</h3>
            <p>
              Ao acessar ou usar o CardUp, você concorda em cumprir estes Termos. Se você não concordar 
              com qualquer parte destes termos, não poderá acessar ou usar o serviço.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">2. Descrição do Serviço</h3>
            <p>
              O CardUp é uma plataforma de cardápios digitais que permite restaurantes, bares e lanchonetes 
              criar e gerenciar cardápios online, gerar QR Codes e oferecer uma experiência digital aos clientes.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">3. Conta do Usuário</h3>
            <p>
              Para usar o CardUp, você deve criar uma conta com informações precisas e completas. 
              Você é responsável por manter a confidencialidade da sua conta e senha.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">4. Planos e Pagamentos</h3>
            <p>
              Oferecemos planos gratuitos e pagos. Os planos pagos são cobrados mensalmente ou anualmente, 
              conforme seleccionado. Você pode cancelar sua assinatura a qualquer momento.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">5. Uso Aceitável</h3>
            <p>
              Você concorda em não usar o CardUp para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Conteúdo ilegal ou não autorizado</li>
              <li>Violação de direitos de terceiros</li>
              <li>Atividades fraudulentas</li>
              <li>Interferência com o funcionamento do serviço</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">6. Propriedade Intelectual</h3>
            <p>
              Todo o conteúdo, design e código do CardUp são propriedade da Nexor. Você mantém 
              propriedade sobre o conteúdo do seu cardápio.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">7. Limitação de Responsabilidade</h3>
            <p>
              O CardUp é fornecido &ldquo;como está&rdquo;. Não garantimos que o serviço estará sempre 
              disponível ou livre de erros.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">8. Alterações dos Termos</h3>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              Notificaremos sobre alterações significativas através do serviço.
            </p>

            <h3 className="text-lg font-semibold text-[#0F0F0F]">9. Contato</h3>
            <p>
              Para questões sobre estes Termos, entre em contato pelo email:{' '}
              <a href="mailto:contato@cardup.com.br" className="text-orange-500 hover:underline">
                contato@cardup.com.br
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
