import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">Desenvolvido por</span>
          <Image src="/logo-nexor.png" alt="Nexor" width={80} height={24} />
        </div>
        <p className="text-gray-500 text-sm">
          © 2026 CardUp by Nexor. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
