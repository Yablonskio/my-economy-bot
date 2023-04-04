import fs from 'fs'
import { EmbedBuilder } from 'discord.js'
import { addNewUser, foundAuthor } from '../main/BasicComponents.js'

async function top(msg) {
	await fs.readFile('dataUser.json',
		function (err, data) {
			let dataWrite = JSON.parse(data)
			let member = foundAuthor(msg.author.id, dataWrite)
			if (member === false) {
				addNewUser(msg, dataWrite)
			} else {
				if (err) console.log(err)
				else {
					topWorker(msg, dataWrite, member)
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
async function topWorker(msg, dataWrite, member) {
	dataWrite.sort(function (a, b) {
		if (a.money < b.money) {
			return 1;
		}
		if (a.money > b.money) {
			return -1;
		}
		// a должно быть равным b
		return 0;
	});

	try {
		let top = []
		for (let i = 0; i < 10; i++) {
			top = await client.users.fetch(dataWrite[i].id)
		}

		let topEmbed = new EmbedBuilder()
			.setColor(0xf09656)
			.setTitle('Топ сервера по 💵 :')
			.setAuthor({
				name: 'Top',
				iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1071576246233874523/top.png'
			})
			.addFields(
				{name: '1. ' + top[0].tag, value: dataWrite[0].money + '💵'},
				{name: '2. ' + top[1].tag, value: dataWrite[1].money + '💵'},
				{name: '3. ' + top[2].tag, value: dataWrite[2].money + '💵'},
				{name: '4. ' + top[3].tag, value: dataWrite[3].money + '💵'},
				{name: '5. ' + top[4].tag, value: dataWrite[4].money + '💵'},
				{name: '6. ' + top[5].tag, value: dataWrite[5].money + '💵'},
				{name: '7. ' + top[6].tag, value: dataWrite[6].money + '💵'},
				{name: '8. ' + top[7].tag, value: dataWrite[7].money + '💵'},
				{name: '9. ' + top[8].tag, value: dataWrite[8].money + '💵'},
				{name: '10. ' + top[9].tag, value: dataWrite[9].money + '💵'}
			)
			.setTimestamp()

		msg.channel.send({ embeds: [topEmbed]})
	} catch {
		msg.channel.send('Топ еще не доступен из-за малого количества игроков :(')
	}
}

export default top