// Handle echo command
// Path: src/commands/echo.ts

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
  run: async (interaction) => {
    const text = interaction.options.get("text")?.value as string;
    await interaction.reply(text);
  },
};