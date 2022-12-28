import { readdirSync } from "node:fs";
import { join } from "node:path";
import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { IEventsExport } from "./helpers/eventExports";

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const eventsPath = join(__dirname, "events");
const eventFiles = readdirSync(eventsPath).filter((file) =>
  file.endsWith(".ts")
);

for (const file of eventFiles) {
  const filePath = join(eventsPath, file);
  const event = require(filePath) as IEventsExport;
  event.once
    ? client.once(event.name, (...args) => event.execute(...args))
    : client.on(event.name, (...args) => event.execute(...args));
}

client.login(process.env.TOKEN);
