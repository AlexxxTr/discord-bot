import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const serverCommand = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Provides information about the server.");

module.exports = {
  data: serverCommand,
  async execute(interaction: ChatInputCommandInteraction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(
      `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
    );
  },
};
