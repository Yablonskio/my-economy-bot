export default function buy(msg, member, dataWrite) {
	const roleBuy = msg.content.split(' ')[1].substring(2) || 'error'
	switch (roleBuy.toLowerCase()) {
		// Написать существующие ID ролей
		/*case 'шахтер 3':
			if (dataWrite[userID].hourMoney.amount === 1000 &&
				dataWrite[userID].money >= 20000) {
				dataWrite[userID].money -= 20000
				dataWrite[userID].hourMoney = {cooldown: 0, amount: 1500}
				msg.member.roles.remove('1066224559688269904')
				msg.member.roles.add('1066224587421012029')
				msg.reply('Поздравляем с покупкой!')
			} else {
				msg.reply('Для покупки данной роли требуется покупка \"шахтер 2\"')
			}
			break;
		case 'шахтер 2':
			if (dataWrite[userID].hourMoney.amount === 500 &&
				dataWrite[userID].money >= 10000) {
				dataWrite[userID].money -= 10000
				dataWrite[userID].hourMoney = {cooldown: 0, amount: 1000}
				msg.member.roles.remove('1066224517216735292')
				msg.member.roles.add('1066224559688269904')
				msg.reply('Поздравляем с покупкой!')
			} else {
				msg.reply('Для покупки данной роли требуется покупка \"шахтер 1\"')
			}
			break;
		case 'шахтер 1':
			if (dataWrite[userID].hourMoney.amount === 0 &&
				dataWrite[userID].money >= 5000) {
				dataWrite[userID].money -= 5000
				dataWrite[userID].hourMoney = {cooldown: 0, amount: 500}
				msg.member.roles.add('1066224517216735292')
				msg.reply('Поздравляем с покупкой!')
			} else {
				msg.reply('Покупка данной роли не возможна потому-что вы уже купили роль старше')
			}
			break;*/
		case 'error':
			msg.channel.send('Вы не правильно написали команду\n \"Qhelp\" – для помощи по боту')
			break;
		default:
			msg.channel.send('Вы написали не существующую роль')
			break;
	}
}