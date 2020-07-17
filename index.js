﻿const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require('moment');
const prefix = "-";



client.on("ready", () => {
    function randomStatus() {
      let status = ["MAROC", "VALORANT", "BROADCAST"]
      let rstatus = Math.floor(Math.random() * status.length);
  
      client.user.setActivity(status[rstatus], {type: "STREAMING", url: "https://www.twitch.tv/xdarwinx_"});
    }; setInterval(randomStatus, 5000)
    
  });




client.on("message", async message => {
    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
        if(!message.channel.guild) return;
            var args = message.content.split(" ").slice(1).join(" ");
            if(command == "dm") {
                if(!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("**Sorry, You don't have permissions to do this.**");
                }
                    if(!args) {
                        return message.reply("**You must type a word or sentence to send the message!**");
                    }
                        message.channel.send(`**Are you sure you want to send the message?**\n**MessageContent: \`${args}\`**`).then(m => {
                            m.react("👍")
                            .then(() => m.react("👎"));

                            let yesFilter = (reaction, user) => reaction.emoji.name == "👍" && user.id == message.author.id;
                            let noFiler = (reaction, user) => reaction.emoji.name == "👎" && user.id == message.author.id;

                            let yes = m.createReactionCollector(yesFilter);
                            let no = m.createReactionCollector(noFiler);

                            yes.on("collect", v => {
                                m.delete();
                                    message.channel.send(`✅ | Done!\n> **The Message Has Been Sent Successfully**\n> To: **${message.guild.memberCount}** Members.`).then(msg => msg.delete(5000));
                                        message.guild.members.cache.forEach(member => {
                                            const embed = new Discord.MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('<a:8584_pin:725798073753927761>・IMPORTANT ANNOUNCEMENT')
                                            .setTimestamp()
                                            .setImage('https://i.imgur.com/MJwCbLF.gif')
                                            .setThumbnail(member.user.displayAvatarURL({format: "gif", format: "png", dynamic: true, size: 1024}))
                                            .setAuthor(message.guild.name, message.guild.iconURL({format: "gif", format: "png", dynamic: true, size: 1024}))
                                            .setFooter('BY ' + message.author.username, message.author.displayAvatarURL({format: "gif", format: "png", dynamic: true}))
                                            .addFields(
                                                { name: '<a:6795_rainbowleft:729671060664090634> **SERVER**', value: "`" + message.guild.name + "`", inline: true },
                                                { name: '<a:6795_rainbowleft:729671060664090634> **SEND BY**', value: "<@" + message.author.id + ">", inline: true },
                                                { name: '<a:6795_rainbowleft:729671060664090634> **SEND AT**', value: `${moment.utc().format("D/M/Y")} | **${moment.utc().fromNow()}**`, inline: true },
                                            )
                                            member.send(embed);
                                            member.send(`\n\n\n> **USER**: ||${member}||\n> **MESSAGE**:\n\n${args}`);
                                        });
                        });
                        no.on("collect", v => {
                            m.delete();
                            message.channel.send("**Broadcast Canceled.**").then(msg => msg.delete(3000));
                        });
                            
                        });
            }
            
                            
});

client.login('NzE4NDY0OTgwNjMwMTEwMjU5.XxIpAA.wygWU069KQzgapgOuvuoWgh_7Lw');