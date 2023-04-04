// 1 - work; 2 - act; 3 - crime; 4 - hour money; 5 - day money;
import fs from "fs";
import { EmbedBuilder } from 'discord.js'
import {dataCommand as dataCmd} from "../index.js";
import {foundAuthor, addNewUser} from '../main/BasicComponents.js'
import Commands from "../main/Commands.js";
function logicCmd(msg, data, type) {
	let dateNow = new Date().getTime()
	let cooldown, paymentCmd
	let cooldownCmd = dataCmd[type].cooldown
	let percentCmd = dataCmd[type].percent
	let percentDouble = dataCmd[type].percentDouble
	cooldown = data.cooldown[type]
	paymentCmd = dataCmd[type].payment
	try {
		if (type === 4) {
			cooldown = data[type].cooldown
			paymentCmd = data[type].amount
		} else if (type === 5) {
			cooldown = data[type].cooldown
			paymentCmd = data[type].amount
		} else {
			cooldown = data.cooldown[type]
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
		data.cooldown[type] = dateNow
		let rundomMoney =
			Math.floor(Math.random() * paymentCmd / 100 * percentCmd)

		if (Math.ceil(Math.random() * 100/5)*5 < percentCmd &&
		percentDouble !== 0) {
			rundomMoney *= 2
		}
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

async function callLogicCmd(type, msg) {
	await fs.readFile('dataUser.json', function (err, data) {
		let dataWrite = JSON.parse(data)
		let member = foundAuthor(msg.author.id, dataWrite)
		if (member === false) {
			addNewUser(msg, dataWrite)
		} else {
			if (err) console.log(err)
			else logicCmd(msg, member, type)
		}
		if (dataWrite !== Object) {
			fs.writeFile('dataUser.json', JSON.stringify(dataWrite),
				(err) => err && console.error(err))
		} else console.log('CRITICAL ERROR!!!')

	})
}

export default callLogicCmd
