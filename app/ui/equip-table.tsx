import React, {useState} from 'react';
import { Equipment, Entity } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';

interface EquipTableProps {
  entity: Entity;
  equipList: Equipment[];
  getTier: Function;
  equipSelected?: Function;
  showCost: boolean;
  hiddenEquips?: Equipment[];
}

export default function EquipTable({ entity, equipList, getTier, equipSelected, showCost, hiddenEquips }: EquipTableProps) {
  const filteredEquips = hiddenEquips
  ? equipList
      .filter(equip => !hiddenEquips.some(hiddenEquip => hiddenEquip.id === equip.id))
      .sort((a, b) => {
        if (a.tier !== b.tier) {
          return a.tier - b.tier; // Sort by tier ascending
        }
        return a.cost - b.cost; // If tiers are the same, sort by cost ascending
      })
  : equipList.sort((a, b) => {
      if (a.tier !== b.tier) {
        return a.tier - b.tier; // Sort by tier ascending
      }
      return a.cost - b.cost; // If tiers are the same, sort by cost ascending
    });


  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-2 border-black bg-white">
        <thead>
          <tr className="border border-b-2 border-black">
            <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Type</th>
            <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Name</th>
            {showCost && <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Cost</th>}
            <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Effect</th>
          </tr>
        </thead>
        <tbody>
          {filteredEquips.map((equipment, index) => {
            return (
              <tr key={index} className={getTier(equipment) + " border border-b-2 border-black "}>
                  <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">{equipment.type}</td>
                  <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                      {equipSelected ? (
                      <Button
                          onClick={() => equipSelected(equipment)}
                          className={`w-full text-xs md:text-sm ${showCost && entity.gp < equipment.cost ? "disabled-button" : "bg-blue-500 text-white rounded"}`}
                          buttonText={equipment.name}
                      />
                      ) : (
                      equipment.name
                  )}
                </td>
                {showCost && <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">{equipment.cost + " GP"}</td>}
                <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">{"+" + equipment.effect + " " + equipment.stat}</td>
              </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};
