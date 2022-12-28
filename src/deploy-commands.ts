import { REST, Routes } from "discord.js";
import { config } from "dotenv";
import fs from "node:fs";

config();

const commands: Object[] = [];

const commandFiles = fs
  .readdirSync("src/commands")
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data: any = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
