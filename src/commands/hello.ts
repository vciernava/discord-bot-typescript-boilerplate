// Handle hello command
// Path: src/commands/hello.ts

/**
 * When using ephemeral commands, you can't use interaction.reply() directly.
 */

import { Command } from "../interfaces/Command";

export default <Command>{
  name: "hello",
  description: "Say hello to the bot!",
  ephemeral: true,
  run: async (interaction) => {
    interaction.editReply("Hello!");
  },
};