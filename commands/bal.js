import fs from "fs";
import {addNewUser, foundAuthor} from "../main/BasicComponents.js";
import {EmbedBuilder} from "discord.js";
import client from '../index.js'

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
						let balEmbed = new EmbedBuilder()
							.setColor(0xf09656)
							.setTitle('На вашем балансе: ' + member.money + ' 💸')
							.setAuthor({ name: msg.author.tag, iconURL: msg.author.avatarURL()})
							.setDescription('Доп. 💵 каждый час: ' + member.cooldown[3].amount +
								'\nДоп. 💵 каждый день: ' + member.cooldown[4].amount)
							.setFooter({ text: 'Balance', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1070038260316901467/okey.png' })
							.setTimestamp()
						msg.channel.send({ embeds: [balEmbed]})
					} else {
						try {
							let anotherWallet = msg.content.split(' ')[1].substring(2).slice(0, -1)
							anotherWallet = foundAuthor(anotherWallet, dataWrite)
							let anotherNick = client.users.cache.get(anotherWallet.id).tag
							let anotherAvatar = client.users.cache.get(anotherWallet.id).avatarURL()

							let balEmbed = new EmbedBuilder()
								.setColor(0xf09656)
								.setTitle('На его балансе:  ' + anotherWallet.money + ' 💸')
								.setAuthor({ name: anotherNick, iconURL: anotherAvatar})
								.setDescription('Доп. 💵 каждый час: ' + anotherWallet.cooldown[3].amount +
								'\nДоп. 💵 каждый день: ' + anotherWallet.cooldown[4].amount)
								.setFooter({ text: 'Balance', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1070038260316901467/okey.png' })
								.setTimestamp()
							msg.channel.send({ embeds: [balEmbed]})
						} catch {
							let balErrEmbed = new EmbedBuilder()
								.setColor(0xeb4034)
								.setTitle('Ошибка, такого кошелька еще не существует :(')
								.setFooter({ text: 'Balance', iconURL: 'https://cdn.discordapp.com/attachments/729929458064031816/1070038260316901467/okey.png' })
								.setTimestamp()
							msg.channel.send({ embeds: [balErrEmbed]})
						}
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