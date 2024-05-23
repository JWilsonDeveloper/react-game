import {Button} from '@/app/ui/button';
import { Move, Action, Player, Entity, Item, Equipment } from '../lib/definitions';
import Adventure from '@/app/ui/adventure';
import Leveling from '@/app/ui/leveling';
import { useState } from 'react';
import Message from '@/app/ui/message';
import Shop from '@/app/ui/shop';
import XPBar from '@/app/ui/xp-bar';
import { get } from 'http';

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
    const [msg, setMsg] = useState("Welcome to monster fight!");
    const [shopping, setShopping] = useState(false);

    function getSuccessBonus(move : Move, entity : Entity){
        let bonus = 0;
        if(move.successBonus){
            bonus += move.successBonus;
        }
        if(move.skillBonus){
            if(move.skillBonus.type === "SUCCESS"){
                bonus += move.skillBonus.skill === "SPEED" ? move.skillBonus.multiplier * entity.speed : move.skillBonus.multiplier * entity.strength;
            }
        }
        return bonus;
    }

    function getEffectBonus(action : Action, entity : Entity){
        let bonus = 0;
        bonus += action.effectBonus;
        if(action.skillBonus){
            if(action.skillBonus.type === "EFFECT"){
                bonus += action.skillBonus.skill === "STRENGTH" ? action.skillBonus.multiplier * entity.strength : action.skillBonus.multiplier * entity.speed;
            }
        }
        return bonus;
    }

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
    }

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

    return (
        <div className="w-full flex flex-col">
            <div className="flex gap-4 mb-4 w-full justify-center">
                <div className="flex flex-col w-full md:w-1/3 justify-center">
                    <XPBar player={player} getNextLevelXP={getNextLevelXP} getEarnedLevel={getEarnedLevel} />
                </div>
                <div className="flex flex-col w-full md:w-2/3">
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
                        />
                    </div>
                : 
                    <div className="flex-col items-center w-full">
                        <Adventure
                            player={player}
                            setPlayer={setPlayer}
                            enemies={enemies}
                            setGainLevels={setGainLevels}
                            getSuccessBonus={getSuccessBonus}
                            getEffectBonus={getEffectBonus}
                            msg={msg}
                            setMsg={setMsg}
                            shopping={shopping}
                            setShopping={setShopping}
                        />
                    </div>
            }
            </div>
        </div>
    );
    
    
}