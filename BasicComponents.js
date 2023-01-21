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

function foundAuthor(msg, dataWrite) {
	for (let i = 0; i < dataWrite.length; i++) {
		if (msg.author.id === dataWrite[i].id) {
			return i
		}
	}
	return false
}

export {addNewUser, foundAuthor}