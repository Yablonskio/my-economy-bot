import { EmbedBuilder } from 'discord.js'
import { foundAuthor } from '../main/BasicComponents.js'
import { client } from '../index.js'

export default function pay(msg, member, dataWrite) {
	let payEmbed = new EmbedBuilder()
		.setColor(0xeb4034)
		.setTitle('Опаньки-гопаньки, перевод не успешен')
		.setAuthor({ name: 'Pay', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1070042361863868628/okey3.png'})
		.setDescription('Произошла не известная ошибка, просим прощения')
		.setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() })

	try {
		msg.content.split(' ')[1].substring(2)
	} catch {
		payEmbed.setDescription('Не удалось найти такой кошелек , возможно пользователь еще его не создал')
		msg.channel.send({ embeds: [payEmbed]})
		return
	}

	let walletTrans = msg.content.split(' ')[1].substring(2).slice(0, -1)
	walletTrans = foundAuthor(walletTrans, dataWrite)

	let amountTrans = msg.content.split(' ')[2]

	if (walletTrans === false) {
		payEmbed.setDescription('Не удалось найти такой кошелек , возможно пользователь еще его не создал')
		msg.channel.send({ embeds: [payEmbed]})
		return
	} else if (amountTrans % 1 !== 0) {
		payEmbed.setDescription('Можно переводить лишь целые числа')
		msg.channel.send({ embeds: [payEmbed]})
		return
	} else if (member.money <= amountTrans) {
		payEmbed.setDescription('У вас не достаточно денег для операции 💸')
		msg.channel.send({ embeds: [payEmbed]})
		return
	}

	let walletTransNick = client.users.cache.get(walletTrans.id).tag
	//let walletTransAvatar = client.users.cache.get(walletTrans.id).avatarURL()
	let tax = Math.floor(amountTrans / 100 * 5)

	amountTrans -= tax
	member.money -= amountTrans
	walletTrans.money += amountTrans

	payEmbed = new EmbedBuilder()
		.setColor(0x83e83a)
		.setTitle('Ю-ху, перевод успешен')
		.setAuthor({ name: 'Pay', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1070042361536725011/okey2e.png'})
		.setDescription(msg.author.tag + '(-' + amountTrans + '💵)  ⇢ ' + walletTransNick + '(+' + amountTrans + '💵)' +
			'\n Комиссия: ' + tax + '💵 (5%)')

	msg.channel.send({ embeds: [payEmbed]})
}