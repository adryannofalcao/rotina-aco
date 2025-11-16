"use client";

import { useState, useEffect } from "react";
import { Timer, X, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RestTimerProps {
  defaultTime?: number; // segundos
  onComplete?: () => void;
  autoStart?: boolean;
}

export default function RestTimer({ 
  defaultTime = 90, 
  onComplete,
  autoStart = false 
}: RestTimerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState(defaultTime);

  useEffect(() => {
    if (autoStart && !isOpen) {
      startTimer(defaultTime);
    }
  }, [autoStart, defaultTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playSound();
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const playSound = () => {
    // Tocar som de notificação (navegadores modernos)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Descanso finalizado!', {
        body: 'Hora de começar a próxima série!',
        icon: '/icon.svg'
      });
    }
    
    // Vibrar (mobile)
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const startTimer = (seconds: number) => {
    setSelectedTime(seconds);
    setTimeLeft(seconds);
    setIsRunning(true);
    setIsOpen(true);
    
    // Solicitar permissão para notificações
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(selectedTime);
    setIsRunning(false);
  };

  const closeTimer = () => {
    setIsOpen(false);
    setIsRunning(false);
    setTimeLeft(selectedTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((selectedTime - timeLeft) / selectedTime) * 100;

  const presetTimes = [30, 60, 90, 120, 180];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-[#0066FF] hover:bg-[#0055DD] shadow-2xl"
        >
          <Timer className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="bg-[#1A1A1A] border-2 border-[#2A2A2A] rounded-2xl shadow-2xl p-6 w-80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-[#0066FF]" />
            <h3 className="font-bold">Timer de Descanso</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeTimer}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Timer Display */}
        <div className="relative mb-6">
          <div className="relative w-48 h-48 mx-auto">
            {/* Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#2A2A2A"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#0066FF"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#0066FF] font-mono">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {isRunning ? "Descansando..." : "Pausado"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 mb-4">
          <Button
            onClick={toggleTimer}
            className="flex-1 bg-[#0066FF] hover:bg-[#0055DD]"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pausar
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Iniciar
              </>
            )}
          </Button>
          <Button
            onClick={resetTimer}
            variant="outline"
            className="border-[#2A2A2A]"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Preset Times */}
        <div className="space-y-2">
          <p className="text-xs text-gray-400 uppercase font-semibold">Tempos Rápidos</p>
          <div className="grid grid-cols-5 gap-2">
            {presetTimes.map((time) => (
              <button
                key={time}
                onClick={() => startTimer(time)}
                className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedTime === time
                    ? "bg-[#0066FF] text-white"
                    : "bg-[#0A0A0A] text-gray-400 hover:bg-[#2A2A2A]"
                }`}
              >
                {time < 60 ? `${time}s` : `${time / 60}m`}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        {timeLeft === 0 && (
          <div className="mt-4 p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg text-center">
            <p className="text-sm font-semibold text-[#00FF88]">
              ✓ Descanso finalizado! Próxima série!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
