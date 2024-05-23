import { Player, Item, Move, Action } from "../lib/definitions";
import Image from "next/image";
import XPBar from "@/app/ui/xp-bar";
import { Button } from "@/app/ui/button";
import { useState } from "react";
import MoveButton from "@/app/ui/move-button";
import MoveList from "./move-list";
import ActionList from "./action-list";
import DownArrow from "./down-arrow";
import RightArrow from "./right-arrow";
import React from "react";
import { act } from "react-dom/test-utils";

interface LevelingProps {
    player : Player;
    setPlayer : Function;
    gainLevels : number;
    setGainLevels : Function;
    moves : Move[];
    msg : string;
    setMsg : Function;
}

const baseSkills : number[] = [
    1, 1, 2, 2, 3, 3,
]
const baseHPs : number[] = [
    15, 25, 35, 60, 85, 120,
]
const baseMPs : number[] = [
    6, 9, 15, 24, 36, 51,
]

export default function Leveling({player, setPlayer, gainLevels, setGainLevels, moves, msg, setMsg} : LevelingProps) {
    const oldIndex = player.level - 1;
    const newIndex = oldIndex + gainLevels;
    const newHP = player.totalHP + baseHPs[newIndex] - baseHPs[oldIndex];
    const newMP = player.totalMP + baseMPs[newIndex] - baseMPs[oldIndex];
    let skillBoost = baseSkills[newIndex] - baseSkills[oldIndex];
    const earnedAP = getEarnedAP(getEarnedLevel(player.xp));
    const [tempPlayer, setTempPlayer] = useState({...player, ap: player.ap + earnedAP, currHP: newHP, totalHP: newHP, currMP: newMP, totalMP: newMP, speed: player.speed + skillBoost, strength: player.strength + skillBoost, level: player.level + gainLevels});

    function doneLeveling(){
        setPlayer(tempPlayer);
        setGainLevels(0);
    }

    function buyAction(action: Action) {
        if (!tempPlayer.actionList.some(move => move.id === action.id)) {
            if (tempPlayer.ap >= action.cost) {
                const oldActionList = tempPlayer.actionList;
                const newActionList = [...oldActionList.slice(0, action.slot), action, ...oldActionList.slice(action.slot + 1)];
                setTempPlayer({ ...tempPlayer, actionList: newActionList, ap: tempPlayer.ap - action.cost });
                setMsg(msg + `\n${player.name} gained ${action.name}!`);
            } else {
                setMsg(msg + `\nInsufficient AP.`);
            }
        } else {
            setMsg(msg + `\n${player.name} already has ${action.name}.`);
        }
    }
    
    /*
    function getNextLevelXP(currentXP : number){
        if(currentXP < 15){
            return 15;
        }
        else if(currentXP < 80){
            return 80;
        }
        else if(currentXP < 200){
            return 200;
        }
        else{
            return 750;
        }
    }*/

    function getEarnedLevel(currentXP : number){
        if(currentXP > 750){
            return 5;
        }
        else if(currentXP > 200){
            return 4;
        }
        else if(currentXP > 80){
            return 3;
        }
        else if(currentXP > 15){
            return 2;
        }
        else{
            return 1;
        }
    }

    function getEarnedAP(earnedLevel : number){
        let earnedAP = 0;
        for(let i = 0; i < gainLevels; i++){
            earnedAP += earnedLevel;
            earnedLevel--;
        }
        return earnedAP;
    }

    return (
        <div className="flex flex-col items-center w-full text-center">
            <div className="flex w-full gap-4">
                <div className="flex flex-col w-full items-center justify-center border border-black rounded-lg p-2">
                    <div>
                        <div className="grid grid-cols-3 w-full items-end">
                            <h1 className="text-2xl font-bold mb-4 col-start-2">Purchase Attacks</h1>
                            <h1 className="text-xl font-bold mb-4 col-start-3">AP: {tempPlayer.ap}</h1>
                        </div>
                        <div className="flex flex-cols-3">
                            <div className="grid grid-rows-4 gap-4">
                                {['Melee', 'Ranged', 'Spell', 'Flee'].map((title, slot) => (
                                    <div key={slot} className="flex gap-4 items-center border border-black rounded-lg p-2">
                                        <h1 className="text-sm font-bold" style={{ minWidth: '5rem' }}>{title}</h1>
                                        {moves.filter(action => 
                                            action.slot === slot && 
                                            tempPlayer.actionList[slot] &&
                                            action.cost >= tempPlayer.actionList[slot].cost
                                        ).map((action, index) => (
                                            <React.Fragment key={index}>
                                                <MoveButton
                                                    move={action}
                                                    moveClicked={buyAction}
                                                    player={tempPlayer}
                                                    showCost={index !== 0}
                                                    className={"mt-1"}
                                                />
                                                {index === 0 && <RightArrow />}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/6 border border-black rounded-lg p-2">
                    <h1 className="text-2xl font-bold">Stat Increases</h1>
                    <div className="flex flex-col items-center justify-around flex-grow"> {/* space the divs inside this div out vertically */}
                        <div>
                            <h1 className="text-l font-bold col-start-2">Total HP</h1>
                            <div className="flex flex-cols-3">
                                <h1 className="text-l font-bold col-start-2">{player.totalHP}</h1>
                                <RightArrow />
                                <h1 className="text-l font-bold col-start-2">{tempPlayer.totalHP}</h1>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-l font-bold col-start-2">Total MP</h1>
                            <div className="flex flex-cols-3">
                                <h1 className="text-l font-bold col-start-2">{player.totalMP}</h1>
                                <RightArrow />
                                <h1 className="text-l font-bold col-start-2">{tempPlayer.totalMP}</h1>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-l font-bold col-start-2">STR</h1>
                            <div className="flex flex-cols-3">
                                <h1 className="text-l font-bold col-start-2">{player.strength}</h1>
                                <RightArrow />
                                <h1 className="text-l font-bold col-start-2">{tempPlayer.strength}</h1>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-l font-bold col-start-2">SPD</h1>
                            <div className="flex flex-cols-3">
                                <h1 className="text-l font-bold col-start-2">{player.speed}</h1>
                                <RightArrow />
                                <h1 className="text-l font-bold col-start-2">{tempPlayer.speed}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4 gap-4 w-full">
                <Button buttonText="All Set!" className="w-1/3" onClick={doneLeveling} />
            </div>
        </div>
    )
}
