'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Player, Move, EffectRoll, Entity, SkillBonus, Item, Action, Equipment } from './lib/definitions';
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
  skill: "SPEED",
  multiplier: 1,
  type: "SUCCESS",
}
const speed2Flee: SkillBonus = {
  id: 0,
  skill: "SPEED",
  multiplier: 2,
  type: "SUCCESS",
}
const speed2Atk: SkillBonus = {
  id: 1,
  skill: "SPEED",
  multiplier: 2,
  type: "SUCCESS",
}
const strength2Dmg: SkillBonus = {
  id: 2,
  skill: "SPEED",
  multiplier: 2,
  type: "EFFECT",
}


const punch : Action = {
  id: 0,
  name: "Punch",
  category: 'ACTION',
  type: 'MELEE',
  slot: 0,
  tier: 0,
  skillBonus: speed2Atk,
  successBonus: 1,
  effectRoll: e1d4,
  effectBonus: 0,
  target: 'OTHER',
  targetStat: 'HP',
  statIncrease: false,
  mpCost: 0,
  cost: 0,
}
const throwRock : Action = {
  id: 1,
  name: "Throw Rock",
  category: 'ACTION',
  type: 'RANGE',
  slot: 1,
  tier: 0,
  skillBonus: strength2Dmg,
  successBonus: 1,
  effectRoll: e1d4,
  effectBonus: 0,
  target: 'OTHER',
  targetStat: 'HP',
  statIncrease: false,
  mpCost: 0,
  cost: 0,
}
const magicBlast : Action = {
  id: 2,
  name: "Magic Blast",
  category: 'ACTION',
  type: 'SPELL',
  slot: 2,
  tier: 0,
  successBonus: 3,
  effectRoll: e2d6,
  effectBonus: 2,
  target: 'OTHER',
  targetStat: 'HP',
  statIncrease: false,
  mpCost: 3,
  cost: 0,
}
const Club : Action = {
  id: 3,
  name: "Club",
  category: 'ACTION',
  type: 'MELEE',
  slot: 0,
  tier: 1,
  skillBonus: strength2Dmg,
  successBonus: 2,
  effectRoll: e1d6,
  effectBonus: 2,
  target: 'OTHER',
  targetStat: 'HP',
  statIncrease: false,
  mpCost: 0,
  cost: 1,
}
const slingshot : Action = {
  id: 4,
  name: "Slingshot",
  category: 'ACTION',
  type: 'RANGE',
  slot: 1,
  tier: 1,
  skillBonus: speed2Atk,
  successBonus: 2,
  effectRoll: e1d8,
  effectBonus: 1,
  target: 'OTHER',
  targetStat: 'HP',
  statIncrease: false,
  mpCost: 0,
  cost: 1,
}
const poisonCloud : Action = {
  id: 5,
  name: "Poison Cloud",
  category: 'ACTION',
  type: 'SPELL',
  slot: 2,
  tier: 1,
  successBonus: 4,
  effectRoll: e3d4,
  effectBonus: 4,
  target: 'OTHER',
  targetStat: 'HP',
  statIncrease: false,
  mpCost: 3,
  cost: 1,
}
const longsword : Action = {
  id: 6,
  name: "Longsword",
  category: 'ACTION',
  type: 'MELEE',
  slot: 0,
  tier: 2,
  skillBonus: strength2Dmg,
  successBonus: 3,
  effectRoll: e3d6,
  effectBonus: 0,
  target: 'OTHER',
  targetStat: 'HP',
  statIncrease: false,
  mpCost: 0,
  cost: 3,
}
const crossbow : Action = {
  id: 7,
  name: "Crossbow",
  category: 'ACTION',
  type: 'RANGE',
  slot: 1,
  tier: 2,
  skillBonus: speed2Atk,
  successBonus: 3,
  effectRoll: e2d6,
  effectBonus: 2,
  target: 'OTHER',
  targetStat: 'HP',
  statIncrease: false,
  mpCost: 0,
  cost: 3,
}
const fireball : Action = {
  id: 8,
  name: "Fireball",
  category: 'ACTION',
  type: 'SPELL',
  slot: 2,
  tier: 2,
  successBonus: 6,
  effectRoll: e4d6,
  effectBonus: 0,
  target: 'OTHER',
  targetStat: 'HP',
  statIncrease: false,
  mpCost: 8,
  cost: 3,
}
const runAway : Move = {
  id: 10,
  name: "Run Away",
  category: 'MOVE',
  type: 'FLEE',
  slot: 3,
  tier: 0,
  skillBonus: speed1Flee,
  successBonus: 1,
  cost: 0,
  mpCost: 0,
}
const stealthyEscape : Move = {
  id: 11,
  name: "Stealthy Escape",
  category: 'MOVE',
  type: 'FLEE',
  slot: 3,
  tier: 1,
  skillBonus: speed2Flee,
  successBonus: 2,
  cost: 1,
  mpCost: 0,
}
const escapeOnSteed  : Move = {
  id: 12,
  name: "Escape On Steed",
  category: 'MOVE',
  type: 'FLEE',
  slot: 3,
  tier: 2,
  skillBonus: speed2Flee,
  successBonus: 4,
  cost: 2,
  mpCost: 0,
}
const moves : Move[] = [
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

const items : Item[] = [
  {
    id: 0,
    name: "Mini HP Potion",
    category: 'ITEM',
    slot: 5,
    tier: 0,
    effectRoll: e1d8,
    effectBonus: 0,
    target: 'SELF',
    targetStat: 'HP',
    statIncrease: true,
    mpCost: 0,
    uses : 1,
    cost: 6,
    successBonus: 0,
    type: 'HP Potion',
  },
  {
    id: 1,
    name: "Mini MP Potion",
    category: 'ITEM',
    slot: 5,
    tier: 0,
    successBonus: 1,
    effectRoll: e1d8,
    effectBonus: 0,
    target: 'SELF',
    targetStat: 'MP',
    statIncrease: true,
    mpCost: 0,
    uses : 1,
    cost: 3,
    type: 'MP Potion',
  },
  {
      id: 2,
      name: "Fireball Scroll",
      category: 'ITEM',
      slot: 5,
      tier: 0,
      successBonus: 6,
      effectRoll: e4d6,
      effectBonus: 0,
      target: 'OTHER',
      targetStat: 'HP',
      statIncrease: false,
      mpCost: 0,
      uses: 1,
      cost: 8,
      type: 'Scroll',
  },
  {
    id: 3,
    name: "HP Potion",
    category: 'ITEM',
    slot: 5,
    tier: 1,
    effectRoll: e2d8,
    effectBonus: 0,
    target: 'SELF',
    targetStat: 'HP',
    statIncrease: true,
    mpCost: 0,
    uses : 1,
    cost: 15,
    successBonus: 0,
    type: 'HP Potion',
  },
  {
    id: 4,
    name: "MP Potion",
    category: 'ITEM',
    slot: 5,
    tier: 1,
    effectRoll: e2d8,
    effectBonus: 0,
    target: 'SELF',
    targetStat: 'MP',
    statIncrease: true,
    mpCost: 0,
    uses : 1,
    cost: 8,
    successBonus: 0,
    type: 'MP Potion',
  },
  {
    id: 5,
    name: "Enhanced Fireball Scroll",
    category: 'ITEM',
    slot: 5,
    tier: 1,
    successBonus: 6,
    effectRoll: e4d6,
    effectBonus: 7,
    target: 'OTHER',
    targetStat: 'HP',
    statIncrease: false,
    mpCost: 0,
    uses: 1,
    cost: 20,
    type: 'Scroll',
  },
  {
    id: 6,
    name: "Mega HP Potion",
    category: 'ITEM',
    slot: 5,
    tier: 2,
    effectRoll: e4d6,
    effectBonus: 0,
    target: 'SELF',
    targetStat: 'HP',
    statIncrease: true,
    mpCost: 0,
    uses : 1,
    cost: 35,
    successBonus: 0,
    type: 'HP Potion',
  },
  {
    id: 7,
    name: "Mega MP Potion",
    category: 'ITEM',
    slot: 5,
    tier: 2,
    effectRoll: e4d6,
    effectBonus: 0,
    target: 'SELF',
    targetStat: 'MP',
    statIncrease: true,
    mpCost: 0,
    uses : 1,
    cost: 20,
    successBonus: 0,
    type: 'MP Potion',
  },
  {
    id: 8,
    name: "Fireball3 Scroll",
    category: 'ITEM',
    slot: 5,
    tier: 2,
    successBonus: 8,
    effectRoll: e4d6,
    effectBonus: 14,
    target: 'OTHER',
    targetStat: 'HP',
    statIncrease: false,
    mpCost: 0,
    uses: 1,
    cost: 35,
    type: 'Scroll',
  },
]

const equipment : Equipment[] = [
  {
  id: 0,
  name: "Basic Clothes",
  targetStat: 'ARMOR',
  effect: 0,
  tier: 0,
  cost: 0,
  slot: 0,
  type: 'Armor'
  },
  {
    id: 1,
    name: "Minor Ring of MP",
    targetStat: 'MP',
    effect: 3,
    tier: 0,
    cost: 0,
    slot: 1,
    type: 'Magic Item'
  },
  {
    id: 2,
    name: "Leather Armor",
    targetStat: 'ARMOR',
    effect: 1,
    tier: 1,
    cost: 15,
    slot: 0,
    type: 'Armor'
  },
  {
    id: 3,
    name: "Minor Ring of HP",
    targetStat: 'HP',
    effect: 4,
    tier: 1,
    cost: 20,
    slot: 1,
    type: 'Magic Item'
  },
  {
    id: 4,
    name: "Chainmail Armor",
    targetStat: 'ARMOR',
    effect: 2,
    tier: 2,
    cost: 25,
    slot: 0,
    type: 'Armor'
  },
  {
    id: 5,
    name: "Ring of MP",
    targetStat: 'MP',
    effect: 12,
    tier: 2,
    cost: 25,
    slot: 1,
    type: 'Magic Item'
  },
  {
    id: 6,
    name: "Scalemail Armor",
    targetStat: 'ARMOR',
    effect: 3,
    tier: 3,
    cost: 45,
    slot: 0,
    type: 'Armor'
  },
  {
    id: 7,
    name: "Ring of HP",
    targetStat: 'HP',
    effect: 12,
    tier: 3,
    cost: 45,
    slot: 1,
    type: 'Magic Item'
  },
]

const actionList0 : Move[] = [moves[0], moves[1], moves[2], runAway];
const actionList1 : Move[] = [moves[0], moves[1]];

const itemList0 : Item[] = [items[0]];

const equipList0 : Equipment[] = [equipment[0], equipment[1]];

const basePlayer: Player = {
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
    strength: 1,
    speed: 1,
    armor: 0,
    actionList: actionList0,
    flee : runAway,
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
    currHP: 8,
    totalHP: 8,
    currMP: 0,
    totalMP: 0,
    strength: 1,
    speed: 0,
    armor: 0,
    actionList: actionList1,
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
    strength: 1,
    speed: 0,
    armor: 0,
    actionList: actionList1,
}
const orc: Entity = {
  id: 3,
  imgSrc: "/images/orc.png",
  name: "Orc",
  level: 1,
  xp: 15,
  gp: 10,
  currHP: 6,
  totalHP: 6,
  currMP: 0,
  totalMP: 0,
  strength: 2,
  speed: 1,
  armor: 1,
  actionList: actionList1,
}
const werewolf: Entity = {
    id: 4,
    imgSrc: "/images/werewolf.png",
    name: "Werewolf",
    level: 2,
    xp: 25,
    gp: 15,
    currHP: 15,
    totalHP: 15,
    currMP: 0,
    totalMP: 0,
    strength: 2,
    speed: 2,
    armor: 0,
    actionList: actionList1,
}
const minotaur: Entity = {
  id: 5,
  imgSrc: "/images/minotaur.png",
  name: "Minotaur",
  level: 2,
  xp: 30,
  gp: 12,
  currHP: 20,
  totalHP: 20,
  currMP: 0,
  totalMP: 0,
  strength: 3,
  speed: 1,
  armor: 0,
  actionList: actionList1,
}
const vampire: Entity = {
  id: 6,
  imgSrc: "/images/vampire.png",
  name: "Vampire",
  level: 2,
  xp: 35,
  gp: 20,
  currHP: 20,
  totalHP: 20,
  currMP: 0,
  totalMP: 0,
  strength: 1,
  speed: 4,
  armor: 0,
  actionList: actionList1,
}
const ogre: Entity = {
  id: 7,
  imgSrc: "/images/ogre.png",
  name: "Ogre",
  level: 3,
  xp: 45,
  gp: 30,
  currHP: 20,
  totalHP: 20,
  currMP: 0,
  totalMP: 0,
  strength: 4,
  speed: 1,
  armor: 0,
  actionList: actionList1,
}
const dragon: Entity = {
  id: 8,
  imgSrc: "/images/dragon.png",
  name: "Dragon",
  level: 3,
  xp: 60,
  gp: 40,
  currHP: 20,
  totalHP: 20,
  currMP: 0,
  totalMP: 0,
  strength: 3,
  speed: 3,
  armor: 0,
  actionList: actionList1,
}

const enemies = [
    zombie,
    skeleton,
    orc,
    werewolf,
    minotaur,
    vampire,
    ogre,
    dragon
]

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex grow flex-col justify-center gap-6 rounded-lg bg-black px-6 py-2 md:w-5/5 md:px-20">
        <div className="flex grow flex-col gap-4 md:flex-row">
          <MyGame basePlayer={basePlayer} enemies={enemies} items={items} moves={moves} equipment={equipment} />
        </div>
      </div>
    </main>
  );
}
