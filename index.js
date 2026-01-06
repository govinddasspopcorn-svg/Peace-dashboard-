const { Collection } = require("discord.js");
const MusicBot = require("./src/structures/MusicClient");
const initializeCleanup = require("./src/events/Client/PremiumChecks");
const Dokdo = require("dokdo");
const client = new MusicBot();
const util = require("./src/utils/util");
const config = require("./src/config");

/* ================= CONSOLE TRACKING ================= */
global.__consoleLogs = {
  log: null,
  error: null,
  warn: null,
};

const _log = console.log;
const _error = console.error;
const _warn = console.warn;

console.log = (...args) => {
  global.__consoleLogs.log = args.map(String).join(" ");
  _log(...args);
};

console.error = (...args) => {
  global.__consoleLogs.error = args.map(String).join(" ");
  _error(...args);
};

console.warn = (...args) => {
  global.__consoleLogs.warn = args.map(String).join(" ");
  _warn(...args);
};
/* =================================================== */

// Attach utilities
client.util = new util(client);
module.exports = client;

client.ticket = new (require("./src/utils/ticketHandler"))(client);
// Connect Bot
client.connect();

// Dokdo Debugger (SINGLE OWNER)
client.Jsk = new Dokdo.Client(client, {
  aliases: ["dokdo", "dok", "jsk"],
  prefix: "?",
  owners: ["1266043322129059925"],
});

// Required shell env
process.env.SHELL = process.platform === "win32" ? "powershell" : "bash";

// Collections
client.userSettings = new Collection();

// Colors
client.color = "#FFD700";
client.colors = {
  primary: "#FFD700",
  accent: "#FFA500",
  success: "#10b981",
  error: "#f43f5e",
  warning: "#f59e0b",
  info: "#00D9FF",
  premium: "#FFD700",
  dark: "#1a1a1a",
  gold: "#FFD700",
};

// Emojis (UNCHANGED)
client.emoji = {
  music: "<:music:1127607386799083592>",
  playing: "<a:Playing:1188088755819663400>",
  volumehigh: "<:volumehigh:1188203004646666320>",
  play: "<:play:1188349488184701018>",
  stop: "<:resume:1188183870298918932>",
  skip: "<:forward:1188182458903036034>",
  resume: "<:resume:1188183870298918932>",
  join: "<:join:1188193835889729546>",
  leave: "<:leave:1188193876817752164>",
  autoplay: "<:autoplay:1188188713428209777>",
  mute: "<:mute:1188202691302785174>",
  volumemiddle: "<:volumemiddle:1188203002285268992>",
  volumelow: "<:volumelow:1188202998611071056>",
  shuffle: "<:shuffle:1188182084473335859>",
  rewind: "<:rewind:1188182454507425952>",
  queue: "<:queue:1188184969793781850>",
  playlist: "<:playlist:1188185181237039114>",
  pause: "<:pause:1188185761955188737>",
  loop: "<:loop:1188182962412462190>",
  forward: "<:forward:1188182458903036034>",
  filter: "<:filter:1188187546321158184>",
  addsong: "<:autoplay:1188188713428209777>",
  replay: "<:loop:1188182962412462190>",
  giveaway: "<a:giveaway:1440153256964788306>",
  extra: "<:extra:1389892183401824287>",
  role: "<:roles:1389892180402765844>",
  delete: "<:del:1188108090499923999>",
  left: "<:left:1127618224595406929>",
  right: "<:right:1127618208510255165>",
  tick: "<:yes:1127619660519575612>",
  cross: "<:no:1127619635316015184>",
  dot: "<:dot:1201841280577970176>",
  warn: "<:warn:1127619432865337344>",
  search: "<:search:1188194606823788644>",
  jump: "<:join:1188198497120423957>",
  loading: "<a:loading:1193991974718537840>",
  config: "<:config:1127607954561056768>",
  information: "<:info:1188195669660422226>",
  home: "<:home:1127607405061079061>",
  ignore: "<:ignore:1224281352988397630>",
  profile: "<:profile:1224281268934414427>",
  premium: "<:premium:1225681906851512380>",
  dnd: "<:dnd:1230951770973278229>",
  offline: "<:offline:1230951861603795019>",
  online: "<:online:1230951647962726612>",
  idle: "<:idle:1230952869679599687>",
  voice: "<:voice:1231172368404054117>",
  fun: "<:fun:1231172370929156106>",
  moderation: "<:mod:1231172366244253716>",
  pfp: "<:pfp:1231174798642643008>",
  autoresponder: "<:autoresponder:1312668357199401003>",
  insta: "<:Insta:1196715538773180478>",
  snap: "<:Snap:1196715534587281438>",
  discord: "<:discord:1318846313579941888>",
  welc: "<:welc:1188198497120423957>",
  utility: "<:utility:1232983033871728651>",
  antinuke: "<:anti:1389892187805974558>",
};

// Top.gg API
const { Api } = require("@top-gg/sdk");
client.topgg = new Api(process.env.TOPGG_API_KEY);

// Dokdo runtime
client.on("messageCreate", (message) => {
  client.Jsk.run(message);
});

// ========= DROP SYSTEM INTEGRATION ==========
const drops = require("./src/integrations/dropsIntegration");

client.once("ready", () => {
  drops.init(client, {
    prefix: config.prefix,
    ownerID: config.ownerID,
    intervalMs: 60000,
  });

  console.log("✅ Drops system loaded (prefix mode)");
});

// ================= ERROR HANDLING =================
process.on("unhandledRejection", (reason) => console.error(reason));
process.on("uncaughtException", (err) => console.error(err));
process.on("uncaughtExceptionMonitor", (err) => console.error(err));