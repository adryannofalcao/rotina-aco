"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Dumbbell, Users, User, Bell } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Dumbbell, label: "Treino", path: "/workouts" },
    { icon: Users, label: "Comunidade", path: "/community" },
    { icon: Bell, label: "Notificações", path: "/notifications" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#2A2A2A] z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? "text-[#00FF88]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "fill-[#00FF88]" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
