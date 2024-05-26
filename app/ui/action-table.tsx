import React from 'react';
import { Action, Move, Entity } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';

interface ActionTableProps {
  actions: Move[];
  actionClicked: Function;
  entity: Entity;
  getTier: Function;
  showCost: boolean;
}

function isAction(move: Move): move is Action {
  return (move as Action).effectRoll !== undefined;
}

export default function ActionTable({ actions, actionClicked, entity, getTier, showCost }: ActionTableProps) {
  const sortedActions = actions.sort((a, b) => {
    if (a.type < b.type) return -1;
    if (a.type > b.type) return 1;
    if (b.tier !== a.tier) return b.tier - a.tier; // Sort by tier descending if types are the same
    return 0;
  });

  function calculateEffect(move: Move, player: Entity) {
    if (move.type !== 'FLEE') {
      const action = move as Action;
      const bonus = getEffectBonus(action, player);
      const minEffect = action.effectRoll.quantity * action.effectRoll.rangeMin + bonus;
      const maxEffect = action.effectRoll.quantity * action.effectRoll.rangeMax + bonus;
      return `${minEffect}-${maxEffect}`;
    }
    return '';
  }

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

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">Type</th>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">Action</th>
            {showCost && <th className="border border-gray-200 p-2 text-xs md:text-sm">Cost</th>}
            <th className="border border-gray-200 p-2 text-xs md:text-sm">SB</th>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">Effect</th>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">Stat</th>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">Target</th>
            <th className="border border-gray-200 p-2 text-xs md:text-sm">MP Cost</th>
          </tr>
        </thead>
        <tbody>
          {sortedActions.map((action, index) => (
            <tr key={index} className={getTier(action)}>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{action.type}</td>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">
                <Button
                  onClick={() => actionClicked(action)}
                  className="w-full bg-blue-500 text-white rounded text-xs md:text-sm"
                  buttonText={action.name}
                />
              </td>
              {showCost && <td className="border border-gray-200 p-2 text-xs md:text-sm">{action.cost + " AP"}</td>}
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{"+" + getSuccessBonus(action, entity)}</td>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{isAction(action) ? calculateEffect(action, entity) : 'x'}</td>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{isAction(action) ? action.targetStat : 'x'}</td>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{isAction(action) ? action.target : 'x'}</td>
              <td className="border border-gray-200 p-2 text-xs md:text-sm">{action.mpCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
