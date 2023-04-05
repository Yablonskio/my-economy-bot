import fs from 'fs'

function addNewUser(msg, dataWrite) {
	let newUser = {
		id: msg.author.id,
		money: 500,
		cooldown: [0, 0, 0, {cooldown: 0, amount: 0}, {cooldown: 0, amount: 0}],
	}
	dataWrite.push(newUser)

	msg.channel.send('Добро пожаловать! Ваш начальный баланс: 500💸')
	return dataWrite
}

export function foundAuthor(member, dataWrite) {
	for (let i = 0; i < dataWrite.length; i++) {
		if (member === dataWrite[i].id) return dataWrite[i]
	}
	return false
}

export default async function writeDate(type, msg, passFunc) {
	await fs.readFile('dataUser.json', function (err, data) {
		let dataWrite = JSON.parse(data.toString())
		let member = foundAuthor(msg.author.id, dataWrite)
		if (member === false) {
			addNewUser(msg, dataWrite)
		} else {
			if (err) console.log(err)
			else passFunc(msg, member, dataWrite, type)
		}
		if (dataWrite !== Object) {
			fs.writeFile('dataUser.json', JSON.stringify(dataWrite),
				(err) => err && console.error(err))
		} else console.log('CRITICAL ERROR!!!')
	})
}