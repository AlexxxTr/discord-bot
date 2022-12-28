import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const pingCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with pong!");

module.exports = {
  data: pingCommand,
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("pong");
  },
};
