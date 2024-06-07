import { Entity } from '@/app/lib/definitions';
import React from 'react';

interface XPBarProps {
  player: Entity;
  getEarnedLevel: Function;
}

export default function XPBar({ player, getEarnedLevel }: XPBarProps) {
  const nextLevelXP = getNextLevelXP(player.xp);
  const percentXP = (player.xp / nextLevelXP) * 100;
  const earnedLevel = getEarnedLevel(player.xp);

  function getNextLevelXP(currentXP: number) {
    if (currentXP < 15) {
      return 15;
    } else if (currentXP < 80) {
      return 80;
    } else if (currentXP < 200) {
      return 200;
    } else {
      return 600;
    }
  }

  return (
    <div className="bg-white border border-black rounded-lg p-2 w-full sm:p-4">
      <h1 className="text-base lg:text-lg font-bold sm:mb-4 text-center">Level {earnedLevel}</h1>
      <div className="flex justify-between mb-2">
        <div>
            <h1 className="text-xs lg:text-lg font-bold text-center">Current:</h1>
            <h1 className="text-xs lg:text-lg font-bold text-center">{player.xp}XP</h1>
        </div>
        <div>
            <h1 className="text-xs lg:text-lg font-bold text-center">Next Level:</h1>
            <h1 className="text-xs lg:text-lg font-bold text-center">{nextLevelXP} XP</h1>
        </div>
      </div>
      <div className="h-4 sm:h-5 w-full bg-gray-300 border border-black rounded-l">
        <div className="h-full bg-blue-500 rounded-l" style={{ width: `${percentXP}%` }} />
      </div>
    </div>
  );
}
