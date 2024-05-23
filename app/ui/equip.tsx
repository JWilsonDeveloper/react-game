import { Entity, Player, Move, Action, Item, EffectRoll } from "@/app/lib/definitions";
import {Button} from "@/app/ui/button";
import { get } from "http";
import { Equipment } from "@/app/lib/definitions";


interface EquipProps {
  player : Player;
  equipment : Equipment;
  className? : string;
  showCost : boolean;
  showContentBelow? : boolean;
  equipClicked : Function;
}

export default function Equip({ equipment, player, className, showCost, showContentBelow, equipClicked} : EquipProps) {
  const tieredClass = className ? className + " " + getClass(equipment) : getClass(equipment); 

  function getAttackBonus(attack : Move, entity : Entity){
    let bonus = 0;
    if(attack.successBonus){
        bonus += attack.successBonus;
    }
    if(attack.skillBonus){
        if(attack.skillBonus.type === "SUCCESS"){
            bonus += attack.skillBonus.skill === "SPEED" ? attack.skillBonus.multiplier * entity.speed : attack.skillBonus.multiplier * entity.strength;
        }
    }
    return bonus;
  }
  function getEffectBonus(action : Action, entity : Entity){
    let bonus = 0;
    bonus += action.effectBonus;
    if(action.skillBonus){
        if(action.skillBonus.type === "EFFECT"){
            bonus += action.skillBonus.skill === "STRENGTH" ? action.skillBonus.multiplier * entity.strength : action.skillBonus.multiplier * entity.speed;
        }
    }
    return bonus;
}
  function calculateEffect(move : Move, player : Entity) {
    if(move.type !== 'FLEE'){
      const action: Action = move as Action;
      const bonus = getEffectBonus(action, player);
      const minEffect = action.effectRoll.quantity * action.effectRoll.rangeMin + bonus;
      const maxEffect = action.effectRoll.quantity * action.effectRoll.rangeMax + bonus;
      return `${minEffect}-${maxEffect}`;
    }
  }
  function getClass(move : Move | Equipment){
    let buttonClass = "";
    switch (move.tier) {
        case 0:
            buttonClass = "bg-green-500";
            break;
        case 1:
            buttonClass = "bg-blue-500";
            break;
        case 2:
            buttonClass = "bg-indigo-500";
            break;
        case 3:
            buttonClass = "bg-violet-500";
            break;
        case 4:
            buttonClass = "bg-black";
            break;
        default:
            buttonClass = "bg-gray-500"; // Default class if tier is not recognized
            break;
    }
    return buttonClass;
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 border border-black rounded-lg p-2 min-w-[90px] bg-white text-xs">
      <div className={"rounded-lg font-medium"}>
        <Button onClick={() => equipClicked(equipment)} buttonText={equipment.name} className={"h-14 w-[80px] " + tieredClass} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-cols-2 gap-1 text-nowrap">
          <div className="text-right">
            Effect:
            {showCost ? <div>Cost:</div> : ""}
          </div>
          <div className="text-left">
            {"+" + equipment.effect + " " + equipment.targetStat}<br />
            {showCost ? equipment.cost + " GP" : ""}
          </div>
        </div>
      </div>
    </div>
  );
  
}