import { Player, Move, Action } from "../lib/definitions";
import { Button } from "@/app/ui/button";
import { useState } from "react";
import React from "react";
import LevelingTabs from "./leveling-tabs";
import StatTable from "@/app/ui/stat-table";

interface LevelingProps {
  player: Player;
  setPlayer: Function;
  gainLevels: number;
  setGainLevels: Function;
  moves: Move[];
  msg: string;
  setMsg: Function;
  getTier: Function;
}

const baseSkills: number[] = [1, 1, 2, 2, 3, 3];
const baseHPs: number[] = [15, 25, 35, 60, 85, 120];
const baseMPs: number[] = [6, 9, 15, 24, 36, 51];

export default function Leveling({
  player,
  setPlayer,
  gainLevels,
  setGainLevels,
  moves,
  msg,
  setMsg,
  getTier,
}: LevelingProps) {
  const oldIndex = player.level - 1;
  const newIndex = oldIndex + gainLevels;
  const newHP = player.totalHP + baseHPs[newIndex] - baseHPs[oldIndex];
  const newMP = player.totalMP + baseMPs[newIndex] - baseMPs[oldIndex];
  let skillBoost = baseSkills[newIndex] - baseSkills[oldIndex];
  const earnedAP = getEarnedAP(getEarnedLevel(player.xp));
  const [tempPlayer, setTempPlayer] = useState({
    ...player,
    ap: player.ap + earnedAP,
    currHP: newHP,
    totalHP: newHP,
    currMP: newMP,
    totalMP: newMP,
    speed: player.speed + skillBoost,
    strength: player.strength + skillBoost,
    level: player.level + gainLevels,
  });

  function doneLeveling() {
    setPlayer(tempPlayer);
    setGainLevels(0);
  }

  function buyAction(action: Action) {
    if (!tempPlayer.actionList.some((move) => move.id === action.id)) {
      if (tempPlayer.ap >= action.cost) {
        let newActionList;
        if (action.type !== "SPELL") {
          const replacedIndex = tempPlayer.actionList.findIndex(
            (move) => move.type === action.type
          );
          const oldActionList = tempPlayer.actionList;
          newActionList = [
            ...oldActionList.slice(0, replacedIndex),
            action,
            ...oldActionList.slice(replacedIndex + 1),
          ];
        } else {
          newActionList = [...tempPlayer.actionList, action];
        }
        setTempPlayer({
          ...tempPlayer,
          actionList: newActionList,
          ap: tempPlayer.ap - action.cost,
        });
        setMsg(msg + `\n${player.name} gained ${action.name}!`);
      } else {
        setMsg(msg + `\nInsufficient AP.`);
      }
    } else {
      setMsg(msg + `\n${player.name} already has ${action.name}.`);
    }
  }

  function getEarnedLevel(currentXP: number) {
    if (currentXP > 750) {
      return 5;
    } else if (currentXP > 200) {
      return 4;
    } else if (currentXP > 80) {
      return 3;
    } else if (currentXP > 15) {
      return 2;
    } else {
      return 1;
    }
  }

  function getEarnedAP(earnedLevel: number) {
    let earnedAP = 0;
    for (let i = 0; i < gainLevels; i++) {
      earnedAP += earnedLevel;
      earnedLevel--;
    }
    return earnedAP;
  }

  return (
    <div className="flex flex-col items-center w-full text-center">
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="flex flex-col items-center w-full md:w-1/4 bg-white border border-black rounded-lg p-2 gap-4">
          <h1 className="text-2xl font-bold">Stat Increases</h1>
          <StatTable player={player} tempPlayer={tempPlayer} />
        </div>
        <div className="flex flex-col w-full items-center justify-center bg-white border border-black rounded-lg p-2">
            <div className="grid grid-cols-3 w-full items-end">
            <h1 className="text-2xl font-bold mb-4 col-start-2">
                Purchase Attacks
            </h1>
            <h1 className="text-xl font-bold mb-4 col-start-3">
                AP: {tempPlayer.ap}
            </h1>
            </div>
            <LevelingTabs
            tempPlayer={tempPlayer}
            moves={moves}
            actionSelected={buyAction}
            getTier={getTier}
            />
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-4 w-full">
        <Button buttonText="All Set!" className="w-1/3" onClick={doneLeveling} />
      </div>
    </div>
  );
}
