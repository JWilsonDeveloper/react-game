import React, { useState } from 'react';
import AbilityTable from '@/app/ui/ability-table';
import ItemTable from '@/app/ui/item-table';
import EquipTable from '@/app/ui/equip-table';
import { Player, Action, Equipment } from '@/app/lib/definitions';

interface ShopTabsProps {
  player: Player;
  itemSelected: Function;
  equipSelected: Function;
  items: Action[];
  equips: Equipment[];
  getTier: Function;
}

export default function ShopTabs({ player, itemSelected, equipSelected, items, equips, getTier }: ShopTabsProps) {
  const [activeTab2, setActiveTab2] = useState('purchase-equipment');
  const [activeTab, setActiveTab] = useState('purchase-items');

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 ">
      <div className="flex-col w-full border border-black rounded-lg p-2 bg-gray-200">
        <div className="bg-white h-full">
            <div className="flex border-b border-gray-200 flex-wrap">
            <button
                className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab === 'current-items' ? 'bg-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('current-items')}
            >
                Current Items
            </button>
            <button
                className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab === 'purchase-items' ? 'bg-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('purchase-items')}
            >
                Purchase Items
            </button>
            </div>
            <div className="p-2 sm:p-4">
            {activeTab === 'current-items' && (
                <ItemTable
                    items={player.itemList}
                    itemClicked={() => {}}
                    entity={player}
                    getTier={getTier}
                    showCost={false}
                    shopping={true}
                />
            )}
            {activeTab === 'purchase-items' && (
                <ItemTable
                    items={items}
                    itemClicked={itemSelected}
                    entity={player}
                    getTier={getTier}
                    showCost={true}
                    shopping={true}
                />
            )}
            </div>
        </div>
      </div>
      <div className="flex-col w-full border border-black rounded-lg p-2 bg-gray-200">
        <div className="bg-white h-full">
            <div className="flex border-b border-gray-200 bg-white flex-wrap">
                <button
                    className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab2 === 'current-equipment' ? 'bg-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab2('current-equipment')}
                >
                    Current Equipment
                </button>
                <button
                    className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab2 === 'purchase-equipment' ? 'bg-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab2('purchase-equipment')}
                >
                    Purchase Equipment
                </button>
            </div>
            <div className="p-2 sm:p-4">
                {activeTab2 === 'current-equipment' && (
                    <EquipTable
                        entity={player}
                        equipList={player.equipList}
                        getTier={getTier}
                        showCost={false}
                    />
                )}
                {activeTab2 === 'purchase-equipment' && (
                    <EquipTable
                        entity={player}
                        equipList={equips}
                        getTier={getTier}
                        equipSelected={equipSelected}
                        showCost={true}
                        hiddenEquips={player.equipList}
                    />
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
