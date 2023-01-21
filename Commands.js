import { EmbedBuilder, AttachmentBuilder } from 'discord.js'
import fs from 'fs'
import callLogicCmd from './logic.js'
import logicBuy from "./logicShop.js";
import {foundAuthor, addNewUser} from './BasicComponents.js'

function Commands(command, msg, dataCommand) {
	switch (command) {
		case 'work':
			callLogicCmd(1, msg, dataCommand)
			break;
		case 'act':
			callLogicCmd(2, msg, dataCommand)
			break;
		case 'crime':
			callLogicCmd(3, msg, dataCommand)
			break;
		// DEV
		case 'calm':
			callLogicCmd(4, msg, dataCommand)
			callLogicCmd(5, msg, dataCommand)
			break;
		case 'bal':
			fs.readFile('dataUser.json', function (err, data) {
				let dataWrite = JSON.parse(data)
				let userID = foundAuthor(msg, dataWrite)
				if (userID === false) addNewUser(msg, dataWrite)
				if (err) console.log(err)
				else {
					if (userID === undefined) {
						dataWrite.push(addNewUser)
						fs.writeFile('dataUser.json', JSON.stringify(dataWrite),
							(err) => err && console.error(err))
						msg.channel.send('Добро пожаловать! Ваш начальный баланс: 500')
						//msg.channel.send('У вас еще нету баланса или мы не нашли ваш кошелек')
						return true
					}
					msg.channel.send('Ваш баланс: ' + dataWrite[userID].money)
					fs.writeFile('dataUser.json', JSON.stringify(dataWrite),
						(err) => err && console.error(err))
				}})
			break;
		case 'shop':
			const shopEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setAuthor({ name: 'Магазин',
					iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1064311181239664720/shop.png'})
				.setDescription('Будет картинка со всеми товарами это просто заготовка что-бы скопировать названия роли')
				.addFields(
					{ name: 'Команда: \"Qbuy (название роли)\" для покупки', value: '\u200B' },
					{ name: 'Элитные роли', value: '\u200B'},
					{ name: 'Туз', value: '💵 150,000', inline: true },
					{ name: 'Король', value: '💵 80,000', inline: true },
					{ name: 'Валет', value: '💵 40,000', inline: true },
					{ name: 'Зарабатывающие роли', value: '\u200B'},
					{ name: 'Шахтер 3', value: '💵 20,000\nдоп. 6000💵 за час', inline: true },
					{ name: 'Шахтер 2', value: '💵 10,000\nдоп. 4000💵 за час', inline: true },
					{ name: 'Шахтер 1', value: '💵 5,000\nдоп. 2000💵 за час', inline: true },
					{ name: 'Коллекционерские роли', value: '\u200B'},
					{ name: 'Любвеобильный', value: '💵 50,000', inline: true },
					{ name: 'Пушистик', value: '💵 10,000', inline: true },
					{ name: 'Дед внутри', value: '💵 80,000', inline: true },
				)
				//.setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() });
			msg.reply({ embeds: [shopEmbed]})
			break;
		case 'buy':
			logicBuy(msg)
			break;
		case 'help':
			const helpEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setAuthor({ name: 'Помощь'})
				.addFields(
					{ name: 'Qwork', value: 'Команда для заработка в средем дает 120💵 раз в 30 секунд' },
					{ name: 'Qact', value: 'Команда для заработка в средем дает 220💵 раз в 1 минуту' },
					{ name: 'Qcrime', value: 'Команда для заработка в средем дает 500💵 раз в 1 час' },
					{ name: 'Qbal', value: 'Команда для того что-бы узнать свой баланс' },
					{ name: 'Qshop', value: 'Команда просмотра магазина' },
					{ name: 'Qbuy', value: 'Команда для покупки товара в магазине' },
					{ name: 'Qcalm', value: 'Команда для сбора денег, за предметы из магазина' },
				)
			msg.reply({ embeds: [helpEmbed]})
			break;
		default:
			console.log('Error in command switch')
	}
}
export default Commands