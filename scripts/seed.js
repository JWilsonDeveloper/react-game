const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  equipment,
  effectRolls,
  effects,
  skillBonuses,
  actions,
  enemies,
  abilityListsActions,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedEquipment(client) {
  try {
    // Ensure the uuid-ossp extension is available
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "equipment" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS equipment (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        stat VARCHAR(3) CHECK (stat IN ('HP', 'MP', 'ARM', 'SPD', 'STR')) NOT NULL,
        effect INTEGER NOT NULL,
        tier INTEGER NOT NULL,
        cost INTEGER NOT NULL,
        slot INTEGER NOT NULL,
        type VARCHAR(10) CHECK (type IN ('ARMOR', 'MAGIC RING')) NOT NULL
      );
    `;

    console.log(`Created "equipment" table`);

    // Insert data into the "equipment" table
    const insertedEquipment = await Promise.all(
      equipment.map(
        (equip) => client.sql`
        INSERT INTO equipment (name, stat, effect, tier, cost, slot, type)
        VALUES (
          ${equip.name},
          ${equip.stat},
          ${equip.effect},
          ${equip.tier},
          ${equip.cost},
          ${equip.slot},
          ${equip.type}
        )
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedEquipment.length} equipment`);

    return {
      equipment: insertedEquipment,
    };
  } catch (error) {
    console.error('Error seeding equipment:', error);
    throw error;
  }
}

async function seedEffectRolls(client) {
  try {
    // Ensure the uuid-ossp extension is available
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "effect_rolls" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS effect_rolls (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        range_min INTEGER NOT NULL,
        range_max INTEGER NOT NULL,
        quantity INTEGER NOT NULL
      );
    `;

    console.log(`Created "effect_rolls" table`);

    // Insert data into the "effect_rolls" table
    const insertedEffectRolls = await Promise.all(
      effectRolls.map(
        (effectRoll) => client.sql`
        INSERT INTO effect_rolls (range_min, range_max, quantity)
        VALUES (
          ${effectRoll.rangeMin},
          ${effectRoll.rangeMax},
          ${effectRoll.quantity}
        )
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedEffectRolls.length} effectRolls`);

    return {
      insertedEffectRolls,
    };
  } catch (error) {
    console.error('Error seeding effectRolls:', error);
    throw error;
  }
}

async function seedEffects(client) {
  try {
    // Ensure the uuid-ossp extension is available
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "effects" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS effects (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        effect_roll_id UUID REFERENCES effect_rolls(id),
        effect_bonus INTEGER NOT NULL,
        target VARCHAR(5) CHECK (target IN ('SELF', 'OTHER')) NOT NULL,
        stat VARCHAR(10) CHECK (stat IN ('HP', 'MP', 'ARMOR', 'SPEED', 'STRENGTH')) NOT NULL,
        stat_increase BOOLEAN NOT NULL
      );
    `;

    console.log(`Created "effects" table`);

    // Insert data into the "effects" table
    const insertedEffects = await Promise.all(
      effects.map(
        (effect) => client.sql`
          INSERT INTO effects (effect_roll_id, effect_bonus, target, stat, stat_increase)
          VALUES (
            ${effect.effectRollId},
            ${effect.effectBonus},
            ${effect.target},
            ${effect.stat},
            ${effect.statIncrease}
          )
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedEffects.length} effects`);

    return {
      insertedEffects,
    };
  } catch (error) {
    console.error('Error seeding effects:', error);
    throw error;
  }
}

async function seedSkillBonuses(client) {
  try {
    // Ensure the uuid-ossp extension is available
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "skill_bonuses" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS skill_bonuses (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        skill VARCHAR(5) CHECK (skill IN ('SPD', 'STR')) NOT NULL,
        multiplier INTEGER NOT NULL,
        type VARCHAR(10) CHECK (type IN ('SUCCESS', 'EFFECT')) NOT NULL
      );
    `;

    console.log(`Created "skill_bonuses" table`);

    // Insert data into the "skill_bonuses" table
    const insertedSkillBonuses = await Promise.all(
      skillBonuses.map(
        (skillBonus) => client.sql`
          INSERT INTO skill_bonuses (skill, multiplier, type)
          VALUES (
            ${skillBonus.skill},
            ${skillBonus.multiplier},
            ${skillBonus.type}
          )
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedSkillBonuses.length} skill bonuses`);

    return {
      insertedSkillBonuses,
    };
  } catch (error) {
    console.error('Error seeding skill bonuses:', error);
    throw error;
  }
}

