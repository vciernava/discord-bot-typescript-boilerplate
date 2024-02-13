import { Client, Collection } from 'discord.js';
import { config } from 'dotenv';
import Handler from './Handler';
import { ClientWithCommands } from './interfaces/ClientWithCommands';
import { logger } from './utils/logger';

// Load the .env file
config();

// Create a new Discord client
const bot = new Client({
  intents: ['Guilds', 'GuildMessages', 'GuildMembers'],
}) as ClientWithCommands;

/*
 * 1. Login to the bot using the token saved inside the .env file
 * 2. Log a message to the console when the bot is logged in
 */
bot.login(process.env.TOKEN).then(() => {
  logger.info('Bot is logged in!');
});

// Create a discord handler from the client that will support shash commands and will handle all commands inside the commands folder
// Add a commands collection to the bot
bot.commands = new Collection();

const handler = new Handler(bot, {
  commandsDir: 'commands',
  eventsDir: 'events',
  featuresDir: 'features',
});

// Load all commands
handler.loadCommands();

// Load all events
handler.loadEvents();

// Load all features
handler.loadFeatures();
