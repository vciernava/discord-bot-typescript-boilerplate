// Handle the interactionCreate event
// Path: src/events/InteractionCreate.ts

import { Interaction } from 'discord.js';
import { Event, Events } from '../interfaces/Event';
import { logger } from '../utils/logger';

export default <Event>{
  name: Events.InteractionCreate,
  run: async (bot, interaction: Interaction) => {
    /**
     * Do not edit this code unless you know what you are doing.
     */

    if (!interaction.isCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    if (!command) {
      logger.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      if (command.ephemeral) {
        await interaction.deferReply({ ephemeral: true });
      }

      await command.run(interaction);
    } catch (error) {
      logger.error(`Error executing ${interaction.commandName} command`);
      logger.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'An error occurred while executing this command.',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'An error occurred while executing this command.',
          ephemeral: true,
        });
      }
    }
  },
};
