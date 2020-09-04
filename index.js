const Discord = require("discord.js"); // npm i discord.js
const client = new Discord.Client();
const moment = require('moment');  // npm i moment
const prefix = "-"; //prefix here



client.on("ready", () => {
      let status = ["Broadcast Bot By DARWIN"]
  
      client.user.setActivity(status, {type: "STREAMING", url: "https://www.twitch.tv/xdarwinx_"});    
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
                                            member.send(`${member}\n\n${args}`);
                                        });
                        });
                        no.on("collect", v => {
                            m.delete();
                            message.channel.send("**Broadcast Canceled.**").then(msg => msg.delete(3000));
                        });
                            
                        });
            }
            
                            
});

client.login('YOUR_TOKEN_HERE');