async function seedActions(client) {
  try {
    // Ensure the uuid-ossp extension is available
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "actions" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS actions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        type VARCHAR(10) CHECK (type IN ('MELEE', 'RANGED', 'SPELL', 'FLEE', 'HP Potion', 'MP Potion', 'Scroll')) NOT NULL,
        cost INTEGER NOT NULL,
        mp_cost INTEGER NOT NULL,
        slot INTEGER NOT NULL,
        tier INTEGER NOT NULL,
        success_bonus INTEGER NOT NULL,
        skill_bonus_id UUID REFERENCES skill_bonuses(id),
        effect_id UUID REFERENCES effects(id),
        uses INTEGER
      );
    `;

    console.log(`Created "actions" table`);

    // Insert data into the "actions" table
    const insertedActions = await Promise.all(
      actions.map(
        (action) => client.sql`
          INSERT INTO actions (
            name, type, cost, mp_cost, slot, tier, success_bonus, skill_bonus_id, effect_id, uses
          )
          VALUES (
            ${action.name},
            ${action.type},
            ${action.cost},
            ${action.mpCost},
            ${action.slot},
            ${action.tier},
            ${action.successBonus},
            ${action.skillBonusId || null},
            ${action.effectId || null},
            ${action.uses || null}
          )
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedActions.length} actions`);

    return {
      insertedActions,
    };
  } catch (error) {
    console.error('Error seeding actions:', error);
    throw error;
  }
}

async function seedEnemies(client) {
  try {
    // Ensure the uuid-ossp extension is available
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "enemies" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS enemies (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        img_src VARCHAR(255) NOT NULL,
        name VARCHAR(50) NOT NULL,
        level INTEGER NOT NULL,
        xp INTEGER NOT NULL,
        gp INTEGER NOT NULL,
        curr_hp INTEGER NOT NULL,
        total_hp INTEGER NOT NULL,
        curr_mp INTEGER NOT NULL,
        total_mp INTEGER NOT NULL,
        str INTEGER NOT NULL,
        spd INTEGER NOT NULL,
        armor INTEGER NOT NULL,
        ability_list_id UUID DEFAULT uuid_generate_v4() NOT NULL
      );
    `;

    console.log(`Created "enemies" table`);

    // Insert data into the "enemies" table
    const insertedEnemies = await Promise.all(
      enemies.map(
        (enemy) => client.sql`
          INSERT INTO enemies (
            img_src, name, level, xp, gp, curr_hp, total_hp, curr_mp, total_mp, str, spd, armor
          )
          VALUES (
            ${enemy.imgSrc},
            ${enemy.name},
            ${enemy.level},
            ${enemy.xp},
            ${enemy.gp},
            ${enemy.currHP},
            ${enemy.totalHP},
            ${enemy.currMP},
            ${enemy.totalMP},
            ${enemy.str},
            ${enemy.spd},
            ${enemy.armor}
          )
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedEnemies.length} enemies`);

    return {
      insertedEnemies,
    };
  } catch (error) {
    console.error('Error seeding enemies:', error);
    throw error;
  }
}

async function seedAbilityListsActions(client) {
  try {
    // Ensure the uuid-ossp extension is available
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "ability_lists_actions" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS ability_lists_actions (
        ability_list_id UUID NOT NULL,
        action_id UUID NOT NULL,
        PRIMARY KEY (ability_list_id, action_id)
      );
    `;

    console.log(`Created "ability_lists_actions" table`);

    // Insert data into the "ability_lists_actions" table
    const insertedAbilityListsActions = await Promise.all(
      abilityListsActions.map(
        (entry) => client.sql`
          INSERT INTO ability_lists_actions (ability_list_id, action_id)
          VALUES (${entry.abilityListId}, ${entry.actionId})
          ON CONFLICT (ability_list_id, action_id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedAbilityListsActions.length} ability list actions`);

    return {
      insertedAbilityListsActions,
    };
  } catch (error) {
    console.error('Error seeding ability list actions:', error);
    throw error;
  }
}


async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  //await seedUsers(client);
  //await seedCustomers(client);
  //await seedInvoices(client);
  //await seedRevenue(client);
  //await seedEquipment(client);
  //await seedEffectRolls(client);
  //await seedSkillBonuses(client);
  //await seedEffects(client);
  //await seedActions(client);
  //await seedEnemies(client);
  await seedAbilityListsActions(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
