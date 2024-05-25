import React, { useState } from 'react';
import ActionTable from '@/app/ui/action-table';
import ItemTable from '@/app/ui/item-table';
import EquipTable from '@/app/ui/equip-table';
import { Player, Move, Item, Equipment } from '@/app/lib/definitions';

interface ShopTabsProps {
  player: Player;
  itemSelected: Function;
  equipSelected: Function;
  items: Item[];
  equips: Equipment[];
  getTier: Function;
}

export default function ShopTabs({ player, itemSelected, equipSelected, items, equips, getTier }: ShopTabsProps) {
  const [activeTab, setActiveTab] = useState('current-items');
  const [activeTab2, setActiveTab2] = useState('purchase-items');

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 ">
      <div className="flex-col w-full border border-black rounded-lg p-2 bg-gray-200">
        <div className="bg-white h-full">
            <div className="flex border-b border-gray-200 bg-white flex-wrap">
                <button
                    className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab === 'current-items' ? 'bg-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('current-items')}
                >
                    Current Items
                </button>
                <button
                    className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab === 'current-equipment' ? 'bg-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('current-equipment')}
                >
                    Current Equipment
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
                    />
                )}
                {activeTab === 'current-equipment' && (
                    <EquipTable
                        equipList={player.equipList}
                        getTier={getTier}
                        showCost={false}
                    />
                )}
            </div>
        </div>
      </div>
      <div className="flex-col w-full border border-black rounded-lg p-2 bg-gray-200">
        <div className="bg-white h-full">
            <div className="flex border-b border-gray-200 flex-wrap">
            <button
                className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab2 === 'purchase-items' ? 'bg-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab2('purchase-items')}
            >
                Purchase Items
            </button>
            <button
                className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab2 === 'purchase-equipment' ? 'bg-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab2('purchase-equipment')}
            >
                Purchase Equipment
            </button>
            </div>
            <div className="p-2 sm:p-4">
            {activeTab2 === 'purchase-items' && (
                <ItemTable
                    items={items}
                    itemClicked={itemSelected}
                    entity={player}
                    getTier={getTier}
                    showCost={true}
                />
            )}
            {activeTab2 === 'purchase-equipment' && (
                <EquipTable
                    equipList={equips.filter(equip => 
                        equip.tier > player.equipList[equip.slot].tier)}
                    getTier={getTier}
                    equipSelected={equipSelected}
                    showCost={true}
                />
            )}
            </div>
        </div>
      </div>
    </div>
  );
};
