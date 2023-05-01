const db = require("quick.db")
const Discord = require('discord.js')
const { switchOwners } = require('../../functions/ownerWl')
module.exports = {
    
    name: "mv",
    description: "Permet de move un membre dans votre vocal",
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
        const membre = message.mentions.members.first() || message.guild.members.cache.get()
            
        if(!membre) return message.channel.send(`*Merci de mentionner un membre ou de mettre son id.*`)
        if (!membre.voice.channel) return message.channel.send(`*Ce membre n'est pas dans un salon vocal.*`)
        if (!message.member.voice.channel) return message.channel.send("*Veuillez rejoindre un salon vocal.*")
        

        if(membre.voice.channel === message.member.voice.channel) return message.reply("*Il est dans votre vocal*")
        membre.voice.setChannel(message.member.voice.channel).then(() => {
           const embed = new Discord.MessageEmbed()
                .setTitle("Move")
                .setDescription(`*J\'ai déplacé ${membre} dans <#${message.member.voice.channel.id}>*`)
                .setColor("#313338")
                .setTimestamp()
                .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                return message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
        })
    }
}