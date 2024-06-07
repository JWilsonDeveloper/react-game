'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Player, Action, EffectRoll, Entity, SkillBonus, Equipment } from './lib/definitions';
import Adventure from '@/app/ui/adventure';
import MyGame from './ui/my-game';
import hero from '@/app/images/hero.png';

export default function Page() {
  const e1d4: EffectRoll = {
    id: 0,
    rangeMin: 1,
    rangeMax: 4,
    quantity: 1,
  }
  const e1d6: EffectRoll = {
      id: 1,
      rangeMin: 1,
      rangeMax: 6,
      quantity: 1,
  }
  const e1d8: EffectRoll = {
    id: 2,
    rangeMin: 1,
    rangeMax: 8,
    quantity: 1,
  }
  const e1d10: EffectRoll = {
    id: 3,
    rangeMin: 1,
    rangeMax: 10,
    quantity: 1,
  }
  const e1d12: EffectRoll = {
    id: 4,
    rangeMin: 1,
    rangeMax: 12,
    quantity: 1,
  }
  const e2d4: EffectRoll = {
    id: 5,
    rangeMin: 1,
    rangeMax: 4,
    quantity: 2,
  }
  const e2d6: EffectRoll = {
      id: 6,
      rangeMin: 1,
      rangeMax: 6,
      quantity: 2,
  }
  const e2d8: EffectRoll = {
    id: 7,
    rangeMin: 1,
    rangeMax: 8,
    quantity: 2,
  }
  const e2d10: EffectRoll = {
    id: 8,
    rangeMin: 1,
    rangeMax: 10,
    quantity: 2,
  }
  const e2d12: EffectRoll = {
    id: 9,
    rangeMin: 1,
    rangeMax: 12,
    quantity: 2,
  }
  const e3d4: EffectRoll = {
    id: 10,
    rangeMin: 1,
    rangeMax: 4,
    quantity: 3,
  }
  const e3d6: EffectRoll = {
      id: 11,
      rangeMin: 1,
      rangeMax: 6,
      quantity: 3,
  }
  const e3d8: EffectRoll = {
    id: 12,
    rangeMin: 1,
    rangeMax: 8,
    quantity: 3,
  }
  const e3d10: EffectRoll = {
    id: 13,
    rangeMin: 1,
    rangeMax: 10,
    quantity: 3,
  }
  const e3d12: EffectRoll = {
    id: 14,
    rangeMin: 1,
    rangeMax: 12,
    quantity: 3,
  }
  const e4d4: EffectRoll = {
    id: 15,
    rangeMin: 1,
    rangeMax: 4,
    quantity: 4,
  }
  const e4d6: EffectRoll = {
      id: 16,
      rangeMin: 1,
      rangeMax: 6,
      quantity: 4,
  }
  const e4d8: EffectRoll = {
    id: 17,
    rangeMin: 1,
    rangeMax: 8,
    quantity: 4,
  }
  const e4d10: EffectRoll = {
    id: 18,
    rangeMin: 1,
    rangeMax: 10,
    quantity: 4,
  }
  const e4d12: EffectRoll = {
    id: 19,
    rangeMin: 1,
    rangeMax: 12,
    quantity: 4,
  }

const speed1Flee: SkillBonus = {
  id: 0,
  skill: "SPD",
  multiplier: 1,
  type: "SUCCESS",
}
const speed2Flee: SkillBonus = {
  id: 0,
  skill: "SPD",
  multiplier: 2,
  type: "SUCCESS",
}
const speed2Atk: SkillBonus = {
  id: 1,
  skill: "SPD",
  multiplier: 2,
  type: "SUCCESS",
}
const strength2Dmg: SkillBonus = {
  id: 2,
  skill: "STR",
  multiplier: 2,
  type: "EFFECT",
}


const punch : Action = {
  id: 0,
  name: "Punch",
  type: 'MELEE',
  slot: 0,
  tier: 0,
  skillBonus: speed2Atk,
  successBonus: 1,
  mpCost: 0,
  cost: 0,
  effect: {
    effectRoll: e1d4,
    effectBonus: 0,
    target: 'OTHER',
    stat: 'HP',
    statIncrease: false,
  },
}
const throwRock : Action = {
  id: 1,
  name: "Throw Rock",
  type: 'RANGED',
  slot: 1,
  tier: 0,
  skillBonus: strength2Dmg,
  successBonus: 1,
  mpCost: 0,
  cost: 0,
  effect:{
    effectRoll: e1d4,
    effectBonus: 0,
    target: 'OTHER',
    stat: 'HP',
    statIncrease: false,
  },
}
const magicBlast : Action = {
  id: 2,
  name: "Magic Blast",
  type: 'SPELL',
  slot: 2,
  tier: 0,
  successBonus: 2,
  mpCost: 3,
  cost: 0,
  effect:{
    effectRoll: e2d6,
    effectBonus: 2,
    target: 'OTHER',
    stat: 'HP',
    statIncrease: false,
  },
}
const Club : Action = {
  id: 3,
  name: "Club",
  type: 'MELEE',
  slot: 0,
  tier: 1,
  skillBonus: strength2Dmg,
  successBonus: 2,
  mpCost: 0,
  cost: 1,
  effect:{
    effectRoll: e1d6,
    effectBonus: 2,
    target: 'OTHER',
    stat: 'HP',
    statIncrease: false,
  },
}
const slingshot : Action = {
  id: 4,
  name: "Slingshot",
  type: 'RANGED',
  slot: 1,
  tier: 1,
  skillBonus: speed2Atk,
  successBonus: 2,
  mpCost: 0,
  cost: 1,
  effect:{
    effectRoll: e1d8,
    effectBonus: 1,
    target: 'OTHER',
    stat: 'HP',
    statIncrease: false,
  },
}
const poisonCloud : Action = {
  id: 5,
  name: "Poison Cloud",
  type: 'SPELL',
  slot: 2,
  tier: 1,
  successBonus: 4,
  mpCost: 4,
  cost: 1,
  effect:{
    effectRoll: e3d4,
    effectBonus: 4,
    target: 'OTHER',
    stat: 'HP',
    statIncrease: false,
  },
}
const longsword : Action = {
  id: 6,
  name: "Longsword",
  type: 'MELEE',
  slot: 0,
  tier: 2,
  skillBonus: strength2Dmg,
  successBonus: 3,
  mpCost: 0,
  cost: 3,
  effect:{
    effectRoll: e3d6,
    effectBonus: 0,
    target: 'OTHER',
    stat: 'HP',
    statIncrease: false,
  },
}
const crossbow : Action = {
  id: 7,
  name: "Crossbow",
  type: 'RANGED',
  slot: 1,
  tier: 2,
  skillBonus: speed2Atk,
  successBonus: 1,
  mpCost: 0,
  cost: 3,
  effect:{
    effectRoll: e2d6,
    effectBonus: 2,
    target: 'OTHER',
    stat: 'HP',
    statIncrease: false,
  },
}
const fireball : Action = {
  id: 8,
  name: "Fireball",
  type: 'SPELL',
  slot: 2,
  tier: 2,
  successBonus: 6,
  mpCost: 6,
  cost: 3,
  effect:{
    effectRoll: e4d6,
    effectBonus: 0,
    target: 'OTHER',
    stat: 'HP',
    statIncrease: false,
  },
}
const runAway : Action = {
  id: 10,
  name: "Run Away",
  type: 'FLEE',
  slot: 3,
  tier: 0,
  skillBonus: speed1Flee,
  successBonus: 1,
  cost: 0,
  mpCost: 0,
}
const stealthyEscape : Action = {
  id: 11,
  name: "Stealthy Escape",
  type: 'FLEE',
  slot: 3,
  tier: 1,
  skillBonus: speed2Flee,
  successBonus: 2,
  cost: 1,
  mpCost: 0,
}
const escapeOnSteed  : Action = {
  id: 12,
  name: "Escape On Steed",
  type: 'FLEE',
  slot: 3,
  tier: 2,
  skillBonus: speed2Flee,
  successBonus: 4,
  cost: 2,
  mpCost: 0,
}
const abilities : Action[] = [
  punch,
  throwRock,
  magicBlast,
  Club,
  slingshot,
  poisonCloud,
  longsword,
  crossbow,
  fireball,
  runAway,
  stealthyEscape,
  escapeOnSteed,
]

const items : Action[] = [
  {
    id: 0,
    name: "Mini HP Potion",
    slot: 5,
    tier: 0,
    mpCost: 0,
    cost: 6,
    successBonus: 0,
    type: 'HP Potion',
    effect:{
      effectRoll: e1d8,
      effectBonus: 0,
      target: 'SELF',
      stat: 'HP',
      statIncrease: true,
    },
    uses : 1,
  },
  {
    id: 1,
    name: "Mini MP Potion",
    slot: 5,
    tier: 0,
    successBonus: 1,
    mpCost: 0,
    cost: 3,
    type: 'MP Potion',
    effect:{
      effectRoll: e1d8,
      effectBonus: 0,
      target: 'SELF',
      stat: 'MP',
      statIncrease: true,
    },
    uses : 1,
  },
  {
      id: 2,
      name: "Fireball Scroll",
      slot: 5,
      tier: 0,
      successBonus: 6,
      mpCost: 0,
      cost: 8,
      type: 'Scroll',
      effect:{
        effectRoll: e4d6,
        effectBonus: 0,
        target: 'OTHER',
        stat: 'HP',
        statIncrease: false,
      },
      uses : 1,
  },
  {
    id: 3,
    name: "HP Potion",
    slot: 5,
    tier: 1,
    mpCost: 0,
    cost: 15,
    successBonus: 0,
    type: 'HP Potion',
    effect:{
      effectRoll: e2d8,
      effectBonus: 0,
      target: 'SELF',
      stat: 'HP',
      statIncrease: true,
    },
    uses : 1,
  },
  {
    id: 4,
    name: "MP Potion",
    slot: 5,
    tier: 1,
    mpCost: 0,
    cost: 8,
    successBonus: 0,
    type: 'MP Potion',
    effect:{
      effectRoll: e2d8,
      effectBonus: 0,
      target: 'SELF',
      stat: 'MP',
      statIncrease: true,
    },
    uses : 1,
  },
  {
    id: 5,
    name: "Enhanced Fireball Scroll",
    slot: 5,
    tier: 1,
    successBonus: 6,
    mpCost: 0,
    cost: 20,
    type: 'Scroll',
    effect:{
      effectRoll: e4d6,
      effectBonus: 7,
      target: 'OTHER',
      stat: 'HP',
      statIncrease: false,
    },
    uses : 1,
  },
  {
    id: 6,
    name: "Mega HP Potion",
    slot: 5,
    tier: 2,
    mpCost: 0,
    cost: 35,
    successBonus: 0,
    type: 'HP Potion',
    effect:{
      effectRoll: e4d6,
      effectBonus: 0,
      target: 'SELF',
      stat: 'HP',
      statIncrease: true,
    },
    uses : 1,
  },
  {
    id: 7,
    name: "Mega MP Potion",
    slot: 5,
    tier: 2,
    mpCost: 0,
    cost: 20,
    successBonus: 0,
    type: 'MP Potion',
    effect:{
      effectRoll: e4d6,
      effectBonus: 0,
      target: 'SELF',
      stat: 'MP',
      statIncrease: true,
    },
    uses : 1,
  },
  {
    id: 8,
    name: "Fireball3 Scroll",
    slot: 5,
    tier: 2,
    successBonus: 8,
    mpCost: 0,
    cost: 35,
    type: 'Scroll',
    effect:{
      effectRoll: e4d6,
      effectBonus: 12,
      target: 'OTHER',
      stat: 'MP',
      statIncrease: true,
    },
    uses : 1,
  },
]

const equipment : Equipment[] = [
  {
  id: 0,
  name: "Basic Clothes",
  stat: 'ARM',
  effect: 0,
  tier: 0,
  cost: 0,
  slot: 0,
  type: 'ARMOR'
  },
  {
    id: 1,
    name: "Minor Ring of MP",
    stat: 'MP',
    effect: 3,
    tier: 0,
    cost: 0,
    slot: 1,
    type: 'MAGIC RING'
  },
  {
    id: 2,
    name: "Leather Armor",
    stat: 'ARM',
    effect: 2,
    tier: 1,
    cost: 15,
    slot: 0,
    type: 'ARMOR'
  },
  {
    id: 3,
    name: "Minor Ring of HP",
    stat: 'HP',
    effect: 7,
    tier: 1,
    cost: 20,
    slot: 1,
    type: 'MAGIC RING'
  },
  {
    id: 4,
    name: "Chainmail Armor",
    stat: 'ARM',
    effect: 4,
    tier: 2,
    cost: 35,
    slot: 0,
    type: 'ARMOR'
  },
  {
    id: 5,
    name: "Ring of MP",
    stat: 'MP',
    effect: 12,
    tier: 2,
    cost: 25,
    slot: 1,
    type: 'MAGIC RING'
  },
  {
    id: 6,
    name: "Scalemail Armor",
    stat: 'ARM',
    effect: 6,
    tier: 3,
    cost: 80,
    slot: 0,
    type: 'ARMOR'
  },
  {
    id: 7,
    name: "Ring of HP",
    stat: 'HP',
    effect: 15,
    tier: 3,
    cost: 45,
    slot: 1,
    type: 'MAGIC RING'
  },
]

const actionList0 : Action[] = [punch, throwRock, magicBlast, runAway];
const actionList1 : Action[] = [abilities[0], abilities[1]];

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
  const zombie: Entity = {
    id: 1,
    imgSrc: "/images/zombie.png",
    name: "Zombie",
    level: 1,
    xp: 10,
    gp: 5,
    currHP: 6,
    totalHP: 6,
    currMP: 0,
    totalMP: 0,
    str: 1,
    spd: 0,
    armor: 0,
    abilityList: actionList1,
}

const skeleton: Entity = {
    id: 2,
    imgSrc: "/images/skeleton.png",
    name: "Skeleton",
    level: 1,
    xp: 8,
    gp: 6,
    currHP: 4,
    totalHP: 4,
    currMP: 0,
    totalMP: 0,
    str: 0,
    spd: 1,
    armor: 0,
    abilityList: actionList1,
}

const orc: Entity = {
    id: 3,
    imgSrc: "/images/orc.png",
    name: "Orc",
    level: 1,
    xp: 12,
    gp: 10,
    currHP: 8,
    totalHP: 8,
    currMP: 0,
    totalMP: 0,
    str: 1,
    spd: 1,
    armor: 1,
    abilityList: actionList1,
}

const werewolf: Entity = {
    id: 4,
    imgSrc: "/images/werewolf.png",
    name: "Werewolf",
    level: 2,
    xp: 24,
    gp: 8,
    currHP: 15,
    totalHP: 15,
    currMP: 0,
    totalMP: 0,
    str: 2,
    spd: 2,
    armor: 1,
    abilityList: actionList1,
}

const minotaur: Entity = {
    id: 5,
    imgSrc: "/images/minotaur.png",
    name: "Minotaur",
    level: 2,
    xp: 26,
    gp: 18,
    currHP: 18,
    totalHP: 18,
    currMP: 6,
    totalMP: 6,
    str: 2,
    spd: 1,
    armor: 3,
    abilityList: actionList1,
}

const vampire: Entity = {
    id: 6,
    imgSrc: "/images/vampire.png",
    name: "Vampire",
    level: 2,
    xp: 20,
    gp: 12,
    currHP: 14,
    totalHP: 14,
    currMP: 0,
    totalMP: 0,
    str: 1,
    spd: 2,
    armor: 0,
    abilityList: actionList1,
}

const ninja: Entity = {
    id: 7,
    imgSrc: "/images/ninja.png",
    name: "Ninja",
    level: 2,
    xp: 22,
    gp: 14,
    currHP: 10,
    totalHP: 10,
    currMP: 6,
    totalMP: 6,
    str: 0,
    spd: 3,
    armor: 1,
    abilityList: actionList1,
}

const basilisk: Entity = {
    id: 8,
    imgSrc: "/images/basilisk.png",
    name: "Basilisk",
    level: 3,
    xp: 42,
    gp: 18,
    currHP: 23,
    totalHP: 23,
    currMP: 0,
    totalMP: 0,
    str: 2,
    spd: 3,
    armor: 2,
    abilityList: actionList1,
}

const iceMonster: Entity = {
    id: 9,
    imgSrc: "/images/ice-monster.png",
    name: "Ice Monster",
    level: 3,
    xp: 44,
    gp: 16,
    currHP: 25,
    totalHP: 25,
    currMP: 0,
    totalMP: 0,
    str: 3,
    spd: 2,
    armor: 1,
    abilityList: actionList1,
}

const mummy: Entity = {
    id: 10,
    imgSrc: "/images/mummy.png",
    name: "Mummy",
    level: 3,
    xp: 38,
    gp: 28,
    currHP: 35,
    totalHP: 35,
    currMP: 9,
    totalMP: 9,
    str: 2,
    spd: 1,
    armor: 1,
    abilityList: actionList1,
}

const nightmare: Entity = {
    id: 11,
    imgSrc: "/images/nightmare.png",
    name: "Nightmare",
    level: 3,
    xp: 40,
    gp: 20,
    currHP: 18,
    totalHP: 18,
    currMP: 6,
    totalMP: 6,
    str: 3,
    spd: 3,
    armor: 3,
    abilityList: actionList1,
}

const greatOgre: Entity = {
    id: 12,
    imgSrc: "/images/great-ogre.png",
    name: "Great Ogre",
    level: 4,
    xp: 56,
    gp: 26,
    currHP: 45,
    totalHP: 45,
    currMP: 0,
    totalMP: 0,
    str: 5,
    spd: 2,
    armor: 2,
    abilityList: actionList1,
}

const dragon: Entity = {
    id: 13,
    imgSrc: "/images/dragon.png",
    name: "Dragon",
    level: 4,
    xp: 54,
    gp: 34,
    currHP: 38,
    totalHP: 38,
    currMP: 12,
    totalMP: 12,
    str: 4,
    spd: 3,
    armor: 2,
    abilityList: actionList1,
}

const deathKnight: Entity = {
    id: 14,
    imgSrc: "/images/death-knight.png",
    name: "Death Knight",
    level: 4,
    xp: 48,
    gp: 30,
    currHP: 30,
    totalHP: 30,
    currMP: 6,
    totalMP: 6,
    str: 3,
    spd: 2,
    armor: 4,
    abilityList: actionList1,
}

const archWizard: Entity = {
    id: 15,
    imgSrc: "/images/arch-wizard.png",
    name: "Arch Wizard",
    level: 4,
    xp: 50,
    gp: 32,
    currHP: 22,
    totalHP: 22,
    currMP: 24,
    totalMP: 24,
    str: 2,
    spd: 2,
    armor: 0,
    abilityList: actionList1,
}

const frog: Entity = {
    id: 16,
    imgSrc: "/images/frog.png",
    name: "Frog",
    level: 5,
    xp: 80,
    gp: 0,
    currHP: 4,
    totalHP: 4,
    currMP: 0,
    totalMP: 0,
    str: 1,
    spd: 1,
    armor: 10,
    abilityList: actionList1,
}

const enemies = [
  zombie,
  skeleton,
  orc,
  werewolf,
  minotaur,
  vampire,
  ninja,
  basilisk,
  iceMonster,
  mummy,
  nightmare,
  greatOgre,
  dragon,
  deathKnight,
  archWizard,
  frog
]

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
function removeEquipment(entity : Entity, equipment : Equipment) : Entity {
  switch(equipment.stat) {
    case 'HP':
      return {...entity, currHP : entity.currHP - equipment.effect, totalHP : entity.totalHP - equipment.effect};
    case 'MP':
    return {...entity, currMP : entity.currMP - equipment.effect, totalMP : entity.totalMP - equipment.effect};
    case 'ARM':
      return {...entity, armor : entity.armor - equipment.effect};
    case 'SPD':
      return {...entity, spd : entity.spd - equipment.effect};
    case 'STR':
      return {...entity, str : entity.str - equipment.effect};
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
