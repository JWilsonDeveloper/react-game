'use client'

import React, { useState } from "react";
import PlayerStats from '@/app/ui/player-stats';
import EntityStats from '@/app/ui/entity-stats';
import { Move, Action, Player, Entity, Turn } from '@/app/lib/definitions';
import {Button} from "@/app/ui/button";
import AdventureTabs from "@/app/ui/adventure-tabs";
import CombatEntity from "@/app/ui/combat-entity";
import CombatRound from "./combat-round";

interface AdventureProps {
    player : Player;
    setPlayer : Function;
    enemies : Entity[];
    setGainLevels : Function;
    msg : string;
    setMsg : Function;
    setShopping : Function;
    getTier : Function;
    getEarnedLevel : Function;
}

export default function Adventure({player, setPlayer, enemies, setGainLevels, msg, setMsg, setShopping, getTier, getEarnedLevel} : AdventureProps) {
    const [enemy, setEnemy] = useState(enemies[0]);
    const [adventureState, setAdventureState] = useState('starting');
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayText, setOverlayText] = useState("");
    const [playerTurn, setPlayerTurn] = useState({entityName : "", moveString: "", resultString: ""});
    const [enemyTurn, setEnemyTurn] = useState({entityName : "", moveString: "", resultString: ""});
    const [tempGainLevels, setTempGainLevels] = useState(0);
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
        let isEnemyTurn = false;
        let playerEffect = 0;
        let enemyEffect = 0;
        let escaped = false;
        let tempMsg = msg;
        let tempPlayer = player;
        let tempEnemy = enemy;
        let tempTempGainLevels = 0;
        let tempPlayerTurn : Turn = {entityName : player.name, moveString: "", resultString: ""};
        let tempEnemyTurn : Turn = {entityName : enemy.name, moveString: "", resultString: ""};

        function isActionSuccess(action : Action, active : Entity, target : Entity){
            if(action.target === 'SELF'){
                return true;
            }
            const successBonus = getSuccessBonus(action, active);
            const atkRoll = Math.floor(Math.random() * 20) + 1;
            const total = atkRoll + successBonus;
            const defense = target === player ? getDefense(player) : 10 + enemy.speed + enemy.armor;
            const turn : Turn = active === player ? tempPlayerTurn : tempEnemyTurn;
            turn.minimum = defense;
            turn.bonus = successBonus;
            turn.roll = atkRoll;
            turn.total = total;
            if(total >= defense){
                turn.success = true;
                return true;
            }
            turn.success = false;
            return false;
        }
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
            const turn : Turn = active === player ? tempPlayerTurn : tempEnemyTurn;
            const catchRoll = Math.floor(Math.random() * 20) + 1 + nonActive.speed;
            const escapeRoll = Math.floor(Math.random() * 20) + 1;
            const bonus = getSuccessBonus(move, active);
            const total = escapeRoll + bonus;
            turn.minimum = catchRoll;
            turn.bonus = bonus;
            turn.roll = escapeRoll;
            turn.total = total;
            if(total > catchRoll) {
                turn.success = true;
                return true;
            }
            else {
                turn.success = false;
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
            const turn : Turn = active === player ? tempPlayerTurn : tempEnemyTurn;
            turn.target = action.target;
            tempMsg += `\n${active.name} used ${action.name}...`;
            turn.moveString = `${active.name} used ${action.name}...`;
            turn.effect = 0;
            const success = isActionSuccess(action, active, target);
            if(success){
                effect = getEffect(action, active);
                turn.effect = effect;
                if(effect > 0){
                    turn.resultString = `${target.name}'s ${action.targetStat} was increased by ${effect}!`
                    tempMsg += `\n${target.name}'s ${action.targetStat} was increased by ${effect}!`;
                }
                else if(effect < 0){
                    turn.resultString = `${target.name}'s ${action.targetStat} was reduced by ${Math.abs(effect)}!`;
                    tempMsg += `\n${target.name}'s ${action.targetStat} was reduced by ${Math.abs(effect)}!`;
                }
                else {
                    turn.resultString = `\nNo effect!`;
                    tempMsg += `\nNo effect!`;
                }
            }
            else{
                tempMsg += `\n${active.name}'s attack missed!`;
                turn.resultString = `${active.name}'s attack missed!`;
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
                        setAdventureState('betweenBattles');
                    } 
                    else{
                        setTempGainLevels(tempTempGainLevels);
                        setAdventureState('levelUp');
                    } 
                }
                else {
                    tempMsg += `\n${player.name} was defeated by ${enemy.name}!`;
                    setAdventureState('gameOver');
                }
            }
            setPlayerTurn(tempPlayerTurn);
            setEnemyTurn(tempEnemyTurn);
            setShowOverlay(true);
            setEnemy(tempEnemy);
            setPlayer(tempPlayer);
            setMsg(tempMsg);
            console.log(tempMsg);
        }

        if(player.currHP + hpBoost> 0){
            // Player Turn
            if(hasEnoughMP(playerAction, player)){
                if(playerAction.type === "FLEE"){
                    tempPlayerTurn.moveString = `${player.name} used ${playerAction.name}!`;
                    tempMsg += `\n${player.name} used ${playerAction.name}!`
                    escaped = tryRunAway(playerAction, player, enemy);
                    if(escaped){
                        tempPlayerTurn.resultString = `${player.name} escaped from ${enemy.name}!`;
                        tempMsg += `\n${player.name} escaped from ${enemy.name}!`;
                    }
                    else{
                        tempPlayerTurn.resultString = `${player.name} was not able to get away!`;
                        tempMsg += `\n${player.name} was not able to get away!`;
                        isEnemyTurn = true;
                    }
                }
                else{
                    playerEffect = doAction(playerAction as Action, player);
                    handlePlayerEffect(playerAction as Action, playerEffect);
                    isEnemyTurn = true;
                }
            }
            else{
                tempMsg += "\nInsufficient MP!";
            }
            setMsg(tempMsg);
            console.log(tempMsg);

            // Enemy Turn
            if(isEnemyTurn && tempEnemy.currHP > 0){
                //setTimeout(() =>{
                    let randomIndex = Math.floor(Math.random() * enemy.actionList.length);
                    let enemyAttack = enemy.actionList[randomIndex];
                    while(!hasEnoughMP(enemyAttack, enemy)){
                        randomIndex = Math.floor(Math.random() * enemy.actionList.length);
                        enemyAttack = enemy.actionList[randomIndex];
                    }
                    enemyEffect = doAction(enemyAttack as Action, enemy);
                    handleEnemyEffect(enemyAttack as Action, enemyEffect);
                    handleResult(); 
                //}, 100);
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
        setAdventureState('');
    }
    
    function startAdventure(){
        nextBattle();
        setAdventureState('');
    }

    return (
        <div className="relative flex flex-col gap-4 w-full text-center bg-black rounded-lg">
            {adventureState === 'betweenBattles' && (
                <div className="absolute inset-0 flex justify-center items-center bg-white rounded-lg bg-opacity-75">
                <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">You Survived!</h1>
                    <Button buttonText="Next Battle!" className="w-full mb-4" onClick={nextBattle} />
                    <Button buttonText="Go Shopping!" className="w-full" onClick={() => setShopping(true)} />
                </div>
                </div>
            )}
            {adventureState === 'starting' && (
                <div className="absolute inset-0 flex justify-center items-center bg-white rounded-lg bg-opacity-75">
                <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">Time to adventure!</h1>
                    <Button buttonText="Next Battle!" className="w-full" onClick={startAdventure} />
                </div>
                </div>
            )}
            {adventureState === 'levelUp' && getEarnedLevel(player.xp) < 5 && (
                <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
                <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">You reached enough XP to level up!</h1>
                    <Button buttonText="Level up!" className="w-full" onClick={() => setGainLevels(tempGainLevels)} />
                </div>
                </div>
            )}
            {adventureState === 'levelUp' && getEarnedLevel(player.xp) >= 5 && (
                <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
                <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">You reached level 5! You win!</h1>
                </div>
                </div>
            )}
            {adventureState === 'gameOver' && (
                <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
                <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">{player.name} was defeated by {enemy.name}</h1>
                </div>
                </div>
            )}
            <div className="flex flex-col md:flex-row w-full gap-4">
                <div className="flex-col border-black md:w-2/3 rounded-lg h-full">
                    <AdventureTabs player={player} actionSelected={actionSelected} getTier={getTier} />
                </div>
                <div className="flex flex-cols-1 gap-4 md:w-1/3 md:flex-cols-2 rounded-lg justify-center">
                    <div className="bg-white rounded-lg">
                        <EntityStats entity={player} />
                    </div>
                    <div className="bg-white rounded-lg">
                        {adventureState !== 'starting' && <EntityStats entity={enemy} />}
                    </div>
                </div>
            </div>
            {showOverlay && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75"
                    style={{ whiteSpace: "pre-wrap" }} // Ensure new lines are preserved
                    >
                    <div className="flex-col text-center">
                        <h1 className="text-xl font-bold mb-4">{overlayText}</h1>
                        <CombatRound player={player} enemy={enemy} playerTurn={playerTurn} enemyTurn={enemyTurn} setShowOverlay={setShowOverlay}/>
                    </div>
                </div>
            )}
        </div>
      );
      
    
    
    
}