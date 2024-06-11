import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  Equipment,
  EffectRoll,
  Effect,
  Action,
  SkillBonus,
  Entity,
} from './definitions';
import { formatCurrency } from './utils';

export async function getEquipment() {
  try {
    const data = await sql<Equipment>`
      SELECT id, name, stat, effect, tier, cost, slot, type FROM equipment;
    `;

    // Transform the result into an array of equipment objects
    const equipmentArray = data.rows.map(row => ({
      id: row.id,
      name: row.name,
      stat: row.stat,
      effect: row.effect,
      tier: row.tier,
      cost: row.cost,
      slot: row.slot,
      type: row.type
    }));

    return equipmentArray;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the equipment.');
  }
}

export async function getEffectRolls() {
  try {
    let data = await sql`
      SELECT id, range_min, range_max, quantity FROM effect_rolls;
    `;

    // Transform the result into an array of EffectRoll objects
    const effectRollsArray: EffectRoll[] = data.rows.map(row => ({
      id: row.id,
      rangeMin: row.range_min,
      rangeMax: row.range_max,
      quantity: row.quantity
    }));

    return effectRollsArray;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the effectRolls.');
  }
}

export async function getEffectRoll(id: number) {
  try {
    let data = await sql`
      SELECT id, range_min, range_max, quantity 
      FROM effect_rolls 
      WHERE id = ${id};
    `;

    if (data.rows.length === 0) {
      throw new Error(`Effect roll with id ${id} not found`);
    }

    const row = data.rows[0];
    const effectRoll : EffectRoll = {
      id: row.id,
      rangeMin: row.range_min,
      rangeMax: row.range_max,
      quantity: row.quantity
    };
    return effectRoll;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the effect roll.');
  }
}

export async function getEffects() {
  try {
    let data = await sql`
      SELECT id, effect_roll_id, effect_bonus, target, stat, stat_increase 
      FROM effects;
    `;

    // Transform the result into an array of Effect objects
    const effectsArray : Effect[] = await Promise.all(data.rows.map(async row => {
      const effectRoll : EffectRoll = await getEffectRoll(row.effect_roll_id);

      return {
        id: row.id,
        effectRoll,
        effectBonus: row.effect_bonus,
        target: row.target,
        stat: row.stat,
        statIncrease: row.stat_increase
      };
    }));

    return effectsArray;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the effects.');
  }
}

export async function getEffect(id: number) {
  try {
    let data = await sql`
      SELECT id, effect_roll_id, effect_bonus, target, stat, stat_increase 
      FROM effects
      WHERE id = ${id};
    `;

    if (data.rows.length === 0) {
      throw new Error(`Effect with id ${id} not found`);
    }

    const row = data.rows[0];
    const effectRoll : EffectRoll = await getEffectRoll(row.effect_roll_id);

    const effect = {
      id: row.id,
      effectRoll,
      effectBonus: row.effect_bonus,
      target: row.target,
      stat: row.stat,
      statIncrease: row.stat_increase
    };

    return effect;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the effect.');
  }
}


export async function getSkillBonuses() {
  try {
    let data = await sql`
      SELECT id, skill, multiplier, type FROM skill_bonuses;
    `;

    // Transform the result into an array of SkillBonus objects
    const skillBonusesArray: SkillBonus[] = data.rows.map(row => ({
      id: row.id,
      skill: row.skill,
      multiplier: row.multiplier,
      type: row.type
    }));

    return skillBonusesArray;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the skill bonuses.');
  }
}

export async function getSkillBonus(id: number) {
  try {
    let data = await sql`
      SELECT id, skill, multiplier, type 
      FROM skill_bonuses
      WHERE id = ${id};
    `;

    if (data.rows.length === 0) {
      throw new Error(`Skill bonus with id ${id} not found`);
    }

    const row = data.rows[0];
    const skillBonus : SkillBonus = {
      id: row.id,
      skill: row.skill,
      multiplier: row.multiplier,
      type: row.type
    };

    return skillBonus;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the skill bonus.');
  }
}

