import { Player, Entity, Action, Equipment } from "../lib/definitions";
import Image from "next/image";
import XPBar from "@/app/ui/xp-bar";
import { Button } from "@/app/ui/button";
import { useState } from "react";
import DownArrow from "./down-arrow";
import EquipList from "@/app/ui/equip-list";
import Equip from "@/app/ui/equip";
import React from "react";
import RightArrow from "@/app/ui/right-arrow";
import ItemTable from "@/app/ui/item-table";
import ShopTabs from "@/app/ui/shop-tabs";

interface ShoppingProps {
    player : Player;
    setPlayer : Function;
    items : Action[];
    equipment : Equipment[];
    setShopping : Function;
    msg : string;
    setMsg : Function;
    getTier : Function;
}

export default function Shopping({player, setPlayer, items, setShopping, equipment, msg, setMsg, getTier} : ShoppingProps) {
    function doneShopping(){
        setShopping(false);
    }

    function buyItem(item : Action){
        // Get player's updated itemList
        let updatedItemList;

        // Check player's itemList's items for item.id
        const playerHasItem = player.itemList.some((tempItem) => tempItem.id === item.id);
        if (playerHasItem) {
            // Create a copy of itemList with an updated item that has +1 uses
            updatedItemList = player.itemList.map((i) => {
                if (i.id === item.id && i.uses != undefined && item.uses != undefined) {
                    return { ...i, uses: i.uses + item.uses};
                }
                return i; // Keep other items unchanged
            });
        } 
        else {
            // No matching item found, add copy of item to itemList
            updatedItemList = [...player.itemList, {...item}];
        }

        // Set player's updated itemList
        setPlayer({...player, itemList: updatedItemList, gp: player.gp - item.cost})

        setMsg(msg + `\n${player.name} purchased ${item.name}!`);
    }

    function handleBuyItem(item : Action){
        // Check GP
        if(player.gp >= item.cost){
            const confirmed = window.confirm(`Are you sure you want to buy ${item.name}?`);
            if(confirmed){
                buyItem(item);
            } 
        }
        else {
            setMsg(msg + "\nInsufficient GP!");
        }
    }

    function buyEquipment(newEquip: Equipment) {
        let playerCopy = {...player};
        const oldEquip = playerCopy.equipList.find(e => e.type === newEquip.type);

        // If there's old equipment of the same type, remove it
        if (oldEquip) {
            playerCopy = removeEquipment(playerCopy, oldEquip);
            playerCopy.equipList = playerCopy.equipList.filter(e => e.id !== oldEquip.id);
        }

        // Add the new equipment
        playerCopy = addEquipment(playerCopy, newEquip);
        playerCopy.equipList = [...playerCopy.equipList, newEquip];
        playerCopy.gp -= newEquip.cost;

        setPlayer(playerCopy);
        setMsg(msg + `\n${player.name} purchased ${newEquip.name}!`);
    }

    function handleBuyEquipment(equip : Equipment){
        if (!player.equipList.some(e => e.id === equip.id)) {
            if (player.gp >= equip.cost) {
                let confirmed;
                const replacedEquip = player.equipList.find(e => e.type === equip.type);
                if(replacedEquip){
                    confirmed = window.confirm(`Are you sure you want to buy ${equip.name}?\nIt will replace your current ${equip.type}: ${replacedEquip.name}`); 
                }
                else{
                    confirmed = window.confirm(`Are you sure you want to buy ${equip.name}?`); 
                }
                if (confirmed) {
                    buyEquipment(equip);
                }
            } 
            else {
                setMsg(msg + `\nInsufficient GP.`);
            }
        } 
        else {
            setMsg(msg + `\n${player.name} already has ${equip.name}.`);
        }
    }
    
    function addEquipment(player: Player, equipment: Equipment): Player {
        switch(equipment.stat) {
            case 'HP':
                return {...player, currHP: player.currHP + equipment.effect, totalHP: player.totalHP + equipment.effect};
            case 'MP':
                return {...player, currMP: player.currMP + equipment.effect, totalMP: player.totalMP + equipment.effect};
            case 'ARM':
                return {...player, armor: player.armor + equipment.effect};
            case 'SPD':
                return {...player, spd: player.spd + equipment.effect};
            case 'STR':
                return {...player, str: player.str + equipment.effect};
            default:
                return player;
        }
    }
    
    function removeEquipment(player: Player, equipment: Equipment): Player {
        switch(equipment.stat) {
            case 'HP':
                return {...player, currHP: player.currHP - equipment.effect, totalHP: player.totalHP - equipment.effect};
            case 'MP':
                return {...player, currMP: player.currMP - equipment.effect, totalMP: player.totalMP - equipment.effect};
            case 'ARM':
                return {...player, armor: player.armor - equipment.effect};
            case 'SPD':
                return {...player, spd: player.spd - equipment.effect};
            case 'STR':
                return {...player, str: player.str - equipment.effect};
            default:
                return player;
        }
    }
    

    return (
        <div className="flex flex-col w-full text-center bg-white gap-4 border border-black rounded-lg p-2">
            <div className="flex flex-col w-full items-center">
                <h1 className="text-2xl font-bold mb-2">Purchase Items and Equipment</h1>
                <h1 className="text-xl font-bold">GP: {player.gp}</h1>
            </div>
            <div>
                <ShopTabs player={player} itemSelected={handleBuyItem} equipSelected={handleBuyEquipment} items={items} equips={equipment} getTier={getTier} />
            </div>
            <div className="flex justify-center">
                <Button buttonText="Done Shopping!" className="w-1/3" onClick={doneShopping} />
            </div>  
        </div>
    )
}
