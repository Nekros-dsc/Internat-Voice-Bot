const db = require("quick.db")
const Discord = require('discord.js')
const { switchOwners } = require('../../functions/ownerWl')
module.exports = {
    
    name: "join",
    description: "Permet de move un membre dans votre vocal",
    category: "Information",

    async run(client, message, args) {
      let ownerData = db.get(`owners_${client.user.id}`) || []
      let wlData = db.get(`whitelists_${client.user.id}`) || []
      if ((!ownerData || !ownerData.find(x => x.user === message.author.id)) && (!wlData || !wlData.find(x => x.user === message.author.id)) && (client.config.ownerID !== message.author.id)) { return message.reply("*Vous n'avez pas la permission d'utiliser cette commande !*");
      }
        const membre = message.member
        if (!membre.voice.channel) return message.reply("*tu n'es pas dans une vocal*")
        let v = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first()
        if (!v || v.type !== 'GUILD_VOICE') {
            return message.reply('*Veuillez spécifier un ID de salon vocal valide.*')
          }
    
        membre.voice.setChannel(v)
        const embed = new Discord.MessageEmbed()
                .setTitle("Join")
                .setDescription(`*Tu as bien été move dans le vocal ${v}*`)
                .setColor("#313338")
                .setTimestamp()
                .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                return message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
  
        }
    }