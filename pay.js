import fs from "fs";
import {addNewUser, foundAuthor} from "./BasicComponents.js";
import {EmbedBuilder} from "discord.js";
import guild from "./index.js";

async function pay(msg) {
	await fs.readFile('dataUser.json',
		function (err, data) {
		let dataWrite = JSON.parse(data)
		let member = foundAuthor(msg.author.id, dataWrite)
		if (member === false) {
			addNewUser(msg, dataWrite)
		} else {
			if (err) console.log(err)
			else {
				payWorker(msg, dataWrite, member)
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
function payWorker(msg, dataWrite, member) {
	let payErrorEmbed = new EmbedBuilder()
		.setColor(0xeb4034)
		.setTitle('Опаньки-гопаньки, перевод не успешен')
		.setAuthor({ name: 'Pay', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1070042361863868628/okey3.png'})
		.setDescription('Произошла не известная ошибка, просим прощения')
		.setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() })

	try {
		msg.content.split(' ')[1].substring(2)
	} catch {
		payErrorEmbed.setDescription('Не удалось найти такой кошелек , возможно пользователь еще его не создал')
		msg.channel.send({ embeds: [payErrorEmbed]})
		return false
	}
	let walletTransWorker = msg.content.split(' ')[1].substring(2).slice(0, -1)
	let walletTrans = foundAuthor(walletTransWorker, dataWrite)
	let amountTrans = msg.content.split(' ')[2]
	if (walletTrans === false) {
		payErrorEmbed.setDescription('Не удалось найти такой кошелек , возможно пользователь еще его не создал')
		msg.channel.send({ embeds: [payErrorEmbed]})
		return true
	} else if (amountTrans % 1 !== 0) {
		payErrorEmbed.setDescription('Можно переводить лишь целые числа')
		msg.channel.send({ embeds: [payErrorEmbed]})
		return true
	} else if (member.money <= amountTrans) {
		payErrorEmbed.setDescription('У вас не достаточно денег для операции 💸')
		msg.channel.send({ embeds: [payErrorEmbed]})
		return true
	}
	let tax = amountTrans / 100 * 5
	amountTrans = amountTrans - tax

	member.money = member.money - amountTrans
	walletTrans.money = walletTrans.money + amountTrans

	let payEmbed = new EmbedBuilder()
		.setColor(0xeb4034)
		.setTitle('Ю-ху, перевод успешен')
		.setAuthor({ name: 'Pay', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1070042361536725011/okey2e.png'})
		.setDescription('Заглушка, чел получил деньги')
		.setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() })
	msg.channel.send({ embeds: [payEmbed]})
}
export default pay