/** @format */

require('dotenv').config();
const parseBoolean = (value) => value === "true";

module.exports = {
  token: process.env.BOT_TOKEN || process.env.DISCORD_TOKEN,
  prefix: process.env.BOT_PREFIX || process.env.PREFIX || "..",
  ownerID: process.env.OWNER_ID,

  SpotifyID: process.env.SPOTIFY_ID,
  SpotifySecret: process.env.SPOTIFY_SECRET,

  mongourl: process.env.MONGODB_URI || process.env.MONGO_URL,

  embedColor: "#18191C",
  logs: process.env.LOGS_WEBHOOK_URL || process.env.LOGS_WEBHOOK,
  node_source: "ytsearch",
  topgg: process.env.TOPGG_API_KEY || process.env.TOPGG_TOKEN || "here",

  links: {
    BG: "https://cdn.discordapp.com/attachments/1266043322129059925/1266043322129059925/20231217_232106.jpg",
    support: process.env.SUPPORT_SERVER || "https://discord.gg/SaPUXFHmgk",
    invite: "https://discord.com/oauth2/authorize?client_id=1398144708558979252&permissions=8&integration_type=0&scope=bot",
    power: "Powered By Peace Development 🌙",
    vanity: "https://discord.gg/s8F3zsn5",
    guild: process.env.GUILD_ID,
    topgg: "https://top.gg/bot/1266043322129059925/vote",
  },

  Webhooks: {
    black: process.env.WEBHOOK_BLACK,
    player_create: process.env.WEBHOOK_PLAYER_CREATE,
    player_delete: process.env.WEBHOOK_PLAYER_DELETE,
    guild_join: process.env.WEBHOOK_GUILD_JOIN,
    guild_leave: process.env.WEBHOOK_GUILD_LEAVE,
    cmdrun: process.env.WEBHOOK_CMDRUN,
  },

  nodes: [
    {
      url: process.env.NODE_URL || process.env.LAVALINK_URL || "lava-v4.ajieblogs.eu.org:443",
      name: process.env.NODE_NAME || process.env.LAVALINK_NAME || "Lavalink",
      auth: process.env.NODE_AUTH || process.env.LAVALINK_AUTH,
      secure: parseBoolean(process.env.NODE_SECURE || process.env.LAVALINK_SECURE || "true"),
    },
  ],
};