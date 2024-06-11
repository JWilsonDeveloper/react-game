//'use client'

import { Player, Action, Entity, Equipment } from './lib/definitions';
import MyGame from './ui/my-game';
import { getEquipment, getActions, getEnemies } from '@/app/lib/data';

export default async function Page() {
  const equipment = await getEquipment();
  const actions = await getActions();
  const items = actions.filter(action => action.type === "HP Potion" || action.type === "MP Potion" || action.type === "Scroll");
  const abilities = actions.filter(action => action.type === "MELEE" || action.type === "RANGED" || action.type ===  "SPELL" || action.type === "FLEE");
  const enemies = await getEnemies();
  enemies.forEach(element => {
    if(element.name === "Dragon"){
      element.abilityList.forEach(ability => {
        console.log(ability);
      });
    }
  });

  const actionList0 : Action[] = [actions[0], actions[1], actions[2], actions[9]];
  const itemList0 : Action[] = [{...items[0]}];
  const equipList0 : Equipment[] = [equipment[0], equipment[1]];

  let basePlayer: Player = {
      id: 0,
      imgSrc: "/images/hero.png",
      name: "Player",
      level: 1,
      xp: 0,
      gp: 0,
      ap : 0,
      currHP: 15,
      totalHP: 15,
      currMP: 6,
      totalMP: 6,
      str: 1,
      spd: 1,
      armor: 0,
      abilityList: actionList0,
      itemList: itemList0,
      equipList: equipList0,
    }
    
    function addEquipment(entity : Entity, equipment : Equipment) : Entity {
      switch(equipment.stat) {
        case 'HP':
          return {...entity, currHP : entity.currHP + equipment.effect, totalHP : entity.totalHP + equipment.effect};
        case 'MP':
        return {...entity, currMP : entity.currMP + equipment.effect, totalMP : entity.totalMP + equipment.effect};
        case 'ARM':
          return {...entity, armor : entity.armor + equipment.effect};
        case 'SPD':
          return {...entity, spd : entity.spd + equipment.effect};
        case 'STR':
          return {...entity, str : entity.str + equipment.effect};
        default:
          return entity;
      }
    }

  basePlayer.equipList.forEach(equip => {
    basePlayer = addEquipment(basePlayer, equip) as Player;
  });

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex grow flex-col justify-center bg-black px-2 py-2 md:w-5/5 md:px-20">
        <div className="flex grow flex-col gap-4 md:flex-row">
          <MyGame basePlayer={basePlayer} enemies={enemies} items={items} moves={abilities} equipment={equipment} />
        </div>
      </div>
    </main>
  );
}
