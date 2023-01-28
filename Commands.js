import { EmbedBuilder, AttachmentBuilder } from 'discord.js'
import fs from 'fs'
import callLogicCmd from './logic.js'
import logicBuy from "./logicShop.js";
import {foundAuthor, addNewUser} from './BasicComponents.js'
import pay from './pay.js'
import bal from './bal.js'

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
			bal(msg)
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
				.setAuthor({ name: 'Помощь | Команды бота'})
				.addFields(
					{ name: 'Qwork', value: 'Команда для заработка в средем дает 120💵 раз в 30 секунд' },
					{ name: 'Qact', value: 'Команда для заработка в средем дает 220💵 раз в 1 минуту' },
					{ name: 'Qcrime', value: 'Команда для заработка в средем дает 500💵 раз в 1 час' },
					{ name: 'Qbal или Qbal <пинг игрока>', value: 'Команда для того что-бы узнать баланс' },
					{ name: 'Qshop', value: 'Команда просмотра магазина' },
					{ name: 'Qbuy <название предмета>', value: 'Команда для покупки товара в магазине' },
					{ name: 'Qcalm', value: 'Команда для сбора денег, за предметы из магазина' },
					{ name: 'Qpay <пинг игрока> <сума денег>', value: 'Команда для перевода денег на другой счет, налог 5%' },
				)
			msg.reply({ embeds: [helpEmbed]})
			break;
		case 'pay':
			pay(msg)
			break;
		default:
			console.log('Error in command switch')
	}
}
export default Commands