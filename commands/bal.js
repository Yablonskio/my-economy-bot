import { EmbedBuilder } from 'discord.js'
import { foundAuthor } from '../main/BasicComponents.js'
import { client } from '../index.js'

export default function bal(msg, member, dataWrite) {
	let balEmbed = new EmbedBuilder()
		.setColor(0xf09656)
		.setTitle('На вашем балансе: ' + member.money + ' 💸')
		.setAuthor({ name: msg.author.tag, iconURL: msg.author.avatarURL()})
		.setDescription('Доп. 💵 каждый час: ' + member.cooldown[3].amount +
			'\nДоп. 💵 каждый день: ' + member.cooldown[4].amount)
		.setFooter({ text: 'Balance', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1070038260316901467/okey.png' })
		.setTimestamp()
	if (msg.content.split(' ')[1] === undefined) {
		msg.channel.send({embeds: [balEmbed]})
		return
	}
	let anotherWallet = msg.content.split(' ')[1].substring(2).slice(0, -1)
	try {
		anotherWallet = foundAuthor(anotherWallet, dataWrite)
	} catch {
		balEmbed = new EmbedBuilder()
			.setColor(0xeb4034)
			.setTitle('Ошибка, такого кошелька еще не существует :(')
			.setDescription('')

		msg.channel.send({ embeds: [balEmbed]})
		return
	}

	let anotherNick = client.users.cache.get(anotherWallet.id).tag
	let anotherAvatar = client.users.cache.get(anotherWallet.id).avatarURL()

	balEmbed = new EmbedBuilder()
		.setTitle('На его балансе:  ' + anotherWallet.money + ' 💸')
		.setAuthor({ name: anotherNick, iconURL: anotherAvatar})
		.setDescription('Доп. 💵 каждый час: ' + anotherWallet.cooldown[3].amount +
			'\nДоп. 💵 каждый день: ' + anotherWallet.cooldown[4].amount)

	msg.channel.send({ embeds: [balEmbed]})
}