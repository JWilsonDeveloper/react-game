import { useEffect, useRef, useState } from "react";
import { Player, Entity } from "../lib/definitions";
import Image from "next/image";

interface PlayerStatsProps {
  entity: Entity;
}

export default function PlayerStats({ entity }: PlayerStatsProps) {
  const [isStacked, setIsStacked] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  let defense = 10 + entity.speed + entity.armor;
  let hpBoost = 0;
  let mpBoost = 0;
  if((entity as Player).equipList !== undefined){
    const playerCast = entity as Player;
    defense= getDefense(playerCast);
    hpBoost= getHPBoost(playerCast);
    mpBoost= getMPBoost(playerCast);
  }
  

  function getDefense(player: Player) {
    let result = 10 + player.speed + player.armor;
    for (let i = 0; i < player.equipList.length; i++) {
      const equip = player.equipList[i];
      if (equip.targetStat === "ARMOR") {
        result += equip.effect;
      }
    }
    return result;
  }

  function getHPBoost(player: Player) {
    let result = 0;
    for (let i = 0; i < player.equipList.length; i++) {
      const equip = player.equipList[i];
      if (equip.targetStat === "HP") {
        result += equip.effect;
      }
    }
    return result;
  }

  function getMPBoost(player: Player) {
    let result = 0;
    for (let i = 0; i < player.equipList.length; i++) {
      const equip = player.equipList[i];
      if (equip.targetStat === "MP") {
        result += equip.effect;
      }
    }
    return result;
  }

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        if(isStacked && imageRef.current.clientWidth >= 150){
          setIsStacked(false)
        }
        else if(!isStacked && imageRef.current.clientWidth < 150){
          setIsStacked(true); // Adjust this value based on your needs
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`grid w-full gap-2 border border-black rounded-lg p-2 ${isStacked ? "grid-cols-1" : "grid-cols-2"}`}>
      <div className="flex items-center justify-center">
        <Image
          ref={imageRef}
          src={entity.imgSrc}
          width={100}
          height={76}
          className="w-full h-auto max-w-[150px]" // Make the image responsive
          alt="Player image"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-1">{entity.name}</h1>
          <div className="text-base md:text-lg lg:text-xl">HP: {entity.currHP + hpBoost}/{entity.totalHP + hpBoost}</div>
          <div className="text-sm md:text-base lg:text-lg mt-1">MP: {entity.currMP + mpBoost}/{entity.totalMP + mpBoost}</div>
        </div>
        <div className="justify-center flex flex-col items-center">
          <div className="grid grid-cols-2">
            <div className="lg:p-1 text-base lg:text-sm text-xs">STR: {entity.strength}</div>
            <div className="lg:p-1 text-base lg:text-sm text-xs">SPD: {entity.speed}</div>
            <div className="lg:p-1 text-base lg:text-sm text-xs">Armor: {entity.armor}</div>
            <div className="lg:p-1 text-base lg:text-sm text-xs">Defense: {defense}</div>
            <div className="lg:p-1 text-base lg:text-sm text-xs">GP: {entity.gp}</div>
            {/*<div className="lg:p-1 text-base lg:text-sm text-xs">AP: {entity.ap}</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
