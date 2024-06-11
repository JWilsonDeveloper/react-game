// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const equipment = [
  {
  name: "Basic Clothes",
  stat: 'ARM',
  effect: 0,
  tier: 0,
  cost: 0,
  slot: 0,
  type: 'ARMOR'
  },
  {
    name: "Minor Ring of MP",
    stat: 'MP',
    effect: 3,
    tier: 0,
    cost: 0,
    slot: 1,
    type: 'MAGIC RING'
  },
  {
    name: "Leather Armor",
    stat: 'ARM',
    effect: 2,
    tier: 1,
    cost: 15,
    slot: 0,
    type: 'ARMOR'
  },
  {
    name: "Minor Ring of HP",
    stat: 'HP',
    effect: 7,
    tier: 1,
    cost: 20,
    slot: 1,
    type: 'MAGIC RING'
  },
  {
    name: "Chainmail Armor",
    stat: 'ARM',
    effect: 4,
    tier: 2,
    cost: 35,
    slot: 0,
    type: 'ARMOR'
  },
  {
    name: "Ring of MP",
    stat: 'MP',
    effect: 12,
    tier: 2,
    cost: 25,
    slot: 1,
    type: 'MAGIC RING'
  },
  {
    name: "Scalemail Armor",
    stat: 'ARM',
    effect: 6,
    tier: 3,
    cost: 80,
    slot: 0,
    type: 'ARMOR'
  },
  {
    name: "Ring of HP",
    stat: 'HP',
    effect: 15,
    tier: 3,
    cost: 45,
    slot: 1,
    type: 'MAGIC RING'
  },
]

const effectRolls = [];
const rangeMin = 1;
const maxQuantity = 6;
const maxRangeMax = 12;
// Loop through quantities from 1 to maxQuantity
for (let quantity = 1; quantity <= maxQuantity; quantity++) {
  // Loop through rangeMaxes from 4 to maxRangeMax in increments of 2
  for (let rangeMax = 4; rangeMax <= maxRangeMax; rangeMax += 2) {
    effectRolls.push({
      rangeMin,
      rangeMax,
      quantity,
    });
  }
}

const effects = [
  {
    // punch and throwRock
    effectRollId : "3f540490-3fb6-4a06-a5f3-135bec30128b",
    effectBonus : 0,
    target : 'OTHER',
    stat : 'HP',
    statIncrease : false,
  },
  {
    // magicBlast and crossbow
    effectRollId : "c3f7438f-c020-4f34-96b6-fc5a664b3c4f",
    effectBonus : 2,
    target : 'OTHER',
    stat : 'HP',
    statIncrease : false,
  },
  {
    // club
    effectRollId : "ae1b9a2d-4733-4622-b82e-2387920a4d9d",
    effectBonus : 2,
    target : 'OTHER',
    stat : 'HP',
    statIncrease : false,
  },
  {
    // slingshot
    effectRollId : "425a02b2-ea3c-4eed-81e5-83852f98bc45",
    effectBonus : 1,
    target : 'OTHER',
    stat : 'HP',
    statIncrease : false,
  },
  {
    // poisonCloud
    effectRollId : "76b9981d-a8d0-4c11-8184-ee4923b5be42",
    effectBonus : 4,
    target : 'OTHER',
    stat : 'HP',
    statIncrease : false,
  },
  {
    // longsword
    effectRollId : "1e9a4817-8bce-4c3c-8489-b7be845985a6",
    effectBonus : 0,
    target : 'OTHER',
    stat : 'HP',
    statIncrease : false,
  },
  {
    // fireball and fireballScroll
    effectRollId : "a42dd636-0d0e-4877-9089-0c130d6095eb",
    effectBonus : 0,
    target : 'OTHER',
    stat : 'HP',
    statIncrease : false,
  },
  {
    // miniHpPotion
    effectRollId : "425a02b2-ea3c-4eed-81e5-83852f98bc45",
    effectBonus : 0,
    target : 'SELF',
    stat : 'HP',
    statIncrease : true,
  },
  {
    // miniMpPotion
    effectRollId : "425a02b2-ea3c-4eed-81e5-83852f98bc45",
    effectBonus : 0,
    target : 'SELF',
    stat : 'MP',
    statIncrease : true,
  },
  {
    // hpPotion
    effectRollId : "e8293a19-a621-4bad-8724-12595536d349",
    effectBonus : 0,
    target : 'SELF',
    stat : 'HP',
    statIncrease : true,
  },
  {
    // mpPotion
    effectRollId : "e8293a19-a621-4bad-8724-12595536d349",
    effectBonus : 0,
    target : 'SELF',
    stat : 'MP',
    statIncrease : true,
  },
  {
    // enhancedFireballScroll
    effectRollId : "a42dd636-0d0e-4877-9089-0c130d6095eb",
    effectBonus : 7,
    target : 'OTHER',
    stat : 'HP',
    statIncrease : false,
  },
  {
    // megaHpPotion
    effectRollId : "a42dd636-0d0e-4877-9089-0c130d6095eb",
    effectBonus : 0,
    target : 'SELF',
    stat : 'HP',
    statIncrease : true,
  },
  {
    // megaMpPotion
    effectRollId : "a42dd636-0d0e-4877-9089-0c130d6095eb",
    effectBonus : 0,
    target : 'SELF',
    stat : 'MP',
    statIncrease : true,
  },
  {
    // fireball3Scroll
    effectRollId : "a42dd636-0d0e-4877-9089-0c130d6095eb",
    effectBonus : 12,
    target : 'OTHER',
    stat : 'HP',
    statIncrease : false,
  },
]

