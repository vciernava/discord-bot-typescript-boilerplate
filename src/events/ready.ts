// Handle the ready event
// Path: src/events/ready.ts

import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import { config } from 'dotenv';
import { Event, Events } from '../interfaces/Event';
import { logger } from '../utils/logger';

config();

export default <Event>{
  name: Events.ClientReady,
  run: async (bot) => {
    /**
     * Do not edit this code unless you know what you are doing.
     */

    const rest = new REST({
      version: '10',
    }).setToken(process.env.TOKEN || '');
    const commands = [];

    for (const command of bot.commands) {
      if (command[1]) {
        commands.push(command[1]);
      }
    }

    if (
      process.env.GUILD_ID &&
      bot.user?.id &&
      process.env.NODE_ENV === 'development'
    ) {
      await rest.put(
        Routes.applicationGuildCommands(bot.user.id, process.env.GUILD_ID),
        { body: commands }
      );

      logger.info('Successfully registered application commands.');
    } else if (!process.env.GUILD_ID || !bot.user?.id) {
      logger.warn(
        'Failed to register application commands. Missing GUILD_ID or bot user ID.'
      );
    } else {
      await rest.put(Routes.applicationCommands(bot.user.id), {
        body: commands,
      });

      logger.info('Successfully registered global application commands.');
    }

    logger.info('Bot is ready!');

    /**
     * You can edit the code below to change what the bot is doing when it is ready.
     */

    bot.user?.setActivity('Hello world!');
  },
};
