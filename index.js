import Commands from "./main/Commands.js";
import {Client, EmbedBuilder, GatewayIntentBits} from 'discord.js'

export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
})
export default client

const PREFIX = ['q', 'й']



export const dataCommand = [
	{name: 'Work', cooldown: 30000, payment: 100, percent: 30, percentDouble: 10},
	{name: 'Act', cooldown: 60000, payment: 170, percent: 60, percentDouble: 30},
	{name: 'Crime', cooldown: 600000, payment: 1000, percent: 50, percentDouble: 5},
	{name: 'Calm', cooldown: 3600000, payment: 0, percent: 0, percentDouble: 0},
	{name: 'Calm', cooldown: 86400000, payment: 0, percent: 0, percentDouble: 0},
]

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('Мой префикс: q/й')
})
client.on('messageCreate', msg => {
	if (msg.author.bot) return
	if (!msg.content.toLowerCase().startsWith(PREFIX[0]) && !msg.content.toLowerCase().startsWith(PREFIX[1])) return
	let cmd = msg.content.split(' ')[0].slice(1).toLowerCase()
	if (cmd.startsWith(PREFIX[0]) || cmd.startsWith(PREFIX[1])) return
	Commands(cmd, msg)
})



client.login(TOKEN);