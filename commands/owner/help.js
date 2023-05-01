const db = require("quick.db")
const Discord = require('discord.js')
const { switchOwners } = require('../../functions/ownerWl')

module.exports = {

    name: "help",
    description: "Permet de chercher un membre en vocal dans le serveur",
    category: "Information",
    
       async run(client, message, args) {

        let ownerData = db.get(`owners_${client.user.id}`) || []
        let wlData = db.get(`whitelists_${client.user.id}`) || []
        if ((!ownerData || !ownerData.find(x => x.user === message.author.id)) && (!wlData || !wlData.find(x => x.user === message.author.id)) && (client.config.ownerID !== message.author.id)) { return message.reply("*Vous n'avez pas la permission d'utiliser cette commande !*");
        }
        let user;
        try{
            user = args.getUser("membre")
        }catch(e){
            user = message.mentions.users.first() || client.users.cache.get(args[0])
            if(!user) user = message.user === undefined ? message.author : message.user
        }

        if (!user) try {
            user = await client.users.fetch(args[0]);
        } catch (e) {
            user = message.user === undefined ? message.author : message.user
        } 
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const embed = new Discord.MessageEmbed()
            .setTitle("Help")
            .setColor("#313338")
            .setDescription(`*Ce script a été fait par \`/novaworld\`*\n\n\`${client.prefix}find [mention/id]\` Permet de find une personne\n\`${client.prefix}join <channel>\` Permet de rejoindre le channel vocal mentionner\n\`${client.prefix}mv <mention/id>\` Permet de move la personne mentionner dans votre vocal\n\`${client.prefix}ping\` Permet d'avoir le ping du bot`)
            .setTimestamp()
            .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
    
            return message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
    }
}