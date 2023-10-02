import { Events, Interaction } from "discord.js";
import { ClientWithCommands } from "./ClientWithCommands";

export interface Event{
  name: Events;
  run: (bot: ClientWithCommands, interaction: Interaction, ...args: any[]) => Promise<void>;
}

export { Events }