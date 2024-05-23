import { Entity } from '@/app/lib/definitions';
import React from 'react';
import { useEffect } from 'react';

interface XPBarProps {
  player: Entity;
  getNextLevelXP : Function;
  getEarnedLevel: Function;
}



export default function XPBar({player, getNextLevelXP, getEarnedLevel} : XPBarProps) {
    const nextLevelXP = getNextLevelXP(player.xp);
    const percentXP = (player.xp / nextLevelXP) * 100;
    const earnedLevel = getEarnedLevel(player.xp);

    return (
        <div className="border border-black rounded-lg p-2 w-full">
            <h1 className="text-lg font-bold mb-4 text-center">Level {earnedLevel}</h1>
            <div className="grid grid-cols-2 gap-4">
                <h1 className="text-lg font-bold mb-4 text-left">{player.xp} XP</h1>
                <h1 className="text-lg font-bold mb-4 text-right">Next Level: {nextLevelXP} XP</h1>
            </div>
            <div className="h-5 w-full bg-gray-300 border border-black rounded-l">
                <div className={`h-full bg-blue-500 rounded-l`} style={{ width: `${percentXP}%` }} />
            </div>
        </div>
    );
};