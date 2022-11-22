import {BaseEvent, Event} from 'ioc:factory/Core/Event'
import {GuildMember, Message, Role} from 'discord.js'

const config = require('../../../../config.json');

@Event('messageCreate')
export default class MessageEvent extends BaseEvent {
    public async run(message: Message): Promise<void> {
        if (message.content.toLowerCase().includes("quoi")) {
            message.react("🇫").then(async () => {
                message.react("🇪").then(async () => {
                    message.react("🇺").then(async () => {
                        await message.react("🇷");
                    });
                });
            });
        } else if (message.content.toLowerCase().includes("hein")) {
            message.react("🇩").then(async () => {
                message.react("🇪").then(async () => {
                    message.react("🇺").then(async () => {
                        await message.react("🇽");
                    });
                });
            });
        }
    }
}