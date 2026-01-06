const { ClusterManager } = require("discord-hybrid-sharding");
require("dotenv").config();

const manager = new ClusterManager("index.js", {
  totalShards: "auto",
  shardsPerClusters: 2,
  totalClusters: "auto",
  mode: "process",
  token: process.env.BOT_TOKEN || process.env.DISCORD_TOKEN,
});

manager.on("clusterCreate", (cluster) => {
  console.log(`[CLUSTER] Launched Cluster ${cluster.id}`);
});

manager.spawn({ timeout: -1 });
