import { Events } from 'discord.js';
import { ClientWithCommands } from './ClientWithCommands';

export interface Event {
  name: Events;
  run: (bot: ClientWithCommands, any: any) => Promise<void>;
}

export { Events };
