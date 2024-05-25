// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type Entity = {
  id: number;
  imgSrc: string;
  name: string;
  level: number;
  xp: number;
  gp: number;
  currHP: number;
  totalHP: number;
  currMP: number;
  totalMP: number;
  strength: number;
  speed: number;
  armor: number;
  actionList: Move[];
}

export type Player = Entity & {
  ap: number;
  flee: Move;
  itemList: Item[];
  equipList: Equipment[];
}

export type Stats = {
  currHP: number;
  currMP: number;
}

export type Move = {
  id: number;
  name: string;
  category: 'MOVE' | 'ACTION' | 'ITEM';
  type: 'MELEE' | 'RANGE' | 'SPELL' | 'FLEE' | 'HP Potion' | 'MP Potion' | 'Scroll';
  cost: number;
  mpCost: number;
  slot: number;
  tier: number;
  successBonus: number;
  skillBonus?: SkillBonus;
}

export type Action = Move & {
  effectRoll: EffectRoll;
  effectBonus : number;
  target: 'SELF' | 'OTHER';
  targetStat: 'HP' | 'MP';
  statIncrease: boolean;
}

export type Item = Action & {
  uses: number;
}

export type Equipment = {
  id: number;
  name: string;
  targetStat: 'HP' | 'MP' | 'ARMOR' | 'SPEED' | 'STRENGTH';
  effect: number;
  tier: number;
  cost: number;
  slot: number;
  type: 'Armor' | 'Magic Item'
}

export type EffectRoll = {
  id: number;
  rangeMin: number;
  rangeMax: number;
  quantity: number;
}

export type SkillBonus = {
  id: number;
  skill: 'STRENGTH' | 'SPEED';
  multiplier: number;
  type: 'SUCCESS' | 'EFFECT';
}