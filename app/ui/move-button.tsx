import { Entity, Player, Move, Action, Item, EffectRoll } from "@/app/lib/definitions";
import {Button} from "@/app/ui/button";
import { get } from "http";

interface MoveButtonProps {
  player : Player;
  move : Move;
  moveClicked : Function;
  className? : string;
  showCost : boolean;
  showContentBelow? : boolean;
}

export default function MoveButton({ move, moveClicked, player, className, showCost, showContentBelow} : MoveButtonProps) {
  const tieredClass = className ? className + " " + getClass(move) : getClass(move); 

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
  function getUses(move : Move){
    if(move.type === 'ITEM'){
      const item : Item = move as Item;
      return item.uses;
    }
  }
  function getClass(move : Move){
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
    <div className="flex flex-wrap items-center justify-center gap-1 border border-black rounded-lg p-2 min-w-[90px] bg-white text-xs">
      <Button onClick={() => moveClicked(move)} buttonText={move.name} className={"h-[50px] w-[90px] " + tieredClass} />
      <div className="flex flex-cols-2 gap-1 min-w-[70px]">
        <div className="flex flex-cols-2 gap-1">
          <div className="text-right">
            {move.type !== 'ITEM' ? <div>Success:</div> : ""}
            <div>Effect:</div>
            {move.type === 'ITEM' ? <div>Uses:</div> : ""}
            {showCost ? <div>Cost:</div> : ""}
            {move.mpCost > 0 ? <div>MP Cost:</div> : ""}
          </div>
          <div className="text-left">
            {move.type !== 'ITEM' ? <div>{"+" + getAttackBonus(move, player)}</div> : ""}
            <div>{calculateEffect(move, player) != null ? calculateEffect(move, player) : "N/A"}</div>
            {move.type === 'ITEM' ? <div>{getUses(move)}</div> : ""}
            {move.mpCost > 0 ? <div>{move.mpCost}</div> : ""}
            <div>
              {showCost ? move.cost : ""}
              {showCost && move.type === 'ITEM' ? " GP" : ""}
              {showCost && (move.type === 'ACTION' || move.type === 'FLEE') ? " AP" : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}