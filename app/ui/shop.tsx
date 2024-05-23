import { Player, Item, Move, Action, Equipment } from "../lib/definitions";
import Image from "next/image";
import XPBar from "@/app/ui/xp-bar";
import { Button } from "@/app/ui/button";
import { useState } from "react";
import MoveButton from "@/app/ui/move-button";
import MoveList from "./move-list";
import ActionList from "./action-list";
import DownArrow from "./down-arrow";
import ItemList from "@/app/ui/item-list";
import EquipList from "@/app/ui/equip-list";
import Equip from "@/app/ui/equip";
import React from "react";
import RightArrow from "@/app/ui/right-arrow";

interface ShoppingProps {
    player : Player;
    setPlayer : Function;
    items : Item[];
    equipment : Equipment[];
    setShopping : Function;
    msg : string;
    setMsg : Function;
}

export default function Shopping({player, setPlayer, items, setShopping, equipment, msg, setMsg} : ShoppingProps) {
    const [tempPlayer, setTempPlayer] = useState(player);

    function doneShopping(){
        setPlayer(tempPlayer);
        setShopping(false);
    }

    function buyItem(item : Item){
        if(tempPlayer.gp >= item.cost){
            let updatedItemList;
            // Check tempItemList's items for item.id
            const itemExists = tempPlayer.itemList.some((tempItem) => tempItem.id === item.id);
            if (itemExists) {
                // Create a copy of tempItemList with an updated item that has +1 uses
                updatedItemList = tempPlayer.itemList.map((tempItem) => {
                    if (tempItem.id === item.id) {
                    return { ...tempItem, uses: tempItem.uses + 1 };
                    }
                    return tempItem; // Keep other items unchanged
                });
            } 
            else {
                // No matching item found, add to itemList
                updatedItemList = [...tempPlayer.itemList, item];
            }
            setTempPlayer({...tempPlayer, itemList: updatedItemList, gp: tempPlayer.gp - item.cost})
        }
    }

    function buyEquipment(equipment: Equipment) {
        if (!tempPlayer.equipList.some(e => e.id === equipment.id)) {
            if (tempPlayer.gp >= equipment.cost) {
                const oldEquipList = tempPlayer.equipList;
                const newEquipList = [...oldEquipList.slice(0, equipment.slot), equipment, ...oldEquipList.slice(equipment.slot + 1)];
                setTempPlayer({ ...tempPlayer, equipList: newEquipList, gp: tempPlayer.gp - equipment.cost });
                setMsg(msg + `\n${player.name} purchased ${equipment.name}!`);
            } else {
                setMsg(msg + `\nInsufficient GP.`);
            }
        } else {
            setMsg(msg + `\n${player.name} already has ${equipment.name}.`);
        }
    }

    return (
        <div className="flex flex-col w-full text-center gap-4">
            <div className="flex w-full gap-4">
                <div className="flex flex-col w-full md:w-1/3 border border-black rounded-lg p-2 items-center">
                    <h1 className="text-2xl font-bold mb-4">Current Items</h1>
                    <ItemList player={tempPlayer} actionSelected={() => {}} />
                </div>
                <div className="md:w-2/3 border border-black rounded-lg p-2">
                    <div className="grid grid-cols-3 w-full items-end">
                        <h1 className="text-2xl font-bold mb-4 col-start-2">Purchase Items</h1>
                        <h1 className="text-xl font-bold mb-4 col-start-3">GP: {tempPlayer.gp}</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {['HP Potion', 'MP Potion', 'Scroll'].map((title, slot) => (
                            <div key={slot} className="flex flex-col items-center gap-4">
                                <h1 className="text-l font-bold">{title}</h1>
                                {items
                                .filter(item => item.title === title)
                                .map((item, index) => (
                                    <MoveButton
                                    key={index}
                                    move={item}
                                    moveClicked={buyItem}
                                    player={tempPlayer}
                                    showCost={true}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full text-center gap-4">
                <div className="flex flex-col w-full text-center gap-4">
                    <div className="w-full border border-black rounded-lg p-2">
                        <div className="grid grid-cols-3 w-full items-end">
                            <h1 className="text-2xl font-bold mb-4 col-start-2">Purchase Equipment</h1>
                            <h1 className="text-xl font-bold mb-4 col-start-3">GP: {tempPlayer.gp}</h1>
                        </div>
                        <div className="grid grid-rows-2 gap-4">
                            {['Armor', 'Magic Item'].map((title, slot) => (
                                <div key={slot} className="grid grid-cols-6 items-center gap-4">
                                    <h1 className="text-sm font-bold" style={{ minWidth: '5rem' }}>{title}</h1>
                                    {equipment.filter(e => 
                                        e.slot === slot && 
                                        tempPlayer.equipList[slot] &&
                                        e.cost >= tempPlayer.equipList[slot].cost
                                    ).map((e, index) => (
                                        <React.Fragment key={index}>
                                            <Equip
                                                key={index}
                                                player={player}
                                                equipment={e}
                                                showContentBelow={false}
                                                showCost={index !== 0}
                                                equipClicked={buyEquipment}
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
            
            <div className="flex justify-center mt-4">
                <Button buttonText="Done Shopping!" className="w-1/3" onClick={doneShopping} />
            </div>  
        </div>
    )
}
