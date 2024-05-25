import React from 'react';
import { Action, Move, Item, Entity } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';

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
}

export default function ItemTable({ items, itemClicked, entity, getTier, showCost }: ItemTableProps) {
  const filteredItems = items.filter(item => item.uses > 0);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">Item</th>
            {showCost && <th className="border border-gray-200 p-2 text-xs md:text-sm">Cost</th>}
            <th className="border border-gray-200 p-2 text-xs md:text-sm">Uses</th>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">Success Bonus</th>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">Effect</th>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">Stat</th>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">Target</th>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">MP Cost</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index} className={getTier(item)}>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">
                <Button
                  onClick={() => itemClicked(item)}
                  className="w-full bg-blue-500 text-white rounded text-xs md:text-sm"
                  buttonText={item.name}
                />
              </td>
              {showCost && <td className="border border-gray-200 p-2 text-xs md:text-sm">{item.cost + " GP"}</td>}
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{item.uses}</td>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{item.target === "OTHER" ? item.successBonus : "x"}</td>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{calculateEffect(item, entity)}</td>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{item.targetStat}</td>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{item.target}</td>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{item.mpCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
