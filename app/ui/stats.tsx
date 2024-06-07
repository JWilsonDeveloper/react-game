import { Entity } from "../lib/definitions";
import Image from "next/image";

interface StatsProps {
    player: Entity;
    enemy: Entity;
  }
  
  export default function Stats({player, enemy} : StatsProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
                <Image
                    src={player.imgSrc}
                    width={200}
                    height={152}
                    className="hidden md:block"
                    alt="Screenshots of the dashboard project showing desktop version"
                />
                <h1 className="text-2xl font-bold mb-4">{player.name}</h1>
                <div className="grid grid-cols-2 gap-4">
                <div className="p-2 border border-gray-200">Level: {player.level}</div>
                <div className="p-2 border border-gray-200">HP: {player.currHP}/{player.totalHP}</div>
                <div className="p-2 border border-gray-200">XP: {player.xp}</div>
                <div className="p-2 border border-gray-200">MP: {player.currMP}/{player.totalMP}</div>
                <div className="p-2 border border-gray-200">Armor: {player.armor}</div>
                <div className="p-2 border border-gray-200">Speed: {player.spd}</div>
            </div>
            </div>
            <div className="flex flex-col items-center">
                <Image
                    src={enemy.imgSrc}
                    width={200}
                    height={152}
                    className="hidden md:block"
                    alt="Screenshots of the dashboard project showing desktop version"
                />
                <h1 className="text-2xl font-bold mb-4">{enemy.name}</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-2 border border-gray-200">Level: {enemy.level}</div>
                    <div className="p-2 border border-gray-200">HP: {enemy.currHP}/{enemy.totalHP}</div>
                </div>
            </div>
        </div>
    )
  }