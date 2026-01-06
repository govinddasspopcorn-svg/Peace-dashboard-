module.exports = {
  token: process.env.DISCORD_TOKEN || "",
  prefix: process.env.PREFIX || "!",
  ownerID: process.env.OWNER_ID || "1266043322129059925",
  embedColor: process.env.EMBED_COLOR || "#FFD700",
  mongourl: process.env.MONGO_URL || "",
  topgg: process.env.TOPGG_API_KEY || "",
  
  links: {
    invite: process.env.BOT_INVITE_LINK || "https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands",
    support: process.env.SUPPORT_SERVER || "https://discord.gg/your-server",
    power: process.env.BOT_NAME || "Multipurpose Bot",
  },
  
  nodes: [
    {
      name: "Node 1",
      host: process.env.LAVALINK_HOST || "localhost",
      port: parseInt(process.env.LAVALINK_PORT) || 2333,
      password: process.env.LAVALINK_PASSWORD || "youshallnotpass",
      secure: process.env.LAVALINK_SECURE === "true" || false,
    },
  ],
  
  spotify: {
    clientID: process.env.SPOTIFY_CLIENT_ID || "",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
  },
};
