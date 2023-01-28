import Commands from "./Commands.js";
import { Client, GatewayIntentBits } from 'discord.js'
import logicBuy from "./logicShop.js";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
})

const PREFIX = 'q'
let guild = client.guilds.cache.get('1061299852341936138')
export default guild
const dataCommand = {
	work: {cooldown: 30000, payment: 100, percent: 30},
	act: {cooldown: 60000, payment: 170, percent: 60},
	crime: {cooldown: 600000, payment: 1000, percent: 50}
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('Мой префикс: q')
})
client.on('messageCreate', msg => {
	if (msg.author.bot || !msg.content.toLowerCase().startsWith(PREFIX))
		return

	let cmd = msg.content.split(' ')[0].slice(PREFIX.length).toLowerCase()


	Commands(cmd, msg, dataCommand)


})



client.login('OTQxMDM0MzE1MTg4NDM3MDUz.GoFbwm.8TWcaSMKK5hPuxfIiH50qWDGthI-5HHBYAxecM');