import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-cardup.png" alt="CardUp" width={120} height={40} />
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/login" className="text-gray-600 hover:text-orange-500 transition">
            Login
          </Link>
          <Link
            href="/login"
            className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
          >
            Criar Cardápio
          </Link>
        </nav>
      </div>
    </header>
  );
}
