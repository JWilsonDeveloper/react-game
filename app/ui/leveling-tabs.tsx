import React, { useState } from 'react';
import ActionTable from '@/app/ui/action-table';
import { Player, Move } from '@/app/lib/definitions';

interface LevelingTabsProps {
  tempPlayer: Player;
  actionSelected: Function;
  moves: Move[];
  getTier: Function;
}

export default function LevelingTabs({ tempPlayer, actionSelected, moves, getTier }: LevelingTabsProps) {
  const [activeTab, setActiveTab] = useState('purchase');

  const filteredActions = moves.filter(move => {
    if (move.type === 'SPELL') {
      return !tempPlayer.actionList.some(m => m.type === 'SPELL' && m.id === move.id);
    }
    const index = tempPlayer.actionList.findIndex(m => m.type === move.type);
    // If a matching type is found and its tier is less than the current action's tier
    return index !== -1 && move.tier > tempPlayer.actionList[index].tier;
  });

  return (
      <div className=" flex flex-col md:flex-row w-full justify-center rounded-lg p-2 bg-white-200">
        <div className="bg-white-200 h-full border border-black rounded-lg">
          <div className="flex rounded-t-lg bg-gray-200">
            <button
              className={`flex-1 px-2 py-1 rounded-tl-lg sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab === 'current' ? 'bg-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('current')}
            >
              Current Actions
            </button>
            <button
              className={`flex-1 px-2 py-1 rounded-tr-lg sm:px-4 sm:py-2 text-xs sm:text-base ${activeTab === 'purchase' ? 'bg-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('purchase')}
            >
              Purchase Actions
            </button>
          </div>
          <div className="p-2 sm:p-4 rounded-lg bg-white">
            {activeTab === 'current' && (
              <ActionTable
                actions={tempPlayer.actionList}
                actionClicked={() => { }}
                entity={tempPlayer}
                getTier={getTier}
                showCost={false}
              />
            )}
            {activeTab === 'purchase' && (
              <ActionTable
                actions={filteredActions}
                actionClicked={actionSelected}
                entity={tempPlayer}
                getTier={getTier}
                showCost={true}
              />
            )}
          </div>
        </div>
      </div>
  );
}
