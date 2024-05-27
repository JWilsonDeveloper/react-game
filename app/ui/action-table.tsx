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
            <React.Fragment>
                <tr>
                    <th className="border border-gray-200 p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Type</th>
                    <th className="border border-gray-200 p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Action</th>
                    {showCost && <th className="border border-gray-200 p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Cost</th>}
                    <th className="border border-gray-200 p-2 text-xs md:text-sm">Success Bonus</th>
                    <th className="border border-gray-200 p-2 text-xs md:text-sm row-span-2" rowSpan={2}>MP Cost</th>
                </tr>
                <tr>
                    <th className="border border-gray-200 p-2 text-xs md:text-sm">Effect</th>
                </tr>
            </React.Fragment>
        </thead>
        <tbody>
        {sortedActions.map((action, index) => (
            <React.Fragment key={index}>
            <tr className={getTier(action)}>
                <td className="border border-gray-200 p-2 text-xs md:text-sm row-span-2" rowSpan={2}>{action.type}</td>
                <td className="border border-gray-200 p-2 text-xs md:text-sm row-span-2" rowSpan={2}>
                <Button
                    onClick={() => actionClicked(action)}
                    className="w-full bg-blue-500 text-white rounded text-xs md:text-sm"
                    buttonText={action.name}
                />
                </td>
                {showCost && (
                    <td className="border border-gray-200 p-2 text-xs md:text-sm row-span-2" rowSpan={2}>
                        {action.cost + " AP"}
                    </td>
                )}
                <td className="border border-gray-200 p-2 text-xs md:text-sm">
                    {"+" + getSuccessBonus(action, entity)}
                </td>
                <td className="border border-gray-200 p-2 text-xs md:text-sm rowSpan={2}" rowSpan={2}>
                    {action.mpCost} MP
                </td>
                {/*
                <td className="border border-gray-200 p-2 text-xs md:text-sm row-span-2" rowSpan={2}>
                    {isAction(action) ? action.target : 'x'}
                </td>
            */}
            </tr>
            <tr className={getTier(action)}>
                <td className="border border-gray-200 p-2 text-xs md:text-sm">
                    {isAction(action) ? calculateEffect(action, entity) + " " + action.targetStat : 'x'}
                </td>
                {/*
                <td className="border border-gray-200 p-2 text-xs md:text-sm">
                    {isAction(action) ? action.targetStat : 'x'}
                </td>
                */}
            </tr>
            </React.Fragment>
        ))}
        </tbody>

      </table>
    </div>
  );
}
