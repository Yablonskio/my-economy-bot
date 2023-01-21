// 1 - work; 2 - act; 3 - crime; 4 - hour money; 5 - day money;
import fs from "fs";
import {foundAuthor, addNewUser} from './BasicComponents.js'
function logicCmd(msg, data, dataCmd, type) {
	let dateNow = new Date().getTime()
	let cooldown, cooldownCmd, paymentCmd, percentCmd
	switch (type) {
		case 1:
			cooldown = data.cooldownW
			cooldownCmd = dataCmd.work.cooldown
			paymentCmd = dataCmd.work.payment
			percentCmd = dataCmd.work.percent
			//data.cooldownW = dateNow
			break;
		case 2:
			cooldown = data.cooldownA
			cooldownCmd = dataCmd.act.cooldown
			paymentCmd = dataCmd.act.payment
			percentCmd = dataCmd.act.percent
			data.cooldownA = dateNow
			break;
		case 3:
			cooldown = data.cooldownC
			cooldownCmd = dataCmd.crime.cooldown
			paymentCmd = dataCmd.crime.payment
			percentCmd = dataCmd.crime.percent
			data.cooldownC = dateNow
			break;
		case 4:
			cooldown = data.hourMoney.cooldown
			cooldownCmd = 3600000
			paymentCmd = data.hourMoney.amount
			percentCmd = 0
			data.hourMoney.cooldown = dateNow
			break;
		case 5:
			cooldown = data.dayMoney.cooldown
			cooldownCmd = 86400000
			paymentCmd = data.dayMoney.amount
			percentCmd = 0
			data.dayMoney.cooldown = dateNow
			break;
		default:
			console.log('Error in switch!')
	}
	if (paymentCmd === 0) return data
	let dateLater = dateNow - cooldown
	if (dateLater >= cooldownCmd || cooldown === 0) {
		let rundomMoney =
			Math.floor(Math.random() * paymentCmd / 100 * percentCmd)
		let moneyEarn = paymentCmd + rundomMoney
		data.money = data.money + moneyEarn

		msg.channel.send(`Вы заработали: ${moneyEarn}, 
		\nвсего: (${data.money})`)
	} else {
		let cooldownText = cooldownCmd - dateLater
		cooldownText = (cooldownText-(cooldownText%1000))/1000
		msg.channel.send(`Отдых, еще осталось: ${cooldownText} секунд`)
	}
	return data
}

async function callLogicCmd(type, msg, dataCommand) {
	await fs.readFile('dataUser.json',
		function (err, data) {
		let dataWrite = JSON.parse(data)
		let userID = foundAuthor(msg, dataWrite)
		if (userID === false) {
			addNewUser(msg, dataWrite)
		} else {
			if (err) console.log(err)
			else logicCmd(msg, dataWrite[userID], dataCommand, type)
		}
		if (dataWrite !== Object) {
			fs.writeFile('dataUser.json', JSON.stringify(dataWrite),
				(err) => err && console.error(err))
		} else {
			console.log('CRITICAL ERROR!!!')
		}
	})
}
export default callLogicCmd
function checkCalmRole(msg) {

}
