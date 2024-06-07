import { Action, Player, Entity, Equipment } from '../lib/definitions';
import Adventure from '@/app/ui/adventure';
import Leveling from '@/app/ui/leveling';
import { useState } from 'react';
import { FaQuestionCircle, FaTimesCircle } from 'react-icons/fa';
import Message from '@/app/ui/message';
import Shop from '@/app/ui/shopping';
import XPBar from '@/app/ui/xp-bar';
import Rules from './rules';

interface MyGameProps {
    basePlayer : Player;
    enemies : Entity[];
    items : Action[];
    moves : Action[];
    equipment : Equipment[];
  }
  
export default function MyGame({ basePlayer, enemies, items, moves, equipment}: MyGameProps) {
    const [player, setPlayer ] = useState(basePlayer);
    const [oldPlayer, setOldPlayer] = useState(basePlayer);     // Used to preserve original stats when leveling up and shopping
    const [enemy, setEnemy ] = useState(enemies[0]);
    const [gainLevels, setGainLevels] = useState(0);
    const [msg, setMsg] = useState("Welcome to the game!");
    const [shopping, setShopping] = useState(false);
    const [showRules, setShowRules] = useState(false); // State to manage visibility of rules component
    const [adventureState, setAdventureState] = useState('starting');

    function getEarnedLevel(currentXP : number){
        if(currentXP > 600){
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

    function getTier(move : Action){
        let buttonClass = "";
        switch (move.tier) {
            case 0:
                buttonClass = "bg-gray-300";
                break;
            case 1:
                buttonClass = "bg-green-300";
                break;
            case 2:
                buttonClass = "bg-blue-300";
                break;
            case 3:
                buttonClass = "bg-indigo-300";
                break;
            case 4:
                buttonClass = "bg-violet-300";
                break;
            default:
                buttonClass = "bg-white";
                break;
        }
        return buttonClass;
    }

    function levelUp(levels : number){
        const baseSkills: number[] = [1, 2, 3, 4, 5, 6];
        const baseHPs: number[] = [15, 25, 35, 60, 85, 120];
        const baseMPs: number[] = [6, 9, 15, 24, 36, 51];

        const oldIndex = player.level - 1;
        const newIndex = oldIndex + levels;
        const newHP = player.totalHP + baseHPs[newIndex] - baseHPs[oldIndex];
        const newMP = player.totalMP + baseMPs[newIndex] - baseMPs[oldIndex];
        let skillBoost = baseSkills[newIndex] - baseSkills[oldIndex];
        let earnedLevel = getEarnedLevel(player.xp);
        let earnedAP = 0;
        for (let i = 0; i < levels; i++) {
            earnedAP += earnedLevel;
            earnedLevel--;
        }
        setOldPlayer(player);
        setPlayer({
            ...player,
            ap: player.ap + earnedAP,
            currHP: newHP,
            totalHP: newHP,
            currMP: newMP,
            totalMP: newMP,
            spd: player.spd + skillBoost,
            str: player.str + skillBoost,
            level: player.level + levels,
        })
        setGainLevels(levels);
        setAdventureState('starting');
    }

    return (
        <div className="w-full flex flex-col">
            <button
                className="fixed z-30 stop-0 left-0 mt-4 ml-4 p-2 bg-gray-200 rounded-full"
                onClick={() => setShowRules(!showRules)}
                >
                {showRules ? <FaTimesCircle size={20} /> : <FaQuestionCircle size={20} />}
            </button>
            {showRules 
                ?   <Rules /> 
                :   <div>
                        <div className="flex flex-col md:flex-row gap-4 mb-4 w-full items-stretch">
                            <div className="flex flex-col w-full md:w-1/3 justify-center">
                                <XPBar player={player} getEarnedLevel={getEarnedLevel} />
                            </div>
                            <div className="flex flex-col w-full md:w-2/3 justify-center">
                                <Message text={msg} />
                            </div>
                        </div>
                        <div className="w-full">
                            {
                                shopping 
                                    ?   <div className="flex-col items-center w-full">
                                            <Shop
                                                player={player}
                                                setPlayer={setPlayer}
                                                items={items}
                                                equipment={equipment}
                                                setShopping={setShopping}
                                                msg={msg}
                                                setMsg={setMsg}
                                                getTier={getTier}
                                            />
                                        </div> 
                                    :   gainLevels !== 0 && player.currHP > 0 
                                        ?   <div className="flex-col items-center w-full">
                                                <Leveling
                                                    player={player}
                                                    setPlayer={setPlayer}
                                                    oldPlayer={oldPlayer}
                                                    setGainLevels={setGainLevels}
                                                    moves={moves}
                                                    msg={msg}
                                                    setMsg={setMsg}
                                                    getTier={getTier}
                                                />
                                            </div>
                                        :   <div className="flex-col items-center w-full">
                                                <Adventure
                                                    player={player}
                                                    setPlayer={setPlayer}
                                                    enemy={enemy}
                                                    setEnemy={setEnemy}
                                                    enemies={enemies}
                                                    msg={msg}
                                                    setMsg={setMsg}
                                                    setShopping={setShopping}
                                                    getTier={getTier}
                                                    getEarnedLevel={getEarnedLevel}
                                                    adventureState={adventureState}
                                                    setAdventureState={setAdventureState}
                                                    levelUp={levelUp}
                                                />
                                            </div>
                            }
                        </div>
                </div>
            }
        </div>
    );
}