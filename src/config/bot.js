import { Client, GatewayIntentBits } from 'discord.js';
import pkg from 'pg';
const { Pool } = pkg;

// --- DATABASE SETUP ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // .env mein ye hona chahiye
});

// --- BOT CONFIGURATION ---
export const botConfig = {
  brandName: "ClipNation",
  presence: {
    status: "online",
    activities: [{ name: "Managing ClipNation Campaigns", type: 3 }],
  },
  // Baki settings yahi rahengi
};

// --- BOT CLIENT ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// --- BOT STARTUP ---
client.once('ready', async () => {
  console.log(`🚀 ${botConfig.brandName} is online!`);
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully.');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
});

client.login(process.env.DISCORD_TOKEN);
