import { Entity, Player, Action, EffectRoll } from "@/app/lib/definitions";
import {Button} from "@/app/ui/button";
import { get } from "http";
import { Equipment } from "@/app/lib/definitions";


interface EquipProps {
  equipment : Equipment;
  className? : string;
  showCost : boolean;
  equipClicked : Function;
}

export default function Equip({ equipment, className, showCost, equipClicked} : EquipProps) {
  //const tieredClass = className ? className + " " + getClass(equipment) : getClass(equipment); 

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 border border-black rounded-lg p-2 min-w-[90px] bg-white text-xs">
      <div className={"rounded-lg font-medium"}>
        <Button onClick={() => equipClicked(equipment)} buttonText={equipment.name} className={"h-14 w-[80px]"} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-cols-2 gap-1 text-nowrap">
          <div className="text-right">
            Effect:
            {showCost ? <div>Cost:</div> : ""}
          </div>
          <div className="text-left">
            {"+" + equipment.effect + " " + equipment.stat}<br />
            {showCost ? equipment.cost + " GP" : ""}
          </div>
        </div>
      </div>
    </div>
  );
  
}