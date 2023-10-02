import { ClientWithCommands } from "./interfaces/ClientWithCommands";

export default class Handler {

  bot: ClientWithCommands;
  commandsDir: string;
  eventsDir: string;
  featuresDir: string;

  constructor(bot: ClientWithCommands, options: { commandsDir: string, eventsDir: string, featuresDir: string }) {
    this.bot = bot;
    this.commandsDir = options.commandsDir;
    this.eventsDir = options.eventsDir;
    this.featuresDir = options.featuresDir;
  }

  // Load all commands
  async loadCommands() {
    const { readdir } = require("fs/promises");
    const { join } = require("path");
    const files = await readdir(join(__dirname, this.commandsDir));
    for (const file of files) {
      const command = require(join(__dirname, this.commandsDir, file)).default;
      this.bot.commands.set(command.name, command);
    }
  }

  // Load all events
  async loadEvents() {
    const { readdir } = require("fs/promises");
    const { join } = require("path");
    const files = await readdir(join(__dirname, this.eventsDir));
    for (const file of files) {
      const event = require(join(__dirname, this.eventsDir, file)).default;
      this.bot.on(event.name, event.run.bind(null, this.bot));
    }
  }

  // Load all features
  async loadFeatures() {
    const { readdir } = require("fs/promises");
    const { join } = require("path");
    const files = await readdir(join(__dirname, this.featuresDir));
    for (const file of files) {
      const feature = require(join(__dirname, this.featuresDir, file)).default;
      feature.run(this.bot);
    }
  }
}