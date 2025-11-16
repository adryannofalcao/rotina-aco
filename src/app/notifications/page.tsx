"use client";

import { useState } from "react";
import { Heart, MessageCircle, Copy, Bell, Dumbbell, TrendingUp } from "lucide-react";
import BottomNav from "@/components/bottom-nav";

interface Notification {
  id: string;
  type: "like" | "comment" | "copy" | "reminder" | "achievement";
  userId?: string;
  userName?: string;
  userAvatar?: string;
  message: string;
  timestamp: number;
  read: boolean;
  actionUrl?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "like",
      userId: "user1",
      userName: "Carlos Silva",
      userAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop",
      message: "curtiu seu treino",
      timestamp: Date.now() - 1800000,
      read: false,
      actionUrl: "/community",
    },
    {
      id: "2",
      type: "copy",
      userId: "user2",
      userName: "Ana Costa",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      message: "copiou seu treino 'Treino A - Peito e Tríceps'",
      timestamp: Date.now() - 3600000,
      read: false,
      actionUrl: "/community",
    },
    {
      id: "3",
      type: "reminder",
      message: "Hora do treino! Você tem 'Treino B - Costas e Bíceps' agendado para hoje.",
      timestamp: Date.now() - 7200000,
      read: true,
      actionUrl: "/workouts",
    },
    {
      id: "4",
      type: "comment",
      userId: "user3",
      userName: "Pedro Oliveira",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      message: "comentou: 'Treino pesado! Parabéns pela evolução 💪'",
      timestamp: Date.now() - 10800000,
      read: true,
      actionUrl: "/community",
    },
    {
      id: "5",
      type: "achievement",
      message: "Parabéns! Você completou 7 dias consecutivos de treino! 🔥",
      timestamp: Date.now() - 14400000,
      read: true,
      actionUrl: "/profile",
    },
    {
      id: "6",
      type: "like",
      userId: "user4",
      userName: "Mariana Santos",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      message: "curtiu seu treino",
      timestamp: Date.now() - 18000000,
      read: true,
      actionUrl: "/community",
    },
  ]);

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d atrás`;
    if (hours > 0) return `${hours}h atrás`;
    if (minutes > 0) return `${minutes}min atrás`;
    return "Agora";
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500 fill-red-500" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-[#0066FF]" />;
      case "copy":
        return <Copy className="w-5 h-5 text-[#00FF88]" />;
      case "reminder":
        return <Bell className="w-5 h-5 text-[#FFA500]" />;
      case "achievement":
        return <TrendingUp className="w-5 h-5 text-[#FFD700]" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#2A2A2A] z-40 px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Notificações</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-400">{unreadCount} não lidas</p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-[#00FF88] hover:text-[#00CC6A] font-medium"
              >
                Marcar todas como lidas
              </button>
            )}
          </div>
        </div>

        {/* Lista de Notificações */}
        <div className="divide-y divide-[#2A2A2A]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`p-4 hover:bg-[#1A1A1A]/50 transition-all cursor-pointer ${
                !notification.read ? "bg-[#00FF88]/5" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar ou Ícone */}
                {notification.userAvatar ? (
                  <div className="relative">
                    <img
                      src={notification.userAvatar}
                      alt={notification.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#0A0A0A] rounded-full p-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                    {getNotificationIcon(notification.type)}
                  </div>
                )}

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed">
                    {notification.userName && (
                      <span className="font-bold">{notification.userName} </span>
                    )}
                    <span className={notification.read ? "text-gray-400" : "text-white"}>
                      {notification.message}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimeAgo(notification.timestamp)}
                  </p>
                </div>

                {/* Indicador de não lida */}
                {!notification.read && (
                  <div className="w-2 h-2 bg-[#00FF88] rounded-full mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nenhuma notificação</h3>
            <p className="text-gray-400">
              Você está em dia! Quando houver novidades, elas aparecerão aqui.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
