import React, { useState } from 'react';
import AbilityTable from '@/app/ui/ability-table';
import { Player, Action } from '@/app/lib/definitions';

interface LevelingTabsProps {
  tempPlayer: Player;
  actionSelected: Function;
  moves: Action[];
  getTier: Function;
}

export default function LevelingTabs({ tempPlayer, actionSelected, moves, getTier }: LevelingTabsProps) {
  const [activeTab, setActiveTab] = useState('purchase');

  const filteredActions = moves.filter(move => {
    // Include all unpurchased spells regardless of tier
    if (move.type === 'SPELL') {
      return !tempPlayer.abilityList.some(m => m.type === 'SPELL' && m.id === move.id);
    }
    const index = tempPlayer.abilityList.findIndex(m => m.type === move.type);
    // If an ability has a lower tier than the player ability of the same type, filter it out
    return index !== -1 && move.tier > tempPlayer.abilityList[index].tier;
  });

  return (
      <div className=" flex flex-col md:flex-row w-full justify-center rounded-lg p-2 bg-white-200">
        <div className="bg-white-200 h-full border border-black rounded-lg">
          <div className="flex rounded-t-lg bg-gray-200">
            <button
              className={`flex-1 px-2 py-1 rounded-tl-lg sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab === 'current' ? 'bg-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('current')}
            >
              Current Abilities
            </button>
            <button
              className={`flex-1 px-2 py-1 rounded-tr-lg sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab === 'purchase' ? 'bg-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('purchase')}
            >
              Purchase Abilities
            </button>
          </div>
          <div className="p-2 sm:p-4 rounded-lg bg-white">
            {activeTab === 'current' && (
              <AbilityTable
                actions={tempPlayer.abilityList}
                actionClicked={() => { }}
                entity={tempPlayer}
                getTier={getTier}
                showCost={false}
                adventuring={false}
              />
            )}
            {activeTab === 'purchase' && (
              <AbilityTable
                actions={filteredActions}
                actionClicked={actionSelected}
                entity={tempPlayer}
                getTier={getTier}
                showCost={true}
                adventuring={false}
              />
            )}
          </div>
        </div>
      </div>
  );
}
