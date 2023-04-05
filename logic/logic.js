import { EmbedBuilder } from 'discord.js'
import { dataCommand as dataCmd } from '../index.js'
// 1 - work; 2 - act; 3 - crime; 4 - hour money; 5 - day money;

export default function logicCmd(msg, member, dataWrite, type) {
	let dateNow = new Date().getTime()

	let cooldown = member.cooldown[type]

	let paymentCmd = dataCmd[type].payment
	let cooldownCmd = dataCmd[type].cooldown

	try {
		if (type === 4) {
			cooldown = member[type].cooldown
			paymentCmd = member[type].amount
		} else if (type === 5) {
			cooldown = member[type].cooldown
			paymentCmd = member[type].amount
		} else {
			cooldown = member.cooldown[type]
			paymentCmd = dataCmd[type].payment
		}
	} catch (e) {
		let workErrorEmbed = new EmbedBuilder()
			.setColor(0xeb4034)
			.setTitle('У вас нету стороннего заработка')
			.setAuthor({ name: 'Calm', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1070042361863868628/okey3.png'})
			.setDescription('Команда не доступна')
			.setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() })

		msg.channel.send({ embeds: [workErrorEmbed]})
		return
	}

	if (paymentCmd === 0) return

	if (dateNow - cooldown >= cooldownCmd || cooldown === 0) {
		let name = dataCmd[type].name
		let percentCmd = dataCmd[type].percent
		let percentDouble = dataCmd[type].percentDouble

		member.cooldown[type] = dateNow

		let randomMoney =
			Math.floor(Math.random() * paymentCmd / 100 * percentCmd)

		if (Math.ceil(Math.random() * 100/5)*5 < percentCmd &&
		percentDouble !== 0) {
			randomMoney *= 2
		}

		let moneyEarn = paymentCmd + randomMoney
		member.money = member.money + moneyEarn

		let workEmbed = new EmbedBuilder()
			.setColor(0x66de86)
			.setTitle('Вы заработали: +' + moneyEarn + '💸')
			.setAuthor({ name: name, iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1064307830510854144/plus.png'})
			.setDescription('На балансе теперь: **' + member.money + '**💵')
			.setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() })

		msg.channel.send({ embeds: [workEmbed]})
	} else {
		let cooldownText = cooldownCmd - (dateNow - cooldown)
		cooldownText = (cooldownText-(cooldownText%1000))/1000

		let cooldownSec = cooldownText
		cooldownText = Math.floor(cooldownText / 60)

		let restEmbed = new EmbedBuilder()
			.setColor(0xe8c96b)
			.setTitle(`Отдых, еще осталось: ${cooldownSec} сек`)
			.setAuthor({ name: 'Отдых', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1086679571690176646/palma.png'})
			.setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() })
			.setTimestamp()

		if (cooldownText === 0) {
			msg.channel.send({ embeds: [restEmbed]})
			return
		}

		cooldownSec = Math.floor(cooldownSec % 60)

		msg.channel.send({ embeds: [restEmbed.setTitle(`Отдых, еще осталось: ${cooldownText} мин и ${cooldownSec} сек`)]})
	}
}