import { Entity } from "../lib/definitions";
import Image from "next/image";

interface EnemyStatsProps {
  enemy: Entity;
}

export default function EnemyStats({ enemy }: EnemyStatsProps) {
  return (
    <div className="flex w-full items-center gap-2 border border-black rounded-lg p-2">
      <div className="flex-shrink-0 flex w-1/2">
        <Image
          src={enemy.imgSrc}
          width={200}
          height={152}
          className="hidden md:block"
          alt="Enemy image"
        />
      </div>
      <div>
        <div className="ml-auto flex flex-col">
          <h1 className="lg:p-1 text-xl lg:text-xl md:text-lg sm:text-base text-sm font-bold">
            {enemy.name}
          </h1>
          <div className="lg:p-1 text-xl lg:text-lg md:text-base sm:text-sm text-xs">
            HP: {enemy.currHP}/{enemy.totalHP}
          </div>
        </div>
        <div className="justify-start flex flex-col items-start">
          <div className="grid grid-cols-2">
            <div className="lg:p-1 text-base lg:text-sm md:text-xs sm:text-xs text-xxs">
              STR: {enemy.strength}
            </div>
            <div className="lg:p-1 text-base lg:text-sm md:text-xs sm:text-xs text-xxs">
              SPD: {enemy.speed}
            </div>
            <div className="lg:p-1 text-base lg:text-sm md:text-xs sm:text-xs text-xxs">
              Armor: {enemy.armor}
            </div>
            <div className="lg:p-1 text-base lg:text-sm md:text-xs sm:text-xs text-xxs">
              Defense: {10 + enemy.speed + enemy.armor}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
