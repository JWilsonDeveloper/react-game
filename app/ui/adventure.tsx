'use client'

import React, { useState } from "react";
import EntityStats from '@/app/ui/entity-stats';
import { Effect, Action, Player, Entity, Turn } from '@/app/lib/definitions';
import {Button} from "@/app/ui/button";
import AdventureTabs from "@/app/ui/adventure-tabs";
import CombatRound from "./combat-round";

interface AdventureProps {
    player: Player;
    setPlayer: Function;
    enemy: Entity;
    setEnemy: Function;
    enemies: Entity[];
    msg: string;
    setMsg: Function;
    setShopping: Function;
    getTier: Function;
    getEarnedLevel: Function;
    adventureState: string;
    setAdventureState: Function;
    levelUp: Function;
  }

  export default function Adventure({
    player,
    setPlayer,
    enemy,
    setEnemy,
    enemies,
    msg,
    setMsg,
    setShopping,
    getTier,
    getEarnedLevel,
    adventureState,
    setAdventureState,
    levelUp
  }: AdventureProps) {
    const [showOverlay, setShowOverlay] = useState(false);
    const defaultPlayerTurn : Turn = {entity : player, moveString: "", resultString: "", success: false, action: player.abilityList[0]};
    const defaultEnemyTurn : Turn = {entity : enemy, moveString: "", resultString: "", success: false, action: enemy.abilityList[0]};
    const [round, setRound] = useState({playerTurn : defaultPlayerTurn, enemyTurn : defaultEnemyTurn});
    const [gainLevelsCopy, setGainLevelsCopy] = useState(0);

    function actionSelected(playerAction : Action){
        let tempMsg = msg;
        let escaped = false;
        let playerCopy = {...player};
        let enemyCopy = {...enemy};
        let tempGainLevels = 0;
        let playerTurn : Turn = defaultPlayerTurn;
        let enemyTurn : Turn = defaultEnemyTurn;

        function getSuccessRoll(action: Action, isPlayerTurn : boolean) {
            let minimum;
            if (action.type === 'FLEE') {
                minimum = Math.floor(Math.random() * 20) + 1 + (isPlayerTurn ? enemyCopy.spd : playerCopy.spd);
            } else {
                minimum = isPlayerTurn ?  10 + enemyCopy.spd + enemyCopy.armor : 10 + playerCopy.spd + playerCopy.armor;
            }
            const bonus = isPlayerTurn ? getSuccessBonus(action, playerCopy) : getSuccessBonus(action, enemyCopy);
            const roll = Math.floor(Math.random() * 20) + 1;
            const total = roll + bonus;
            return {minimum : minimum, bonus : bonus, roll : roll, total : total};
        }

        function getSuccessBonus(move : Action, entity : Entity) : number{
            let bonus = 0;
            if(move.successBonus){
                bonus += move.successBonus;
            }
            if(move.skillBonus){
                if(move.skillBonus.type === "SUCCESS"){
                    bonus += move.skillBonus.skill === "SPD" ? move.skillBonus.multiplier * entity.spd : move.skillBonus.multiplier * entity.str;
                }
            }
            return bonus;
        }

        function getEffectBonus(action : Action, entity : Entity) : number{
            let bonus = 0;
            if(action.effect?.effectBonus){
                bonus += action.effect.effectBonus;
            }
            if(action.skillBonus){
                if(action.skillBonus.type === "EFFECT"){
                    bonus += action.skillBonus.skill === "STR" ? action.skillBonus.multiplier * entity.str : action.skillBonus.multiplier * entity.spd;
                }
            }
            return bonus;
        }

        function getStatChange(action : Action, actionEffect : Effect, active : Entity, critical : boolean) {
            let statChange = 0;
            if(actionEffect.effectRoll){
                for(let i = 0; i < actionEffect.effectRoll.quantity; i++){
                    statChange += Math.floor(Math.random() * (actionEffect.effectRoll.rangeMax - actionEffect.effectRoll.rangeMin + 1)) + actionEffect.effectRoll.rangeMin;
                }
            }
            statChange += getEffectBonus(action, active);

            // Double the effect on critical success
            if(critical){
                statChange *= 2;
            }

            return actionEffect.statIncrease ? statChange : -statChange;
        }

        function applyStatChange(actionEffect: Effect, effect: number, isPlayer: boolean) {
            let tempSelf: Player | Entity = isPlayer ? playerCopy : enemyCopy;
            let tempOther: Player | Entity = isPlayer ? enemyCopy : playerCopy;
    
            if (actionEffect.target === 'OTHER') {
                if (actionEffect.stat === 'HP') {
                    tempOther.currHP += effect;
                } else if (actionEffect.stat === 'MP') {
                    tempOther.currMP += effect;
                }
            } else {
                if (actionEffect.stat === 'HP') {
                    tempSelf.currHP += effect;
                } else if (actionEffect.stat === 'MP') {
                    tempSelf.currMP += effect;
                }
            }
            if (isPlayer) {
                playerCopy = tempSelf as Player;
                enemyCopy = tempOther as Entity;
            } else {
                enemyCopy = tempSelf as Entity;
                playerCopy = tempOther as Player;
            }
        }        
        function handleResult(){
            tempMsg += `\n${playerTurn.moveString}`;
            tempMsg += `\n${playerTurn.resultString}`;
            if(enemyTurn.moveString !== ""){
                tempMsg += `\n${enemyTurn.moveString}`;
                tempMsg += `\n${enemyTurn.resultString}`;
            }
            const playerDown = playerCopy.currHP <= 0;
            const enemyDown = enemyCopy.currHP <= 0;
            if(escaped || playerDown || enemyDown){
                if(escaped || !playerDown){
                    if(!escaped){
                        tempMsg += `\n${playerCopy.name} defeated ${enemy.name}!`;
                        tempMsg += `\nGained ${enemy.xp}XP and ${enemy.gp}GP!`;
                        playerCopy = {...playerCopy, gp: playerCopy.gp + enemy.gp, xp: playerCopy.xp + enemy.xp};
                        const earnedLevel = getEarnedLevel(playerCopy.xp);
                        if(playerCopy.level < earnedLevel){
                            tempGainLevels = earnedLevel - playerCopy.level;
                        }
                    }
                    if(!(tempGainLevels > 0)){
                        if(escaped){
                            setAdventureState('escaped');
                        }
                        else{
                            setAdventureState('victory');
                        }
                    } 
                    else{
                        setGainLevelsCopy(tempGainLevels);
                        setAdventureState('levelUp');
                    } 
                }
                else {
                    tempMsg += `\n${playerCopy.name} was defeated by ${enemyCopy.name}!`;
                    setAdventureState('gameOver');
                }
            }
            setRound({playerTurn: playerTurn, enemyTurn: enemyTurn});
            setShowOverlay(true);
            setEnemy(enemyCopy);
            setPlayer(playerCopy);
        }

        function getEnemyAction() : Action {
            // Select a random ability
            let randomIndex = Math.floor(Math.random() * enemy.abilityList.length);
            while(enemyCopy.abilityList[randomIndex].mpCost > enemyCopy.currMP){
                randomIndex = Math.floor(Math.random() * enemy.abilityList.length);
            }
            return enemyCopy.abilityList[randomIndex];
        }

        function handleTurn(action : Action, isPlayerTurn: boolean) : Turn {
            const active = isPlayerTurn ? playerCopy : enemyCopy;

            // Get success
            let success : boolean;
            let successRoll;
            if(action.effect && action.effect.target === 'SELF'){
                // Automatically succeed if targeting self
                success = true;
            }
            else{
                // Get successRoll
                successRoll = getSuccessRoll(action, isPlayerTurn);
                success = successRoll.roll === 20 || successRoll.total >= successRoll.minimum;
            }

            // Reduce MP
            active.currMP -= action.mpCost;

            // Get statChange and apply it to the stats
            let statChange = 0;
            if(success) {
                if(action.effect){
                    // On a success, get the statChange if the action has an effect
                    const critical : boolean = successRoll?.roll === 20 ?? false;
                    statChange = getStatChange(action, action.effect, active, critical);

                     // Update stats
                    applyStatChange(action.effect, statChange, isPlayerTurn);
                }
                else{
                    escaped = true;
                }
            }

            // Get moveString
            const moveString = `${active.name} used ${action.name}!`;
            
            // Get resultString
            let resultString;
            if(action.effect){
                if(success){
                    const targetEntity : Entity = (action.effect.target === 'OTHER' && active === playerCopy) || (action.effect.target === 'SELF' && active === enemyCopy) ? enemyCopy : playerCopy;
                    resultString = 
                        statChange !== 0 
                        ?   statChange > 0
                            ?   `${targetEntity.name}'s ${action.effect.stat} was increased by ${Math.abs(statChange)}!`
                            :   `${targetEntity.name}'s ${action.effect.stat} was reduced by ${Math.abs(statChange)}!`
                        :   `\nNo effect!`;
                }
                else {
                    resultString = `${active.name} missed!`
                }
            }
            else {
                if(success){
                    resultString = `${active.name} escaped!`;
                }
                else{
                    resultString = `${active.name} couldn't escape!`;
                }
            }
            // Construct and return the Turn object
            const turn: Turn = {
                entity: active,
                action: action,
                moveString: moveString,
                resultString: resultString,
                success: success,
                statChange: statChange,
                ...(successRoll && { successRoll: successRoll }) // Include successRoll if it exists
            };
            return turn;
        }
        
        if(playerCopy.currMP < playerAction.mpCost){
            tempMsg += "\nInsufficient MP!";
        }
        else if(playerCopy.currHP <= 0){
            tempMsg += "\nPlayer defeated!";
        }
        else{
            playerTurn = handleTurn(playerAction, true);
            if(enemyCopy.currHP > 0 && !escaped) {
                const enemyAction = getEnemyAction();
                enemyTurn = handleTurn(enemyAction, false);
            }
            handleResult();
        }

        // Print messages
        setMsg(tempMsg);
        console.log(tempMsg);
    }

    function getEnemy() {
        // Find enemies with levels within one level above or below the player's level
        const levelRange = 1;
        const filteredEnemies = enemies.filter(enemy =>
            Math.abs(enemy.level - player.level) <= levelRange
        );
      
        let enemyLevel : number = 1;
        if (player.level === 1) {
            // Special case when player's level is 1
            const rand = Math.random();
            if (rand < 0.8) {
                enemyLevel = player.level; // 80% chance of same level
            } else {
                enemyLevel = player.level + 1; // 20% chance of one level higher
            }
        } else {
            const rand = Math.random();
            if (rand < 0.6) {
                enemyLevel = player.level; // 60% chance of same level
            } else if (rand < 0.8) {
                enemyLevel = player.level - 1; // 20% chance of one level lower
            } else {
                enemyLevel = player.level + 1; // 20% chance of one level higher
            }
        }
      
        // Filter enemies again based on the selected enemy level
        const suitableEnemies = filteredEnemies.filter(enemy => enemy.level === enemyLevel);
      
        // Select a random enemy from the suitable list
        const randomIndex = Math.floor(Math.random() * suitableEnemies.length);
        return suitableEnemies[randomIndex];
      }
      

    function nextBattle() {
        // Update state with the selected enemy
        const nextEnemy = getEnemy();
        setEnemy(nextEnemy);
      
        // Update message
        setMsg(msg + `\n------------------------------------\n${nextEnemy.name} appeared!`);
      
        // Reset between battles flag
        setAdventureState('');
    }
    
    function startAdventure(){
        nextBattle();
        setAdventureState('');
    }

    return (
        <div className="relative flex flex-col gap-4 w-full text-center bg-black rounded-lg">
            {adventureState === 'escaped' && (
                <div className="absolute inset-0 z-10 flex justify-center items-center bg-white rounded-lg bg-opacity-75">
                <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">You escaped!</h1>
                    <Button buttonText="Next Battle!" className="w-full mb-4" onClick={nextBattle} />
                    <Button buttonText="Go Shopping!" className="w-full" onClick={() => setShopping(true)} />
                </div>
                </div>
            )}
            {adventureState === 'victory' && (
                <div className="absolute inset-0 z-10 flex justify-center items-center bg-white rounded-lg bg-opacity-75">
                <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">Victory!</h1>
                    <Button buttonText="Next Battle!" className="w-full mb-4" onClick={nextBattle} />
                    <Button buttonText="Go Shopping!" className="w-full" onClick={() => setShopping(true)} />
                </div>
                </div>
            )}
            {adventureState === 'starting' && (
                <div className="absolute inset-0 z-10 flex justify-center items-center bg-white rounded-lg bg-opacity-75">
                <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">Time to adventure!</h1>
                    <Button buttonText="Next Battle!" className="w-full" onClick={startAdventure} />
                </div>
                </div>
            )}
            {adventureState === 'levelUp' && getEarnedLevel(player.xp) < 5 && (
                <div className="absolute inset-0 z-10 flex justify-center items-center bg-white bg-opacity-75">
                <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">You reached enough XP to level up!</h1>
                    <Button buttonText="Level up!" className="w-full" onClick={() => levelUp(gainLevelsCopy)} />
                </div>
                </div>
            )}
            {adventureState === 'levelUp' && getEarnedLevel(player.xp) >= 5 && (
                <div className="absolute inset-0 z-10 flex justify-center items-center bg-white bg-opacity-75">
                <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">You reached level 5! You win!</h1>
                </div>
                </div>
            )}
            {adventureState === 'gameOver' && (
                <div className="absolute inset-0 z-10 flex justify-center items-center bg-white bg-opacity-75">
                <div className="flex-col w-1/3">
                    <h1 className="text-xl font-bold mb-4">{player.name} was defeated by {enemy.name}</h1>
                </div>
                </div>
            )}
            <div className="flex flex-col md:flex-row w-full gap-4">
                <div className="flex-col border-black md:w-2/3 rounded-lg h-full">
                    <AdventureTabs player={player} actionSelected={actionSelected} getTier={getTier} />
                </div>
                <div className="flex sm:gap-4 md:w-1/3 rounded-lg justify-center">
                    <div className="bg-white rounded-lg w-1/2">
                        <EntityStats entity={player} />
                    </div>
                    <div className="bg-white rounded-lg w-1/2">
                        {adventureState !== 'starting' && <EntityStats entity={enemy} />}
                    </div>
                </div>
            </div>
            {showOverlay && (
                <div
                    className="fixed inset-0 z-10 flex items-center justify-center bg-black"
                    style={{ whiteSpace: "pre-wrap" }} // Ensure new lines are preserved
                    >
                    <div className="flex-col text-center">
                        <CombatRound round={round} setShowOverlay={setShowOverlay}/>
                    </div>
                </div>
            )}
        </div>
      );
      
    
    
    
}