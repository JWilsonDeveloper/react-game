import { Player, Action } from "../lib/definitions";
import { Button } from "@/app/ui/button";
import { useState } from "react";
import React from "react";
import LevelingTabs from "./leveling-tabs";
import StatTable from "@/app/ui/stat-table";
import EntityStats from "@/app/ui/entity-stats";

interface LevelingProps {
  player: Player;
  setPlayer: Function;
  oldPlayer: Player;
  setGainLevels: Function;
  moves: Action[];
  msg: string;
  setMsg: Function;
  getTier: Function;
}

export default function Leveling({
  player,
  setPlayer,
  oldPlayer,
  setGainLevels,
  moves,
  msg,
  setMsg,
  getTier,
}: LevelingProps) {

  function doneLeveling() {
    setGainLevels(0);
  }

  function buyAction(action: Action) {
    const playerCopy = {...player};
    let newActionList;
    if (action.type !== "SPELL") {
      const replacedIndex = playerCopy.abilityList.findIndex(
        (move) => move.type === action.type
      );
      const oldActionList = playerCopy.abilityList;
      newActionList = [
        ...oldActionList.slice(0, replacedIndex),
        action,
        ...oldActionList.slice(replacedIndex + 1),
      ];
    } 
    else {
      newActionList = [...playerCopy.abilityList, action];
    }
    setPlayer({
      ...playerCopy,
      abilityList: newActionList,
      ap: playerCopy.ap - action.cost,
    });
    setMsg(msg + `\n${playerCopy.name} gained ${action.name}!`);
  }

  function handleBuyAction(action : Action) {
    // Check if the player already has the ability
    if (!player.abilityList.some((move) => move.id === action.id)) {
      // Check if the player has enough ap
      if (player.ap >= action.cost) {
        let confirmed;
        const replacedAction = player.abilityList.find(ability => ability.type === action.type);
        if(replacedAction != undefined && (action.type === "MELEE" || action.type === "RANGED" || action.type === "FLEE")){
          confirmed = window.confirm(`Are you sure you want to buy ${action.name}?\nIt will replace your current ${action.type} ability: ${replacedAction.name}`);
        }
        else {
          confirmed = window.confirm(`Are you sure you want to buy ${action.name}?`); 
        }
        if (confirmed) {
            buyAction(action);
        }
      }
      else {
        setMsg(msg + `\nInsufficient AP.`);
      }
    }
    else {
      setMsg(msg + `\n${player.name} already has ${action.name}.`);
    }
  }


  return (
    <div className="flex flex-col items-center w-full text-center">
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="flex flex-col items-center w-full md:w-2/5 bg-white border border-black rounded-lg p-2 gap-4">
          <h1 className="text-2xl font-bold">Stat Increases</h1>
          <div className="flex sm:gap-4">
            <div>
                <h1 className="text-xl font-bold">Level {oldPlayer.level}</h1>
                <EntityStats entity={oldPlayer} hideGPAP={true} />
            </div>
            <div>
                <h1 className="text-xl font-bold">Level {player.level}</h1>
                <EntityStats entity={player} hideGPAP={true} />
            </div>
          </div>
          
        </div>
        <div className="flex flex-col w-full items-center justify-center bg-white border border-black rounded-lg p-2">
            <div className="flex flex-col w-full items-center">
                <h1 className="text-2xl font-bold mb-2">
                    Purchase Abilities
                </h1>
                <h1 className="text-xl font-bold">
                    AP: {player.ap}
                </h1>
            </div>
            <LevelingTabs
                tempPlayer={player}
                moves={moves}
                actionSelected={handleBuyAction}
                getTier={getTier}
            />
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-4 w-full">
        <Button buttonText="Ready for battle!" className="w-1/3" onClick={doneLeveling} />
      </div>
    </div>
  );
}
