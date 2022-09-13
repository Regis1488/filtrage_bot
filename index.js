const {Client, GatewayIntentBits, Partials} = require('discord.js')
process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
  });
const Perspective = require('perspective-api-client')
const perspective = new Perspective({apiKey: ""});
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildBans
    ],
    partials: [Partials.Channel]
})
client.on('ready', () => {
    console.log('slt')
})

client.on("messageCreate", async(message) => {
    if(message.member.permissions.has("Administrator")) return
    if(message.content == "aya") { return }
    if(hasUnicode(message.content) === true) {
        message.author.send("You have been punished with 10 seconds of mute, next time be a good Christian \n Toxicity: 100%")
        message.delete()
        message.member.timeout(10000, "Toxitiy : " + "100%")
        return
    }
    (async () => {
        var result = await perspective.analyze(message.content)
        var resultCalcul = result["attributeScores"]["TOXICITY"]["summaryScore"]["value"]*100
        if(resultCalcul >= 50) {
        message.delete()
        message.author.send("VYou have been punished with 10 seconds of mute, next time be a good Christian \n Toxicity:" + resultCalcul+"%")
        message.member.timeout(10000, "Toxitiy : " + resultCalcul+"%")
        }
    })();

})
client.login("")
