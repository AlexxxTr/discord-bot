import { ChatInputCommandInteraction, Events } from "discord.js";
import getCommands from "../helpers/getCommands";

const commands = getCommands();

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};
