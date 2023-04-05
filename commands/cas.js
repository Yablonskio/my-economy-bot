import { EmbedBuilder } from 'discord.js'

export default function cas(msg, member) {
	let casEmbed = new EmbedBuilder()
		.setColor(0xeb4034)
		.setTitle('НЕТ денег!')
		.setAuthor({ name: 'Cаsino', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1092510533778939934/cartaBetter.png'})
		.setDescription('Все проиграл?')
		.setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() })

	let amountPay = msg.content.split(' ')[1]

	if (amountPay % 1 !== 0) {
		casEmbed.setDescription('Можно переводить лишь целые числа')
		msg.channel.send({ embeds: [casEmbed]})
		return
	}
	if (member.money < amountPay) {
		msg.channel.send({ embeds: [casEmbed]})
		return
	}

	casEmbed
		.setColor(0x83e83a)
		.setTitle('ПОБЕДИЛ! +' + amountPay + '💸 к счету')
		.setAuthor({ name: 'Casino', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1092510533778939934/cartaBetter.png'})
		.setDescription('Пошла светлая полоса! Давай еще раз 👺')

	if (Math.random() < 0.5) {
		member.money += Number(amountPay)
	} else {
		member.money -= Number(amountPay)
		casEmbed.setColor(0xeb4034)
			.setTitle('НЕУДАЧА! -' + amountPay + '💸 к счету')
			.setDescription('Скоро будет светлая полоса! Давай еще раз 👺')

	}

	msg.channel.send({ embeds: [casEmbed]})
}