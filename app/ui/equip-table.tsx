import React from 'react';
import { Equipment } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';

interface EquipTableProps {
  equipList: Equipment[];
  getTier: Function;
  equipSelected?: Function;
  showCost: boolean;
}

export default function EquipTable({ equipList, getTier, equipSelected, showCost }: EquipTableProps) {
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
          {equipList.map((equipment, index) => (
            <tr key={index} className={getTier(equipment) + " border border-b-2 border-black"}>
                <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">{equipment.type}</td>
                <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                    {equipSelected ? (
                    <Button
                        onClick={() => equipSelected(equipment)}
                        className="w-full bg-blue-500 text-white rounded text-xs md:text-sm"
                        buttonText={equipment.name}
                    />
                    ) : (
                    equipment.name
                )}
              </td>
              {showCost && <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">{equipment.cost + " GP"}</td>}
              <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">{"+" + equipment.effect + " " + equipment.targetStat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
