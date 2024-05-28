import { Move, Player, Entity, Item, Equipment } from '../lib/definitions';
import Adventure from '@/app/ui/adventure';
import Leveling from '@/app/ui/leveling';
import { useState } from 'react';
import { FaQuestionCircle, FaTimesCircle } from 'react-icons/fa';
import Message from '@/app/ui/message';
import Shop from '@/app/ui/shop';
import XPBar from '@/app/ui/xp-bar';
import Rules from './rules';

interface MyGameProps {
    basePlayer : Player;
    enemies : Entity[];
    items : Item[];
    moves : Move[];
    equipment : Equipment[];
  }
  
export default function MyGame({ basePlayer, enemies, items, moves, equipment}: MyGameProps) {
    const [player, setPlayer ] = useState(basePlayer);
    const [gainLevels, setGainLevels] = useState(0);
    const [msg, setMsg] = useState("Welcome to the game!");
    const [shopping, setShopping] = useState(false);
    const [showRules, setShowRules] = useState(false); // State to manage visibility of rules component

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

    function getTier(move : Move){
        let buttonClass = "";
        switch (move.tier) {
            case 0:
                buttonClass = "bg-gray-300";
                break;
            case 1:
                buttonClass = "bg-green-300";"bg-blue-300";
                break;
            case 2:
                buttonClass = "bg-blue-300";"bg-indigo-300";
                break;
            case 3:
                buttonClass = "bg-indigo-300";"bg-violet-300";
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

    return (
        <div className="w-full flex flex-col">
            <button
                className="fixed z-50 stop-0 left-0 mt-4 ml-4 p-2 bg-gray-200 rounded-full"
                onClick={() => setShowRules(!showRules)}
                >
                {showRules ? <FaTimesCircle size={20} /> : <FaQuestionCircle size={20} />}
            </button>
            {showRules 
                ? 
                    <Rules /> 
                :
                    <div>
                        <div className="flex flex-col md:flex-row gap-4 mb-4 w-full justify-center">
                            <div className="flex flex-col w-full md:w-1/3 justify-center">
                                <XPBar player={player} getEarnedLevel={getEarnedLevel} />
                            </div>
                            <div className="flex flex-col w-full h-full bg-yellow-200 justify-center md:w-2/3">
                                <Message text={msg}/>
                            </div>
                        </div>
                        <div className="w-full">
                            {
                                shopping 
                                ?
                                    <div className="flex-col items-center w-full">
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
                                : 
                                    gainLevels !== 0 && player.currHP > 0 
                                    ?
                                        <div className="flex-col items-center w-full">
                                            <Leveling
                                                player={player}
                                                setPlayer={setPlayer}
                                                gainLevels={gainLevels}
                                                setGainLevels={setGainLevels}
                                                moves={moves}
                                                msg={msg}
                                                setMsg={setMsg}
                                                getTier={getTier}
                                            />
                                        </div>
                                    : 
                                        <div className="flex-col items-center w-full">
                                            <Adventure
                                                player={player}
                                                setPlayer={setPlayer}
                                                enemies={enemies}
                                                setGainLevels={setGainLevels}
                                                msg={msg}
                                                setMsg={setMsg}
                                                setShopping={setShopping}
                                                getTier={getTier}
                                                getEarnedLevel={getEarnedLevel}
                                            />
                                        </div>
                            }
                        </div>
                </div>
            }
        </div>
    );
}