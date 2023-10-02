// Handle echo command
// Path: src/commands/echo.ts

/**
 * If you want to defer the reply for longer operations, you can use ephemeral: false and then interaction.editReply()
 * otherwise, you do not need to include ephmeral at all.
 */

import { Command, ApplicationCommandOptionType } from "../interfaces/Command";

export default <Command>{
  name: "echo",
  description: "The bot will repeat what you say!",
  options: [
    {
      name: "text",
      description: "The text to repeat",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "Hello!",
          value: "Hello!",
        },
        {
          name: "Hi!",
          value: "Hi!",
        },
        {
          name: "Hey!",
          value: "Hey!",
        }
      ],
      required: true,
    },
  ],
  ephemeral: false,
  run: async (interaction) => {
    const text = interaction.options.get("text")?.value as string;
    interaction.editReply(text);
  },
};