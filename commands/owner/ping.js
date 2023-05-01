const Discord = require("discord.js")

module.exports = {
    
    name: "ping",
    description: "Affiche la latence du Bot",
    category: "Information",

    run(client, message) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Ping")
        .setColor("#313338")
        .setDescription(`*Ping de l'API de Discord* **${client.ws.ping}ms**`)
        .setTimestamp()
        .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})

        return message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
    }
}