import React, { useState } from 'react';
import ActionTable from '@/app/ui/action-table';
import ItemTable from '@/app/ui/item-table';
import EquipTable from '@/app/ui/equip-table';
import { Player, Move, Item, Equipment } from '@/app/lib/definitions';

interface AdventureTabsProps {
  player: Player;
  actionSelected: Function;
  getTier: Function;
}

export default function AdventureTabs({ player, actionSelected, getTier }: AdventureTabsProps) {
  const [activeTab, setActiveTab] = useState('actions');

  function moveClicked(move: Move) {
    actionSelected(move);
    if ('uses' in move && typeof move.uses === 'number' && move.uses > 0) {
      move.uses -= 1;
    }
  }

  return (
    <div className="flex flex-col border border-black rounded-lg p-2 bg-gray-200">
      <div className="bg-white h-full">
        <div className="flex border-b border-gray-200 flex-wrap">
          <button
            className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab === 'actions' ? 'bg-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('actions')}
          >
            Actions
          </button>
          <button
            className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab === 'items' ? 'bg-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('items')}
          >
            Items
          </button>
          <button
            className={`flex-1 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab === 'equipment' ? 'bg-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('equipment')}
          >
            Equipment
          </button>
        </div>
        <div className="p-2 sm:p-4">
          {activeTab === 'actions' && (
            <ActionTable
              actions={player.actionList}
              actionClicked={moveClicked}
              entity={player}
              getTier={getTier}
              showCost={false}
            />
          )}
          {activeTab === 'items' && (
            <ItemTable
              items={player.itemList}
              itemClicked={moveClicked}
              entity={player}
              getTier={getTier}
              showCost={false}
              hideUseless={true}
            />
          )}
          {activeTab === 'equipment' && (
            <EquipTable
              equipList={player.equipList}
              getTier={getTier}
              showCost={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
