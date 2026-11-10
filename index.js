const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client{ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`${client.user.tag} aktif!`);
});

client.on('messageCreate', async (message) => {
    if (message.content === '!imvu') {
        message.reply('IMVU Botu aktif ve komut bekliyor!);
   }
});

client.login(process.env.TOKEN);
