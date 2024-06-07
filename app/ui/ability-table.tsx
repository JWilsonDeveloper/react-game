import React, { useState } from 'react';
import { Action, Entity, Player } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import '@/app/styles.css';

interface AbilityTableProps {
  actions: Action[];
  actionClicked: Function;
  entity: Entity;
  getTier: Function;
  showCost: boolean;
  adventuring: boolean;
}

export default function AbilityTable({ actions, actionClicked, entity, getTier, showCost, adventuring }: AbilityTableProps) {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const sortedActions = actions.sort((a, b) => {
      if (a.tier !== b.tier) {
        return a.tier - b.tier; // Sort by tier ascending
      }
      return a.cost - b.cost; // If tiers are the same, sort by cost ascending
    });


  function calculateEffect(action: Action, player: Entity) {
    if (action.effect) {
      const bonus = getEffectBonus(action, player);
      const minEffect = action.effect.effectRoll.quantity * action.effect.effectRoll.rangeMin + bonus;
      const maxEffect = action.effect.effectRoll.quantity * action.effect.effectRoll.rangeMax + bonus;
      return `${minEffect}-${maxEffect}`;
    }
    return '';
  }

  function getSuccessBonus(action: Action, entity: Entity) {
    let bonus = 0;
    if (action.successBonus) {
      bonus += action.successBonus;
    }
    if (action.skillBonus) {
      if (action.skillBonus.type === "SUCCESS") {
        bonus += action.skillBonus.skill === "SPD" ? action.skillBonus.multiplier * entity.spd : action.skillBonus.multiplier * entity.str;
      }
    }
    return bonus;
  }

  function getEffectBonus(action: Action, entity: Entity) {
    let bonus = 0;
    if (action.effect) {
      bonus += action.effect.effectBonus;
      if (action.skillBonus?.type === "EFFECT") {
        bonus += action.skillBonus.skill === "STR" ? action.skillBonus.multiplier * entity.str : action.skillBonus.multiplier * entity.spd;
      }
    }
    return bonus;
  }

  function getEffectString(action: Action) {
    let result: string = "";
    if (action.effect) {
      result += action.effect.effectRoll.quantity + "d" + action.effect.effectRoll.rangeMax;
      if (action.effect.effectBonus) {
        result += " + " + action.effect.effectBonus;
      }
      if (action.skillBonus?.type === "EFFECT") {
        if (action.skillBonus.multiplier === 1) {
          result += " + " + action.skillBonus.skill;
        } else {
          result += " + (" + action.skillBonus.multiplier + " x " + action.skillBonus.skill + ")";
        }
      }
    }
    return result;
  }

  function getSuccessString(action: Action) {
    let result: string = "";
    if (action.successBonus) {
      result += action.successBonus;
    }
    if (action.skillBonus?.type === "SUCCESS") {
      if (action.skillBonus.multiplier === 1) {
        result += " + " + action.skillBonus.skill;
      } else {
        result += " + (" + action.skillBonus.multiplier + " x " + action.skillBonus.skill + ")";
      }
    }
    return result;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-2 border-black bg-white">
        <thead>
          <React.Fragment>
            <tr>
              <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Type</th>
              <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Ability</th>
              {showCost && <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Cost</th>}
              <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Success Bonus</th>
              <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>MP Cost</th>
            </tr>
            <tr className="border border-b-2 border-black">
              <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Effect</th>
            </tr>
          </React.Fragment>
        </thead>
        <tbody>
          {sortedActions.map((action, index) => {
            const disableButton = (adventuring && entity.currMP < action.mpCost) || (showCost && (entity as Player).ap < action.cost) || (!adventuring && !showCost);
            return (
              <React.Fragment key={index}>
                <tr className={getTier(action)}>
                  <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>{action.type}</td>
                  <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>
                    <Button
                      onClick={() => actionClicked(action)}
                      className={`w-full text-xs md:text-sm ${disableButton ? "disabled-button" : "bg-blue-500 text-white rounded"}`}
                      buttonText={action.name}
                      disabled={disableButton}
                    />
                  </td>
                  {showCost && (
                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>
                      {action.cost + " AP"}
                    </td>
                  )}
                  <td className={`w-full sm:p-2 text-xs md:text-sm tooltip-container allow-pointer-events`}>
                    <p
                      className="info-text inline-block"
                      onMouseEnter={() => setHoveredIndex(index + "success")}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {"+" + getSuccessBonus(action, entity)}
                    </p>
                    {hoveredIndex === index + "success" && (
                      <div className="tooltip">
                        <p>{getSuccessString(action)}</p>
                      </div>
                    )}
                  </td>
                  <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>
                    {action.mpCost} MP
                  </td>
                </tr>
                <tr className={getTier(action) + " border-b-2 border-black"}>
                  {action.effect
                    ? <td className="w-full sm:p-2 text-xs md:text-sm tooltip-container allow-pointer-events">
                      <p
                        className="info-text inline-block"
                        onMouseEnter={() => setHoveredIndex(index + "effect")}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {calculateEffect(action, entity) + " " + (action.effect.stat === "HP" ? "DMG" : action.effect.stat)}
                      </p>
                      {hoveredIndex === index + "effect" && (
                        <div className="tooltip">
                          <p>{getEffectString(action)}</p>
                        </div>
                      )}
                    </td>
                    : <td className="w-full inline-block sm:p-2 text-xs md:text-sm">
                      <p>-</p>
                    </td>
                  }
                </tr>
              </React.Fragment>
            );                       
          })}
        </tbody>
      </table>
    </div>
  );
}
