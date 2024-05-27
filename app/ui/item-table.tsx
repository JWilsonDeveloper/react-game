import React from 'react';
import { Action, Move, Item, Entity } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';

function getSuccessBonus(move: Move, entity: Entity) {
    let bonus = 0;
    if (move.successBonus) {
      bonus += move.successBonus;
    }
    if (move.skillBonus) {
      if (move.skillBonus.type === "SUCCESS") {
        bonus += move.skillBonus.skill === "SPEED" ? move.skillBonus.multiplier * entity.speed : move.skillBonus.multiplier * entity.strength;
      }
    }
    return bonus;
  }
function getEffectBonus(action: Action, entity: Entity) {
  let bonus = 0;
  bonus += action.effectBonus;
  if (action.skillBonus) {
    if (action.skillBonus.type === "EFFECT") {
      bonus += action.skillBonus.skill === "STRENGTH" ? action.skillBonus.multiplier * entity.strength : action.skillBonus.multiplier * entity.speed;
    }
  }
  return bonus;
}
function calculateEffect(move: Move, player: Entity) {
  if (move.type !== 'FLEE') {
    const action: Action = move as Action;
    const bonus = getEffectBonus(action, player);
    const minEffect = action.effectRoll.quantity * action.effectRoll.rangeMin + bonus;
    const maxEffect = action.effectRoll.quantity * action.effectRoll.rangeMax + bonus;
    return `${minEffect}-${maxEffect}`;
  }
  return '';
}

interface ItemTableProps {
  items: Item[];
  itemClicked: Function;
  entity: Entity;
  getTier: Function;
  showCost: boolean;
  hideUseless?: boolean;
}

export default function ItemTable({ items, itemClicked, entity, getTier, showCost, hideUseless }: ItemTableProps) {
  const filteredItems = hideUseless ? items.filter(item => item.uses > 0) : items;

  return (
    <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-2 border-black bg-white">
            <React.Fragment>
                <thead>
                    <tr>
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Type</th>
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Action</th>
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Uses</th>
                        {showCost && <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Cost</th>}
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Success Bonus</th>
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>MP Cost</th>
                    </tr>
                    <tr className="border border-b-2 border-black">
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Effect</th>
                    </tr>
                </thead>
            </React.Fragment>
            <tbody>
                {filteredItems.map((item, index) => (
                     <React.Fragment key={index}>
                        <tr className={getTier(item)}>
                            <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>{item.type}</td>
                            <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>
                            <Button
                                onClick={() => itemClicked(item)}
                                className="w-full bg-blue-500 text-white rounded text-xs md:text-sm"
                                buttonText={item.name}
                            />
                            </td>
                            {showCost && (
                                <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>
                                    {item.cost + " GP"}
                                </td>
                            )}
                            <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>{item.uses}</td>
                            <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                                {item.target === "OTHER" ? "+" + item.successBonus : "-"}
                            </td>
                            <td className="border border-gray-200 sm:p-2 text-xs md:text-sm rowSpan={2}" rowSpan={2}>
                                {item.mpCost} MP
                            </td>
                        </tr>
                        <tr className={getTier(item) + " border border-b-2 border-black"}>
                            <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                                {calculateEffect(item, entity) + " " + item.targetStat}
                            </td>
                        </tr>
                     </React.Fragment>
                ))}
            </tbody>
        </table>
    </div>
  );
}
