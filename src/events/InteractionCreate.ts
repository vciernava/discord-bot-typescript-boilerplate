// Handle the interactionCreate event
// Path: src/events/InteractionCreate.ts

import { Event, Events } from "../interfaces/Event";
import { logger } from "../utils/logger";

export default <Event>{
  name: Events.InteractionCreate,
  run: async (bot, interaction) => {
    /**
     * Do not edit this code unless you know what you are doing.
     */

    if (!interaction.isCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    if (!command) return;
    try {
      if (command.ephemeral === true) {
        await interaction.deferReply({ ephemeral: true });
      } else if (command.ephemeral === false) {
        await interaction.deferReply({ ephemeral: false });
      }
      await command.run(interaction);
    } catch (error) {
      logger.error(error);
      await interaction.reply({ ephemeral: true, content: "There was an error while executing this command!" });
    }
  }
};