import fs from "fs";
import {addNewUser, foundAuthor} from "../main/BasicComponents.js";
import {EmbedBuilder} from "discord.js";
import client from "../index.js";

async function cas(msg) {
	await fs.readFile('dataUser.json',
		function (err, data) {
			let dataWrite = JSON.parse(data)
			let member = foundAuthor(msg.author.id, dataWrite)
			if (member === false) {
				addNewUser(msg, dataWrite)
			} else {
				if (err) console.log(err)
				else {
					casWorker(msg, dataWrite, member)
				}
			}
			if (dataWrite !== Object) {
				fs.writeFile('dataUser.json', JSON.stringify(dataWrite),
					(err) => err && console.error(err))
			} else {
				console.log('CRITICAL ERROR!!!')
			}
		})
}
function casWorker(msg, dataWrite, member) {
	let casErrorEmbed = new EmbedBuilder()
		.setColor(0xeb4034)
		.setTitle('НЕТ денег!')
		.setAuthor({ name: 'Cаsino', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1092510533778939934/cartaBetter.png'})
		.setDescription('Все проиграл?')
		.setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() })
	let amountPay = msg.content.split(' ')[1]
	if (amountPay % 1 !== 0) {
		casErrorEmbed.setDescription('Можно переводить лишь целые числа')
		msg.channel.send({ embeds: [casErrorEmbed]})
		return
	}
	if (member.money < amountPay) {
		msg.channel.send({ embeds: [casErrorEmbed]})
		return
	}
	let casEmbed = new EmbedBuilder()
		.setColor(0x83e83a)
		.setTitle('ПОБЕДИЛ! +' + amountPay + '💸 к счету')
		.setAuthor({ name: 'Casino', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1092510533778939934/cartaBetter.png'})
		.setDescription('Пошла светлая полоса! Давай еще раз 👺')
		.setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() })
	if (Math.random() < 0.5) {
		console.log('fff')
		member.money += Number(amountPay)
	} else {
		member.money -= Number(amountPay)
		casEmbed.setTitle('НЕУДАЧА! -' + amountPay + '💸 к счету')
			.setDescription('Скоро будет светлая полоса! Давай еще раз 👺')
			.setColor(0xeb4034)
	}
	msg.channel.send({ embeds: [casEmbed]})
}
export default cas