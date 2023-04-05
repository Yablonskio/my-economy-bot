import { EmbedBuilder } from 'discord.js'
import { client } from "../index.js";

export default async function top(msg, member, dataWrite) {
	if (dataWrite.length < 10) {
		msg.channel.send('Топ еще не доступен из-за малого количества игроков :(')
		return
	}

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
			top.push(await client.users.fetch(dataWrite[i].id))
		}

		let topEmbed = new EmbedBuilder()
			.setColor(0xf09656)
			.setTitle('Топ сервера по 💵 :')
			.setAuthor({
				name: 'Top',
				iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1071576246233874523/top.png'
			})
			.addFields(top.map((i,index)=>{
				return {name: index+1 + '. ' + i.tag, value: dataWrite[index].money + '💵'}
			}))
			.setTimestamp()

		msg.channel.send({ embeds: [topEmbed]})
	} catch {
		msg.channel.send('Ошибка команды top, что-то пошло не так :(')
	}
}