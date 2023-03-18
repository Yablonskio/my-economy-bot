// 1 - work; 2 - act; 3 - crime; 4 - hour money; 5 - day money;
import fs from "fs";
import { EmbedBuilder } from 'discord.js'

import {foundAuthor, addNewUser} from '../main/BasicComponents.js'
function logicCmd(msg, data, dataCmd, type) {
	let dateNow = new Date().getTime()
	let cooldown, cooldownCmd, paymentCmd, percentCmd
	switch (type) {
		case 1:
			cooldown = data.cooldownW
			cooldownCmd = dataCmd.work.cooldown
			paymentCmd = dataCmd.work.payment
			percentCmd = dataCmd.work.percent
			break;
		case 2:
			cooldown = data.cooldownA
			cooldownCmd = dataCmd.act.cooldown
			paymentCmd = dataCmd.act.payment
			percentCmd = dataCmd.act.percent
			break;
		case 3:
			cooldown = data.cooldownC
			cooldownCmd = dataCmd.crime.cooldown
			paymentCmd = dataCmd.crime.payment
			percentCmd = dataCmd.crime.percent
			break;
		case 4:
			cooldown = data.hourMoney.cooldown
			cooldownCmd = 3600000
			paymentCmd = data.hourMoney.amount
			percentCmd = 0
			break;
		case 5:
			cooldown = data.dayMoney.cooldown
			cooldownCmd = 86400000
			paymentCmd = data.dayMoney.amount
			percentCmd = 0
			break;
		default:
			console.log('Error in switch!')
	}
	if (paymentCmd === 0) return
	if (dateNow - cooldown >= cooldownCmd || cooldown === 0) {
		let name
		switch (type) {
			case 1:
				data.cooldownW = dateNow
				name = 'Work'
				break;
			case 2:
				data.cooldownA = dateNow
				name = 'Act'
				break;
			case 3:
				data.cooldownC = dateNow
				name = 'Crime'
				break;
			case 4:
				data.hourMoney.cooldown = dateNow
				name = 'Calm'
				break;
			case 5:
				data.dayMoney.cooldown = dateNow
				name = 'Calm'
				break;
			default:
				console.log('Error in switch!')
		}
		let rundomMoney =
			Math.floor(Math.random() * paymentCmd / 100 * percentCmd)
		let moneyEarn = paymentCmd + rundomMoney
		data.money = data.money + moneyEarn
		let workEmbed = new EmbedBuilder()
			.setColor(0x66de86)
			.setTitle('Вы заработали: +' + moneyEarn + '💸')
			.setAuthor({ name: name, iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1064307830510854144/plus.png'})
			.setDescription('На балансе теперь: **' + data.money + '**💵')
			.setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() })
		msg.channel.send({ embeds: [workEmbed]})
	} else {
		let cooldownText = cooldownCmd - dateLater
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

async function callLogicCmd(type, msg, dataCommand) {
	await fs.readFile('dataUser.json', function (err, data) {
		let dataWrite = JSON.parse(data)
		let member = foundAuthor(msg.author.id, dataWrite)
		if (member === false) {
			addNewUser(msg, dataWrite)
		} else {
			if (err) console.log(err)
			else logicCmd(msg, member, dataCommand, type)
		}
		if (dataWrite !== Object) {
			fs.writeFile('dataUser.json', JSON.stringify(dataWrite),
				(err) => err && console.error(err))
		} else console.log('CRITICAL ERROR!!!')

	})
}

export default callLogicCmd