"use client";

import { usePathname } from "next/navigation";
import { SupportChat } from "./SupportChat";

export function ClientChatWrapper() {
  const pathname = usePathname();
  
  const showChat = pathname?.startsWith('/dashboard') || 
                   pathname?.startsWith('/admin') || 
                   pathname?.startsWith('/editar');
  
  if (!showChat) {
    return null;
  }
  
  return <SupportChat />;
}