export async function getActions() {
  try {
    let data = await sql`
      SELECT 
        id, 
        name, 
        type, 
        cost, 
        mp_cost, 
        slot, 
        tier, 
        success_bonus, 
        skill_bonus_id, 
        effect_id, 
        uses 
      FROM actions;
    `;

    // Transform the result into an array of Action objects
    const actionsArray = await Promise.all(data.rows.map(async row => {
      const skillBonus = row.skill_bonus_id ? await getSkillBonus(row.skill_bonus_id) : null;
      const effect = row.effect_id ? await getEffect(row.effect_id) : null;
      const action : Action = {
        id: row.id,
        name: row.name,
        type: row.type,
        cost: row.cost,
        mpCost: row.mp_cost,
        slot: row.slot,
        tier: row.tier,
        successBonus: row.success_bonus,
        skillBonus: skillBonus || undefined,
        effect: effect || undefined,
        uses: row.uses
      };
      return action;
    }));

    return actionsArray;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the actions.');
  }
}

export async function getAction(actionId : number) {
  try {
    let data = await sql`
      SELECT 
        id, 
        name, 
        type, 
        cost, 
        mp_cost, 
        slot, 
        tier, 
        success_bonus, 
        skill_bonus_id, 
        effect_id, 
        uses 
      FROM actions
      WHERE id = ${actionId};
    `;

    if (data.rows.length === 0) {
      throw new Error(`Action with ID ${actionId} not found.`);
    }

    const row = data.rows[0];
    const skillBonus = row.skill_bonus_id ? await getSkillBonus(row.skill_bonus_id) : null;
    const effect = row.effect_id ? await getEffect(row.effect_id) : null;
    const action : Action = {
      id: row.id,
      name: row.name,
      type: row.type,
      cost: row.cost,
      mpCost: row.mp_cost,
      slot: row.slot,
      tier: row.tier,
      successBonus: row.success_bonus,
      skillBonus: skillBonus || undefined,
      effect: effect || undefined,
      uses: row.uses
    };

    return action;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch the action with ID ${actionId}.`);
  }
}

export async function getActionsByAbilityListId(abilityListId: number) {
  try {
    let data = await sql`
      SELECT 
        action_id
      FROM ability_lists_actions
      WHERE ability_list_id = ${abilityListId};
    `;

    const actionIds = data.rows.map(row => row.action_id);

    // Fetch details of each action
    const actions = await Promise.all(actionIds.map(async actionId => {
      try {
        return await getAction(actionId);
      } catch (error) {
        console.error(`Failed to fetch action with ID ${actionId}:`, error);
        return null;
      }
    }));
 
    // Filter out any failed action fetches and remove null values
    const validActions: Action[] = actions.filter((action): action is Action => action !== null);

    return validActions;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch actions by ability list ID.');
  }
}

export async function getEnemies() {
  try {
    const data = await sql`
      SELECT * FROM enemies;
    `;

    // Initialize an empty array to store enemies
    const enemiesArray : Entity[] = [];

    // Loop through each enemy data
    for (const enemy of data.rows) {
      try {

        // Fetch the actions associated with the enemy's ability list
        const abilityList = await getActionsByAbilityListId(enemy.ability_list_id);

        // Create the enemy object with abilities
        const enemyWithAbilities : Entity = {
          id: enemy.id,
          imgSrc: enemy.img_src,
          name: enemy.name,
          level: enemy.level,
          xp: enemy.xp,
          gp: enemy.gp,
          currHP: enemy.curr_hp,
          totalHP: enemy.total_hp,
          currMP: enemy.curr_mp,
          totalMP: enemy.total_mp,
          str: enemy.str,
          spd: enemy.spd,
          armor: enemy.armor,
          abilityList,
        };

      // Push the enemy object to the array
      enemiesArray.push(enemyWithAbilities);

      } catch (error) {
        console.error(`Failed to fetch abilities for enemy with ID ${enemy.id}:`, error);
        // Create the enemy object without abilities if fetching fails
        const enemyWithoutAbilities : Entity = {
          id: enemy.id,
          imgSrc: enemy.img_src,
          name: enemy.name,
          level: enemy.level,
          xp: enemy.xp,
          gp: enemy.gp,
          currHP: enemy.curr_hp,
          totalHP: enemy.total_hp,
          currMP: enemy.curr_mp,
          totalMP: enemy.total_mp,
          str: enemy.str,
          spd: enemy.spd,
          armor: enemy.armor,
          abilityList: []
        };

        // Push the enemy object without abilities to the array
        enemiesArray.push(enemyWithoutAbilities);
      }
    }

    return enemiesArray;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch enemies with abilities.');
  }
}


export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
