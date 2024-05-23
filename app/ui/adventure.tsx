'use client'

import React, { useReducer, useState } from "react";
import PlayerStats from '@/app/ui/player-stats';
import EnemyStats from '@/app/ui/enemy-stats';

import { Move, Action, Player, Entity } from '@/app/lib/definitions';
import ActionList from "./action-list";
import ItemList from "./item-list";
import {Button} from "@/app/ui/button"
import EquipList from "./equip-list";

interface AdventureProps {
    player : Player;
    setPlayer : Function;
    enemies : Entity[];
    setGainLevels : Function;
    getSuccessBonus : Function;
    getEffectBonus : Function;
    msg : string;
    setMsg : Function;
    shopping : boolean;
    setShopping : Function;
}

export default function Adventure({player, setPlayer, enemies, setGainLevels, getSuccessBonus, getEffectBonus, msg, setMsg, shopping, setShopping}: AdventureProps) {
    const [enemy, setEnemy] = useState(enemies[0]);
    const [betweenBattles, setBetweenBattles] = useState(false);
    const [starting, setStarting] = useState(true);
    const [tempGainLevels, setTempGainLevels] = useState(0);
    const [levelUp, setLevelUp] = useState(false);
    const hpBoost = getHPBoost(player);
    const mpBoost = getMPBoost(player);

    function getDefense(player : Player){
        let result = 10 + player.speed + player.armor;
        for(let i=0; i < player.equipList.length; i++){
            const equip = player.equipList[i];
            if(equip.targetStat === "ARMOR"){
                result += equip.effect;
            }
        }
        return result;
    }
    function getHPBoost(player: Player){
        let result = 0;
        for(let i=0; i < player.equipList.length; i++){
            const equip = player.equipList[i];
            if(equip.targetStat === "HP"){
                result += equip.effect;
            }
        }
        return result;
    }
    function getMPBoost(player: Player){
        let result = 0;
        for(let i=0; i < player.equipList.length; i++){
            const equip = player.equipList[i];
            if(equip.targetStat === "MP"){
                result += equip.effect;
            }
        }
        return result;
    }

    function actionSelected(playerAction : Move){
        let enemyTurn = false;
        let playerEffect = 0;
        let enemyEffect = 0;
        let escaped = false;
        let tempMsg = msg;
        let tempPlayer = player;
        let tempEnemy = enemy;
        let tempTempGainLevels = 0;

        function isActionSuccess(action : Action, active : Entity, target : Entity){
            if(action.target === 'SELF'){
                return true;
            }
            const successBonus = getSuccessBonus(action, active);
            const atkRoll = Math.floor(Math.random() * 20) + 1 + successBonus;
            const defense = target === player ? getDefense(player) : 10 + enemy.speed + enemy.armor;
            if(atkRoll >= defense){
                return true;
            }
            return false;
        }
        function getEffect(action : Action, active : Entity){
            let totalEffect= 0;
            if(action.effectRoll){
                for(let i = 0; i < action.effectRoll.quantity; i++){
                    totalEffect += Math.floor(Math.random() * (action.effectRoll.rangeMax - action.effectRoll.rangeMin + 1)) + action.effectRoll.rangeMin;
                }
            }
            totalEffect += getEffectBonus(action, active);
            return action.statIncrease ? totalEffect : -totalEffect;
        }
        function tryRunAway(move : Move, active : Entity, nonActive : Entity){
            const escapeRoll = Math.floor(Math.random() * 20) + 1 + getSuccessBonus(move, active);
            const catchRoll = Math.floor(Math.random() * 20) + 1 + nonActive.speed;
            if(escapeRoll > catchRoll) {
                return true;
            }
            else {
                return false;
            }
        }
        function hasEnoughMP(move : Move, active : Entity){
            const activeMP = active === player ? active.currMP + mpBoost : active.currMP;
            if(move.mpCost > activeMP){
                return false;
            }
            return true;
        }
        function doAction(action : Action, active : Entity){
            const target : Entity = (action.target === 'OTHER' && active === player) || (action.target === 'SELF' && active === enemy) ? enemy : player;
            let effect = 0;
            tempMsg += `\n${active.name} used ${action.name}...`;
            if(action.effectRoll && isActionSuccess(action, active, target)){
                effect = getEffect(action, active);
                if(effect > 0){
                    tempMsg += `\n${target.name}'s ${action.targetStat} was increased by ${effect}!`;
                }
                else if(effect < 0){
                    tempMsg += `\n${target.name}'s ${action.targetStat} was reduced by ${Math.abs(effect)}!`;
                }
                else {
                    tempMsg += `\nNo effect!`;
                }
            }
            else{
                tempMsg += `\n${active.name}'s attack missed!`;
            }
            return effect;
        }
        function handlePlayerEffect(action : Action, effect : number){
            if(action.target === 'OTHER'){
                tempPlayer = {...player, currMP: (player.currMP - action.mpCost)};
                if(action.targetStat === 'HP'){
                    tempEnemy = {...enemy, currHP: (enemy.currHP + effect)};
                }
                else if(action.targetStat === 'MP'){
                    tempEnemy = {...enemy, currMP: (enemy.currMP + effect)};
                }
            }
            else{
                if(action.targetStat === 'HP'){
                    tempPlayer = {...player, currHP: player.currHP + effect, currMP: (player.currMP - action.mpCost)};
                }
                else if(action.targetStat === 'MP'){
                    tempPlayer = {...player, currMP: (player.currMP - action.mpCost + effect)};
                }
            }
        }
        function handleEnemyEffect(action : Action, effect : number){
            if(action.target === 'OTHER'){
                tempEnemy = {...tempEnemy, currMP: (tempEnemy.currMP - action.mpCost)};
                if(action.targetStat === 'HP'){
                    tempPlayer = {...tempPlayer, currHP: (tempPlayer.currHP + effect)};
                    console.log("TEMPPLAYERHP: " + tempPlayer.currHP);
                }
                else if(action.targetStat === 'MP'){
                    tempPlayer = {...tempPlayer, currMP: (tempPlayer.currMP + effect)};
                }
            }
            else{
                if(action.targetStat === 'HP'){
                    tempEnemy = {...tempEnemy, currHP: tempEnemy.currHP + effect, currMP: (tempEnemy.currMP - action.mpCost)};
                }
                else if(action.targetStat === 'MP'){
                    tempEnemy = {...tempEnemy, currMP: (tempEnemy.currMP - action.mpCost + effect)}
                }
            }
        }
        function handleResult(){
            const playerDown = tempPlayer.currHP + hpBoost <= 0;
            const enemyDown = tempEnemy.currHP <= 0;
            if(escaped || playerDown || enemyDown){
                if(escaped || !playerDown){
                    if(!escaped){
                        tempMsg += `\n${player.name} defeated ${enemy.name}!`;
                        tempMsg += `\nGained ${enemy.xp}XP and ${enemy.gp}GP!`;
                        tempPlayer = {...tempPlayer, gp: tempPlayer.gp + enemy.gp, xp: tempPlayer.xp + enemy.xp};
                        const earnedLevel = getEarnedLevel(tempPlayer.xp);
                        if(tempPlayer.level < earnedLevel){
                            tempTempGainLevels = earnedLevel - tempPlayer.level;
                        }
                    }
                    if(!(tempTempGainLevels > 0)){
                        setBetweenBattles(true);
                    } 
                    else{
                        setTempGainLevels(tempTempGainLevels);
                        setLevelUp(true);
                    } 
                }
                else {
                    tempMsg += `\n${player.name} was defeated by ${enemy.name}!`;
                }
            }
            setEnemy(tempEnemy);
            setPlayer(tempPlayer);
            if(tempGainLevels > 0) {
                setLevelUp(true);
            }
            setMsg(tempMsg);
            console.log(tempMsg); 
        }

        if(player.currHP + hpBoost> 0){
            // Player Turn
            if(hasEnoughMP(playerAction, player)){
                if(playerAction.type === "FLEE"){
                    escaped = tryRunAway(playerAction, player, enemy);
                    if(escaped){
                        tempMsg += `\n${player.name} escaped from ${enemy.name}!`;
                    }
                    else{
                        tempMsg += `\n${player.name} was not able to get away!`;
                        enemyTurn = true;
                    }
                }
                else{
                    playerEffect = doAction(playerAction as Action, player);
                    handlePlayerEffect(playerAction as Action, playerEffect);
                    enemyTurn = true;
                }
            }
            else{
                tempMsg += "\nInsufficient MP!";
            }
            setMsg(tempMsg);
            console.log(tempMsg);

            // Enemy Turn
            if(enemyTurn && tempEnemy.currHP > 0){
                setTimeout(() =>{
                    let randomIndex = Math.floor(Math.random() * enemy.actionList.length);
                    let enemyAttack = enemy.actionList[randomIndex];
                    while(!hasEnoughMP(enemyAttack, enemy)){
                        randomIndex = Math.floor(Math.random() * enemy.actionList.length);
                        enemyAttack = enemy.actionList[randomIndex];
                    }
                    enemyEffect = doAction(enemyAttack as Action, enemy);
                    handleEnemyEffect(enemyAttack as Action, enemyEffect);
                    handleResult(); 
                }, 100);
            }
            else{
                handleResult();
            }
        }
    }

    function getEnemy(){
        // Find enemies with levels within one level above or below the player's level
        const levelRange = 1;
        const filteredEnemies = enemies.filter(enemy =>
          Math.abs(enemy.level - player.level) <= levelRange
        );
      
        // Select a random enemy from the filtered list
        const randomIndex = Math.floor(Math.random() * filteredEnemies.length);
        return filteredEnemies[randomIndex];
    }

    function nextBattle() {
        // Update state with the selected enemy
        const nextEnemy = getEnemy();
        setEnemy(nextEnemy);
      
        // Update message
        setMsg(msg + `\n${nextEnemy.name} appeared!`);
      
        // Reset between battles flag
        setBetweenBattles(false);
    }
    
    function startAdventure(){
        nextBattle();
        setStarting(false);
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
        <div className="relative flex flex-col gap-4 w-full bg-white text-center">
            {betweenBattles && !levelUp && (
                <div className="absolute inset-x-0 inset-y-0 flex justify-center items-center bg-white bg-opacity-75">
                    <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">You Survived!</h1>
                    <Button buttonText="Next Battle!" className="w-full mb-4" onClick={nextBattle} />
                    <Button buttonText="Go Shopping!" className="w-full" onClick={() => setShopping(true)} />
                    </div>
                </div>
            )}
            {starting && (
                <div className="absolute inset-x-0 inset-y-0 flex justify-center items-center bg-white bg-opacity-75">
                    <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">Time to adventure!</h1>
                    <Button buttonText="Next Battle!" className="w-full" onClick={startAdventure} />
                    </div>
                </div>
            )}
            {levelUp && getEarnedLevel(player.xp)< 5 && (
                <div className="absolute inset-x-0 inset-y-0 flex justify-center items-center bg-white bg-opacity-75">
                    <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">You reached enough XP to level up!</h1>
                    <Button buttonText="Level up!" className="w-full" onClick={() => setGainLevels(tempGainLevels)} />
                    </div>
                </div>
            )}
            {levelUp && getEarnedLevel(player.xp) >= 5 && (
                <div className="absolute inset-x-0 inset-y-0 flex justify-center items-center bg-white bg-opacity-75">
                    <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">You reached level 5! You win!</h1>
                    </div>
                </div>
            )}
            <div className="flex w-full gap-4">
                <div className="flex-col w-full md:w-1/3 border border-black rounded-lg p-2">
                    <h1 className="text-xl font-bold mb-4">Attacks</h1>
                    <ActionList player={player} actionSelected={actionSelected} />
                </div>
                <div className="flex flex-col md:w-1/3 justify-center">
                    <PlayerStats player={player}/>
                    {!starting && <EnemyStats enemy={enemy} />}
                </div>
                <div className="flex w-full gap-4 md:w-1/3">
                    <div className="w-1/3 border border-black rounded-lg p-2">
                        <h1 className="text-xl font-bold">Equipment</h1>
                        <EquipList player={player} actionSelected={() => {}} />
                    </div>
                    <div className="w-2/3 border border-black rounded-lg p-2">
                        <h1 className="text-xl font-bold">Items</h1>
                        <ItemList player={player} actionSelected={actionSelected} />
                    </div>
                </div>
            </div>
        </div>
    );
    
    
    
}