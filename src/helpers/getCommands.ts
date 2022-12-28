import { Collection } from "discord.js";
import { join } from "node:path";
import { readdirSync } from "node:fs";
import { ICommand } from "../interfaces/command";

function getCommands() {
  const commands = new Collection<string, ICommand>();

  const commandsPath = join(__dirname, "../commands");
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".ts")
  );

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath);
    commands.set(command.data.name, command);
  }
  return commands;
}

export default getCommands
