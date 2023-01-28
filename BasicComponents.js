function addNewUser(msg, dataWrite) {
	let newUser = {
		id: msg.author.id,
		money: 500,
		cooldownW: 0,
		cooldownA: 0,
		cooldownC: 0,
		hourMoney: {cooldown: 0, amount: 0},
		dayMoney: {cooldown: 0, amount: 0}
	}
	dataWrite.push(newUser)
	msg.channel.send('Добро пожаловать! Ваш начальный баланс: 500')
	return dataWrite
}

function foundAuthor(member, dataWrite) {
	for (let i = 0; i < dataWrite.length; i++) {
		if (member === dataWrite[i].id) {
			return dataWrite[i]
		}
	}
	return false
}

export {addNewUser, foundAuthor}