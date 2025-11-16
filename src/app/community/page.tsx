"use client";

import { useState } from "react";
import { Heart, MessageCircle, Copy, MoreVertical, TrendingUp, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/bottom-nav";

interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  workoutName: string;
  photo: string;
  caption: string;
  duration: number;
  volume: number;
  exercises: number;
  likes: number;
  comments: number;
  copies: number;
  liked: boolean;
  timestamp: number;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      userId: "user1",
      userName: "Carlos Silva",
      userAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop",
      workoutName: "Treino A - Peito e Tríceps",
      photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop",
      caption: "Treino pesado hoje! 💪 Focando em hipertrofia e sentindo a evolução.",
      duration: 3600,
      volume: 4500,
      exercises: 5,
      likes: 24,
      comments: 8,
      copies: 3,
      liked: false,
      timestamp: Date.now() - 3600000,
    },
    {
      id: "2",
      userId: "user2",
      userName: "Ana Costa",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      workoutName: "Treino C - Pernas",
      photo: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&h=800&fit=crop",
      caption: "Leg day é o melhor dia! 🔥 Agachamento livre batendo 100kg hoje.",
      duration: 4200,
      volume: 6200,
      exercises: 6,
      likes: 42,
      comments: 12,
      copies: 7,
      liked: true,
      timestamp: Date.now() - 7200000,
    },
    {
      id: "3",
      userId: "user3",
      userName: "Pedro Oliveira",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      workoutName: "Treino B - Costas e Bíceps",
      photo: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=800&fit=crop",
      caption: "Costas crescendo! Barra fixa com 20kg adicionais. Vamos que vamos! 💪",
      duration: 3300,
      volume: 3800,
      exercises: 5,
      likes: 31,
      comments: 6,
      copies: 5,
      liked: false,
      timestamp: Date.now() - 10800000,
    },
  ]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hrs > 0 ? `${hrs}h ${mins}min` : `${mins}min`;
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d atrás`;
    if (hours > 0) return `${hours}h atrás`;
    return "Agora";
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleCopyWorkout = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      // SEM LIMITE - usuário pode copiar quantos treinos quiser
      setPosts(posts.map(p => 
        p.id === postId ? { ...p, copies: p.copies + 1 } : p
      ));
      alert(`✓ Treino "${post.workoutName}" copiado para seus treinos!\n\nVocê pode copiar quantos treinos quiser da comunidade! 🎉`);
    }
  };

  const handleComment = (postId: string) => {
    alert("Funcionalidade de comentários em desenvolvimento!");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#2A2A2A] z-40 px-4 py-4">
          <h1 className="text-xl sm:text-2xl font-bold">Comunidade</h1>
          <p className="text-xs sm:text-sm text-gray-400">Descubra treinos e inspire-se</p>
        </div>

        {/* Feed */}
        <div className="divide-y divide-[#2A2A2A]">
          {posts.map((post) => (
            <div key={post.id} className="p-4">
              {/* Header do Post */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={post.userAvatar}
                    alt={post.userName}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#00FF88]"
                  />
                  <div>
                    <p className="font-bold text-sm sm:text-base">{post.userName}</p>
                    <p className="text-xs text-gray-400">{formatTimeAgo(post.timestamp)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
                  <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              {/* Foto do Post */}
              <div className="relative mb-3 rounded-xl overflow-hidden">
                <img
                  src={post.photo}
                  alt="Post workout"
                  className="w-full aspect-square object-cover"
                />
                {/* Overlay com Info do Treino */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                  <p className="font-bold text-base sm:text-lg mb-2">{post.workoutName}</p>
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{formatTime(post.duration)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{post.volume}kg</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{post.exercises} exercícios</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ações - BOTÕES MAIORES E MAIS VISÍVEIS */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={`gap-2 h-10 sm:h-12 px-3 sm:px-4 ${post.liked ? "text-red-500" : "text-white"} hover:bg-[#1A1A1A]`}
                >
                  <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${post.liked ? "fill-red-500" : ""}`} />
                  <span className="text-sm sm:text-base font-semibold">{post.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleComment(post.id)}
                  className="gap-2 h-10 sm:h-12 px-3 sm:px-4 text-white hover:bg-[#1A1A1A]"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm sm:text-base font-semibold">{post.comments}</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleCopyWorkout(post.id)}
                  className="gap-2 ml-auto bg-gradient-to-r from-[#00FF88] to-[#00CC6A] hover:opacity-90 text-black font-bold h-10 sm:h-12 px-4 sm:px-6 shadow-lg shadow-[#00FF88]/20"
                >
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Copiar ({post.copies})</span>
                </Button>
              </div>

              {/* Legenda */}
              <div className="text-sm sm:text-base">
                <span className="font-bold mr-2">{post.userName}</span>
                <span className="text-gray-300">{post.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nenhum post ainda</h3>
            <p className="text-gray-400">
              Complete um treino e compartilhe com a comunidade!
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
