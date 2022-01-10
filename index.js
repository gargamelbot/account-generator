const lineReader = require("line-reader");
const firstline = require("firstline");
const Discord = require("discord.js");
const os = require("os");
const async = require("async");
const fs = require("fs");
const express = require('express');

const bot = new Discord.Client();
const generated = new Set();

let app = express();
let prefix = "/";

let messageArray = message.content.split(" ");
let args = messageArray.slice(1);


app.set("port", (process.env.PORT || 5000));
app.get("/", (request, response) => response.send("App is running")); //For avoidong Heroku $PORT error
    .listen(app.get("port"), () => {
        console.log(`App is running, server is listening on port: ${app.get('port')}`);
    }
});

bot.on("ready", () => console.log(`Logged in as ${bot.user.tag}!`));
bot.on("message", (message) => {
    if (message.channel.id === "Channel_ID") { //This will make the bot work only in that channel
        if (message.author.bot) return;
        let command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];
        if (command === "test") message.channel.send("Test done, bot is working");
        if (command === "gen") {
            if (generated.has(message.author.id)) {
                message.reply(`Wait 15 minutes before generating another account! - ${message.author}`);
            } else {
                const filePath = __dirname + "/" + args[0] + ".txt";
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                
                if (!args[0]) return message.reply("Please, specify the service you want!");
                fs.readFile(filePath,(err, data) => {
                    if (!err) {
                        let position = data.toString().indexOf("\n");
                        let firstLine = data.split("\n")[0];
                        
                        data = data.toString();
                        message.author.send(firstLine);
                        
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, (err) => {
                                const embed = {
                                    title: "Account Generated!",
                                    description: "Check your dm for the account's information!",
                                    color: 8519796,
                                    timestamp: "2019-04-04T14:16:26.398Z",
                                    footer: {
                                        icon_url: "https://cdn.discordapp.com/avatars/530778425540083723/7a05e4dd16825d47b6cdfb02b92d26a5.png",
                                        text: "Buy discord accounts from Mental#8106"
                                    }, thumbnail: { url:"http://www.compartosanita.it/wp-content/uploads/2019/02/right.png" },
                                    author: {
                                        name: "Account Generator",
                                        url: "https://discordapp.com",
                                        icon_url: bot.displayAvatarURL
                                    }, fields: []
                                }; message.reply({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => generated.delete(message.author.id), 150000); // Removes the user from the set after a minute
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else message.reply("Sorry, there isn't any account available for that service!");
                    } else message.reply("Sorry, that service doesn't exists on our database");
                });
            }
        } else if (command === "stats") message.reply(`Total users: ${bot.users.size}`)
        if (command === "add") {
            const filePath = __dirname + "/" + args[1] + ".txt";
            let account = args[0]
            let service = args[1]
            
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do it, you are not an admin!");
            fs.appendFile(filePath, os.EOL + args[0], (err) => {
                if (err) return console.log(err);
                message.reply("Done!")
            });
        }
        
        if (command === "create") {
            const filePath = __dirname + "/" + args[0] + ".txt";
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do it, you are not an admin!");
            fs.writeFile(filePath, "first:first", (err) => {
                if (err) throw err;
                message.channel.send("Done!")
            });
        }
        
        if (command === "restock") {
            let difArg = "**";
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do it, you are not an admin!");
            if (!args[0]) return message.reply("Please, specify the service you want to restock!");
            message.reply(`@everyone ${difArg+""+args[0]+""+difArg} has been restocked by '<@${message.author.id}>'`);
        }
    }
}); bot.login("Token");
