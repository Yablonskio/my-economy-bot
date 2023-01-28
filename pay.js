import fs from "fs";
import {addNewUser, foundAuthor} from "./BasicComponents.js";

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
	let walletTransWorker = msg.content.split(' ')[1].substring(2).slice(0, -1)
	let walletTrans = foundAuthor(walletTransWorker, dataWrite)
	let amountTrans = msg.content.split(' ')[2]
	if (walletTrans === false) {
		msg.channel.send('❌ Не удалось найти такой кошелек , возможно пользователь еще его не создал ')
		return true
	} else if (amountTrans % 1 !== 0) {
		msg.channel.send('❌ Можно переводить лишь целые числа')
		return true
	} else if (member.money <= amountTrans) {
		msg.channel.send('❌ У вас не достаточно денег для операции 💸')
		return true
	}
	let tax = amountTrans / 100 * 5
	amountTrans = amountTrans - tax

	member.money = member.money - amountTrans
	walletTrans.money = walletTrans.money + amountTrans

	msg.channel.send('✅ Перевод успешен!')
}
export default pay