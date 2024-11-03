"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const discord_js_1 = require("discord.js");
const randomImage_1 = require("./utils/randomImage");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMembers,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.MessageContent,
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
        (0, randomImage_1.getRandomImage)(message);
    }
});
client.login(process.env.TOKEN);
