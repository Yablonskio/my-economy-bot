import fs from "fs";
import {addNewUser, foundAuthor} from "./BasicComponents.js";

async function bal(msg) {
	await fs.readFile('dataUser.json',
		function (err, data) {
			let dataWrite = JSON.parse(data)
			let member = foundAuthor(msg.author.id, dataWrite)
			if (member === false) {
				addNewUser(msg, dataWrite)
			} else {
				if (err) console.log(err)
				else {
					if (msg.content.split(' ')[1] === undefined) {
						msg.channel.send('Ваш баланс: ' + member.money)
					} else {
						let anotherWallet = msg.content.split(' ')[1].substring(2).slice(0, -1)
						anotherWallet = foundAuthor(anotherWallet, dataWrite)
						msg.channel.send('Его баланс: ' + anotherWallet.money)
					}
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
export default bal