import { config } from "dotenv";
import { Client, IntentsBitField } from "discord.js";
import { getRandomImage } from "./utils/randomImage";

config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "daj sliku") {
    getRandomImage(message);
  }
});

client.login(process.env.TOKEN);
