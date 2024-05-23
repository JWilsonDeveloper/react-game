import { Player } from "../lib/definitions";
import Image from "next/image";

interface PlayerStatsProps {
  player: Player;
}

export default function PlayerStats({ player }: PlayerStatsProps) {
    const defense : number = getDefense(player);
    const hpBoost : number = getHPBoost(player);
    const mpBoost : number = getMPBoost(player);

    function getDefense(player : Player){
        let result = 10 + player.speed + player.armor;
        for(let i=0; i < player.equipList.length; i++){
            const equip = player.equipList[i];
            if(equip.targetStat === "ARMOR"){
                result += equip.effect;
            }
        }
        return result;
    }

    function getHPBoost(player: Player){
        let result = 0;
        for(let i=0; i < player.equipList.length; i++){
            const equip = player.equipList[i];
            if(equip.targetStat === "HP"){
                result += equip.effect;
            }
        }
        return result;
    }

    function getMPBoost(player: Player){
        let result = 0;
        for(let i=0; i < player.equipList.length; i++){
            const equip = player.equipList[i];
            if(equip.targetStat === "MP"){
                result += equip.effect;
            }
        }
        return result;
    }

  return (
    <div className="flex w-full items-center gap-2 border border-black rounded-lg p-2">
      <div className="flex-shrink-0 flex w-1/2">
        <Image
          src={player.imgSrc}
          width={200}
          height={152}
          className="hidden md:block"
          alt="Player image"
        />
      </div>
      <div>
        <div className="ml-auto flex flex-col">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-1">{player.name}</h1>
          <div className="text-base md:text-lg lg:text-xl">HP: {player.currHP + hpBoost}/{player.totalHP + hpBoost}</div>
          <div className="text-sm md:text-base lg:text-lg mt-1">MP: {player.currMP + mpBoost}/{player.totalMP + mpBoost}</div>
        </div>
        <div className="justify-start flex flex-col items-start">
          <div className="grid grid-cols-2">
            <div className="lg:p-1 text-base lg:text-sm md:text-xs sm:text-xs text-xxs">STR: {player.strength}</div>
            <div className="lg:p-1 text-base lg:text-sm md:text-xs sm:text-xs text-xxs">SPD: {player.speed}</div>
            <div className="lg:p-1 text-base lg:text-sm md:text-xs sm:text-xs text-xxs">Armor: {player.armor}</div>
            <div className="lg:p-1 text-base lg:text-sm md:text-xs sm:text-xs text-xxs">Defense: {defense}</div>
            <div className="lg:p-1 text-base lg:text-sm md:text-xs sm:text-xs text-xxs">GP: {player.gp}</div>
            <div className="lg:p-1 text-base lg:text-sm md:text-xs sm:text-xs text-xxs">AP: {player.ap}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
