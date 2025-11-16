"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Flame, TrendingUp, Award } from "lucide-react";
import { getWorkoutStreak } from "@/lib/storage/workout-storage";

interface WorkoutCalendarProps {
  workoutDates?: number[]; // timestamps dos dias treinados
}

export default function WorkoutCalendar({ workoutDates = [] }: WorkoutCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const streak = getWorkoutStreak();

  // Usar dados do storage se não fornecidos
  const dates = workoutDates.length > 0 ? workoutDates : streak.workoutDates;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const isWorkoutDay = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    date.setHours(0, 0, 0, 0);
    return dates.includes(date.getTime());
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1));
  };

  const days = [];
  
  // Dias vazios antes do primeiro dia do mês
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  // Dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    const isWorkout = isWorkoutDay(day);
    const isTodayDate = isToday(day);

    days.push(
      <div
        key={day}
        className={`aspect-square flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
          isWorkout
            ? "bg-[#00FF88] text-black"
            : isTodayDate
            ? "bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]"
            : "text-gray-400 hover:bg-[#2A2A2A]"
        }`}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
      {/* Header com Estatísticas */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00FF88]/10 rounded-lg">
            <CalendarIcon className="w-6 h-6 text-[#00FF88]" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Calendário de Treinos</h3>
            <p className="text-sm text-gray-400">Acompanhe sua consistência</p>
          </div>
        </div>
      </div>

      {/* Estatísticas de Streak */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0A0A0A] rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-[#FF6B6B]" />
            <p className="text-2xl font-bold text-[#FF6B6B]">{streak.currentStreak}</p>
          </div>
          <p className="text-xs text-gray-400">Dias Seguidos</p>
        </div>
        <div className="bg-[#0A0A0A] rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-5 h-5 text-[#00FF88]" />
            <p className="text-2xl font-bold text-[#00FF88]">{streak.longestStreak}</p>
          </div>
          <p className="text-xs text-gray-400">Melhor Streak</p>
        </div>
        <div className="bg-[#0A0A0A] rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#0066FF]" />
            <p className="text-2xl font-bold text-[#0066FF]">{streak.totalWorkouts}</p>
          </div>
          <p className="text-xs text-gray-400">Total Treinos</p>
        </div>
      </div>

      {/* Navegação do Calendário */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h4 className="text-lg font-bold">
          {monthNames[month]} {year}
        </h4>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dias da Semana */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dias do Mês */}
      <div className="grid grid-cols-7 gap-2">{days}</div>

      {/* Legenda */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#00FF88]" />
          <span className="text-xs text-gray-400">Treino realizado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border border-[#0066FF] bg-[#0066FF]/20" />
          <span className="text-xs text-gray-400">Hoje</span>
        </div>
      </div>
    </div>
  );
}
