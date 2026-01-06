const { EmbedBuilder } = require("discord.js");
const { Ticket, TicketCategory } = require("../../schema/ticket.js");

module.exports = {
  name: "ticketrename",
  category: "Ticket",
  aliases: ["tren", "trename"],
  description: "Rename a ticket channel.",
  args: true,
  usage: "<new-name>",
  botPerms: ["ManageChannels"],
  userPerms: [], // We handle support-role check manually
  owner: false,
  cooldown: 3,

  execute: async (message, args, client, prefix) => {
    const newName = args.join("-").toLowerCase();

    if (!newName)
      return message.reply("❌ Please provide a new ticket name.");

    // Find the ticket in database
    const ticketData = await Ticket.findOne({
      Guild: message.guild.id,
      ChannelId: message.channel.id,
    });

    if (!ticketData)
      return message.reply("❌ This command can only be used **inside a ticket channel**.");

    // Get the ticket category (contains SupportRoles)
    const categoryData = await TicketCategory.findOne({
      Guild: message.guild.id,
      _id: ticketData.CategoryId,
    });

    if (!categoryData)
      return message.reply("❌ Could not load ticket category data.");

    // Check support roles
    const supportRoles = categoryData.SupportRoles || [];
    const member = message.member;

    const hasSupport =
      member.roles.cache.some((r) => supportRoles.includes(r.id)) ||
      member.permissions.has("Administrator");

    if (!hasSupport)
      return message.reply("❌ Only **support team members** can rename tickets.");

    // Rename channel
    try {
      await message.channel.setName(`ticket-${newName}`);

      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`✅ Ticket renamed to **ticket-${newName}**`)
        ]
      });
    } catch (err) {
      console.error(err);
      return message.reply("❌ Failed to rename the ticket channel.");
    }
  },
};
