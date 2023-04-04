import { EmbedBuilder } from 'discord.js'
import callLogicCmd from '../logic/logic.js'
import logicBuy from '../logic/logicShop.js'
import pay from '../commands/pay.js'
import bal from '../commands/bal.js'
import top from '../commands/top.js'
import cas from '../commands/cas.js'

function Commands(command, msg) {
	switch (command) {

		case 'work':
		case 'цщкл':
		case 'роб':
			void callLogicCmd(0, msg)
			break;

		case 'act':
		case 'фсе':
		case 'дей':
			void callLogicCmd(1, msg)
			break;

		case 'crime':
		case 'скшьу':
		case 'краж':
			void callLogicCmd(2, msg)
			break;

		case 'calm':
		case 'сфдь':
		case 'соб':
			void callLogicCmd(3, msg)
			void callLogicCmd(4, msg)
			break;

		case 'bal':
		case 'ифд':
		case 'бал':
			void bal(msg)
			break;

		case 'shop':
		case 'ырщз':
		case 'маг':
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
		case 'игн':
		case 'куп':
			void logicBuy(msg)
			break;

		case 'help':
		case 'рудз':
		case 'помощь':
			const helpEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setAuthor({ name: 'Помощь | Команды бота'})
				.addFields(
					{ name: 'Qinfo | Йинфо <любая команда без \"q\">', value: 'Команда для подробной информации о боте' },
					{ name: 'Qwork | Йроб', value: 'Команда для заработка в средем дает 120💵 раз в 30 секунд' },
					{ name: 'Qact | Йдей', value: 'Команда для заработка в средем дает 220💵 раз в 1 минуту' },
					{ name: 'Qcrime | Йкраж', value: 'Команда для заработка в средем дает 500💵 раз в 1 час' },
					{ name: 'Qbal | йбал или Qbal | йбал <пинг игрока>', value: 'Команда для того что-бы узнать баланс' },
					{ name: 'Qshop | Ймаг', value: 'Команда просмотра магазина' },
					{ name: 'Qbuy | Йкуп <название предмета>', value: 'Команда для покупки товара в магазине' },
					{ name: 'Qcalm | Йсоб', value: 'Команда для сбора денег, за предметы из магазина' },
					{ name: 'Qpay | Йплат <пинг игрока> <сума денег>', value: 'Команда для перевода денег на другой счет, налог 5%' },
					{ name: 'Qtop | Йтоп', value: 'Команда для вывода топ игроков сервера' },
					{ name: 'Qcas | Йказ <число ставки>', value: 'Команда для игры в казино, разброс по возврату +-85%' },
				)
			msg.reply({ embeds: [helpEmbed]})
			break;

		case 'pay':
		case 'зфн':
		case 'плат':
			void pay(msg)
			break;

		case 'top':
		case 'ещз':
		case 'топ':
			void top(msg)
			break;

		case 'cas':
		case 'сфы':
		case 'каз':
			void cas(msg)
			break;

		default:
			console.log('Error in command switch')
	}
}

export default Commands