import React, {useState} from 'react';
import { Action, Entity } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';

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
  if(action.effect){
    bonus += action.effect.effectBonus;
  }
  if (action.skillBonus) {
    if (action.skillBonus.type === "EFFECT") {
      bonus += action.skillBonus.skill === "STR" ? action.skillBonus.multiplier * entity.str : action.skillBonus.multiplier * entity.spd;
    }
  }
  return bonus;
}
function calculateEffect(action: Action, player: Entity) {
  if (action.effect) {
    const bonus = getEffectBonus(action, player);
    const minEffect = action.effect.effectRoll.quantity * action.effect.effectRoll.rangeMin + bonus;
    const maxEffect = action.effect.effectRoll.quantity * action.effect.effectRoll.rangeMax + bonus;
    return `${minEffect}-${maxEffect}`;
  }
  return '';
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

interface ItemTableProps {
  items: Action[];
  itemClicked: Function;
  entity: Entity;
  getTier: Function;
  showCost: boolean;
  shopping: boolean;
}

export default function ItemTable({ items, itemClicked, entity, getTier, showCost, shopping }: ItemTableProps) {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const filteredItems = shopping ? items.filter(item => item.uses && item.uses > 0) : items;
  const sortedItems = filteredItems.sort((a, b) => {
    if (a.tier !== b.tier) {
      return a.tier - b.tier; // Sort by tier ascending
    }
    return a.cost - b.cost; // If tiers are the same, sort by cost ascending
  });

  return (
    <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-2 border-black bg-white">
            <React.Fragment>
                <thead>
                    <tr>
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Type</th>
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Item</th>
                        {showCost && <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Cost</th>}
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>Uses</th>
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Success Bonus</th>
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>MP Cost</th>
                    </tr>
                    <tr className="border border-b-2 border-black">
                        <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Effect</th>
                    </tr>
                </thead>
            </React.Fragment>
            <tbody>
                {sortedItems.map((item, index) => {
                  return (
                     <React.Fragment key={index}>
                        <tr className={getTier(item)}>
                            <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>{item.type}</td>
                            <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>
                            <Button
                                onClick={() => itemClicked(item)}
                                className={`w-full text-xs md:text-sm ${(showCost && entity.gp < item.cost || (!showCost && shopping))? "disabled-button" : "bg-blue-500 text-white rounded"}`}
                                buttonText={item.name}
                            />
                            </td>
                            {showCost && (
                                <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>
                                    {item.cost + " GP"}
                                </td>
                            )}
                            <td className="border border-gray-200 sm:p-2 text-xs md:text-sm row-span-2" rowSpan={2}>{item.uses}</td>
                            <td className="border border-gray-200 w-full sm:p-2 text-xs md:text-sm tooltip-container allow-pointer-events">
                              {item.effect && item.effect.target === "OTHER"
                                ? <p
                                    className="info-text inline-block"
                                    onMouseEnter={() => setHoveredIndex(index + "success")}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                  >
                                  {"+" + getSuccessBonus(item, entity)}
                                  </p>
                                : <p>-</p>
                              }
                              {hoveredIndex === index + "success" && (
                                <div className="tooltip">
                                  <p>{getSuccessString(item)}</p>
                                </div>
                              )}
                            </td>
                            <td className="border border-gray-200 sm:p-2 text-xs md:text-sm rowSpan={2}" rowSpan={2}>
                                {item.mpCost} MP
                            </td>
                        </tr>
                        <tr className={getTier(item) + " border-b-2 border-black "}>
                          {item.effect
                            ? <td className={getTier(item) + " border border-gray-200 w-full sm:p-2 text-xs md:text-sm tooltip-container allow-pointer-events"}>
                              <p
                                className="info-text inline-block"
                                onMouseEnter={() => setHoveredIndex(index + "effect")}
                                onMouseLeave={() => setHoveredIndex(null)}
                              >
                                {calculateEffect(item, entity) + " " + item.effect.stat}
                              </p>
                              {hoveredIndex === index + "effect" && (
                                <div className="tooltip">
                                  <p>{getEffectString(item)}</p>
                                </div>
                              )}
                            </td>
                            : <td className="border border-gray-200 w-full sm:p-2 text-xs md:text-sm tooltip-container allow-pointer-events">
                              <p>-</p>
                            </td>
                          }
                        </tr>
                     </React.Fragment>
                )})}
            </tbody>
        </table>
    </div>
  );
}