const skillBonuses = [
  {
    skill: "SPD",
    multiplier: 1,
    type: "SUCCESS",
  },
  {
    skill: "STR",
    multiplier: 1,
    type: "SUCCESS",
  },
  {
    skill: "SPD",
    multiplier: 1,
    type: "EFFECT",
  },
  {
    skill: "STR",
    multiplier: 1,
    type: "EFFECT",
  },
  {
    skill: "SPD",
    multiplier: 2,
    type: "SUCCESS",
  },
  {
    skill: "STR",
    multiplier: 2,
    type: "SUCCESS",
  },
  {
    skill: "SPD",
    multiplier: 2,
    type: "EFFECT",
  },
  {
    skill: "STR",
    multiplier: 2,
    type: "EFFECT",
  },
]

const actions = [
  {
    name: "Punch",
    type: 'MELEE',
    slot: 0,
    tier: 0,
    skillBonusId: "c531bfcf-16fb-40f3-8198-c84bdc05d6ad",
    successBonus: 1,
    mpCost: 0,
    cost: 0,
    effectId: "3c3b0a10-db51-4231-9cd2-f4613324585c",
  },
  {
    name: "Throw Rock",
    type: 'RANGED',
    slot: 1,
    tier: 0,
    skillBonusId: "5e6d29f2-68b4-4e7a-903f-e7c602655849",
    successBonus: 1,
    mpCost: 0,
    cost: 0,
    effectId: "3c3b0a10-db51-4231-9cd2-f4613324585c",
  },
  {
    name: "Magic Blast",
    type: 'SPELL',
    slot: 2,
    tier: 0,
    successBonus: 2,
    mpCost: 3,
    cost: 0,
    effectId: "24f03e39-16ca-4927-846d-635696272e21",
  },
  {
    name: "Club",
    type: 'MELEE',
    slot: 0,
    tier: 1,
    skillBonusId: "5e6d29f2-68b4-4e7a-903f-e7c602655849",
    successBonus: 2,
    mpCost: 0,
    cost: 1,
    effectId: "4789c706-a0c8-4dc7-a1cd-ade3aac3cd98",
  },
  {
    name: "Slingshot",
    type: 'RANGED',
    slot: 1,
    tier: 1,
    skillBonusId: "c531bfcf-16fb-40f3-8198-c84bdc05d6ad",
    successBonus: 2,
    mpCost: 0,
    cost: 1,
    effectId: "cbd32900-0546-43d9-8c3b-60ee1cc6ffc0",
  },
  {
    name: "Poison Cloud",
    type: 'SPELL',
    slot: 2,
    tier: 1,
    successBonus: 4,
    mpCost: 4,
    cost: 1,
    effectId: "3a514f60-c444-4de5-8ddc-5ecb85bc363f",
  },
  {
    name: "Longsword",
    type: 'MELEE',
    slot: 0,
    tier: 2,
    skillBonusId: "5e6d29f2-68b4-4e7a-903f-e7c602655849",
    successBonus: 3,
    mpCost: 0,
    cost: 3,
    effectId: "118a9a77-9052-4af8-8486-d9516ba7d2c2",
  },
  {
    name: "Crossbow",
    type: 'RANGED',
    slot: 1,
    tier: 2,
    skillBonusId: "c531bfcf-16fb-40f3-8198-c84bdc05d6ad",
    successBonus: 1,
    mpCost: 0,
    cost: 3,
    effectId: "24f03e39-16ca-4927-846d-635696272e21",
  },
  {
    name: "Fireball",
    type: 'SPELL',
    slot: 2,
    tier: 2,
    successBonus: 6,
    mpCost: 6,
    cost: 3,
    effectId: "71151915-ab43-4525-bef4-feb655e935e3",
  },
  {
    name: "Run Away",
    type: 'FLEE',
    slot: 3,
    tier: 0,
    skillBonusId: "d0a9dbc2-f46c-43d3-9c89-4531fbb65365",
    successBonus: 1,
    cost: 0,
    mpCost: 0,
  },
  {
    name: "Stealthy Escape",
    type: 'FLEE',
    slot: 3,
    tier: 1,
    skillBonusId: "c531bfcf-16fb-40f3-8198-c84bdc05d6ad",
    successBonus: 2,
    cost: 1,
    mpCost: 0,
  },
  {
    name: "Escape On Steed",
    type: 'FLEE',
    slot: 3,
    tier: 2,
    skillBonusId: "c531bfcf-16fb-40f3-8198-c84bdc05d6ad",
    successBonus: 4,
    cost: 2,
    mpCost: 0,
  },
  {
    name: "Mini HP Potion",
    type: "HP Potion",
    slot: 5,
    tier: 0,
    successBonus: 0,
    mpCost: 0,
    cost: 6,
    effectId: "4c2d59b7-b30e-48da-bef6-79b18045e75a",
    uses : 1,
  },
  {
    name: "Mini MP Potion",
    type: "MP Potion",
    slot: 5,
    tier: 0,
    successBonus: 1,
    mpCost: 0,
    cost: 3,
    effectId: "a429d867-0c34-4593-84e7-71831c10faba",
    uses : 1,
  },
  {
    name: "Fireball Scroll",
    type: "Scroll",
    slot: 5,
    tier: 0,
    successBonus: 6,
    mpCost: 0,
    cost: 8,
    effectId: "71151915-ab43-4525-bef4-feb655e935e3",
    uses : 1,
  },
  {
    name: "HP Potion",
    type: "HP Potion",
    slot: 5,
    tier: 1,
    successBonus: 0,
    mpCost: 0,
    cost: 15,
    effectId: "a4250e30-26c3-4eae-ad51-8565e169a876",
    uses : 1,
  },
  {
    name: "MP Potion",
    type: "MP Potion",
    slot: 5,
    tier: 1,
    successBonus: 0,
    mpCost: 0,
    cost: 8,
    effectId: "7e62b9a4-456e-4a30-8edf-6f84a66ce5a0",
    uses : 1,
  },
  {
    name: "Enhanced Fireball Scroll",
    type: "Scroll",
    slot: 5,
    tier: 1,
    successBonus: 6,
    mpCost: 0,
    cost: 20,
    effectId: "3b3ca591-1692-49b5-9ff4-bf0bd576d3b0",
    uses : 1,
  },
  {
    name: "Mega HP Potion",
    type: "HP Potion",
    slot: 5,
    tier: 2,
    successBonus: 0,
    mpCost: 0,
    cost: 35,
    effectId: "9d1facb6-71da-466e-9e7d-6acfbc226acc",
    uses : 1,
  },
  {
    name: "Mega MP Potion",
    type: "MP Potion",
    slot: 5,
    tier: 2,
    successBonus: 0,
    mpCost: 0,
    cost: 20,
    effectId: "16b1f7d1-b2c3-40e0-b784-908ca9f3adee",
    uses : 1,
  },
  {
    name: "Ultra Fireball Scroll",
    type: "Scroll",
    slot: 5,
    tier: 2,
    successBonus: 8,
    mpCost: 0,
    cost: 35,
    effectId: "58fd4b4e-92f2-453b-9a37-326870862e86",
    uses : 1,
  },
];


module.exports = {
  users,
  customers,
  invoices,
  revenue,
  equipment,
  effectRolls,
  effects,
  skillBonuses,
  actions,
};
