import fs from "fs";
import {addNewUser, foundAuthor} from "../main/BasicComponents.js";
import {EmbedBuilder} from "discord.js";
import client from "../index.js";


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
		let top0 = await client.users.fetch(dataWrite[0].id)
		let top1 = await client.users.fetch(dataWrite[1].id)
		let top2 = await client.users.fetch(dataWrite[2].id)
		let top3 = await client.users.fetch(dataWrite[3].id)
		let top4 = await client.users.fetch(dataWrite[4].id)
		let top5 = await client.users.fetch(dataWrite[5].id)
		let top6 = await client.users.fetch(dataWrite[6].id)
		let top7 = await client.users.fetch(dataWrite[7].id)
		let top8 = await client.users.fetch(dataWrite[8].id)
		let top9 = await client.users.fetch(dataWrite[9].id)
		let topEmbed = new EmbedBuilder()
			.setColor(0xf09656)
			.setTitle('Топ сервера по 💵 :')
			.setAuthor({
				name: 'Top',
				iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1071576246233874523/top.png'
			})
			.addFields(
				{name: '1. ' + top0.tag, value: dataWrite[0].money + '💵'},
				{name: '2. ' + top1.tag, value: dataWrite[1].money + '💵'},
				{name: '3. ' + top2.tag, value: dataWrite[2].money + '💵'},
				{name: '4. ' + top3.tag, value: dataWrite[3].money + '💵'},
				{name: '5. ' + top4.tag, value: dataWrite[4].money + '💵'},
				{name: '6. ' + top5.tag, value: dataWrite[5].money + '💵'},
				{name: '7. ' + top6.tag, value: dataWrite[6].money + '💵'},
				{name: '8. ' + top7.tag, value: dataWrite[7].money + '💵'},
				{name: '9. ' + top8.tag, value: dataWrite[8].money + '💵'},
				{name: '10. ' + top9.tag, value: dataWrite[9].money + '💵'}
			)
			.setTimestamp()
		msg.channel.send({ embeds: [topEmbed]})
	}  catch {
		msg.channel.send('Топ еще не доступен из-за малого количества игроков :(')
	}

}

export default top