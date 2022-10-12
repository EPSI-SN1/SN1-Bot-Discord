import {BaseEvent, Event} from 'ioc:factory/Core/Event'
import {Channel, GuildMember, VoiceState} from "discord.js";
import {PrivateManager} from "App/modules/private/PrivateManager";

const config = require('../../../../config.json');

@Event('voiceJoin')
export default class VoiceJoinEvent extends BaseEvent {
    public async run(state: VoiceState): Promise<void> {
        const member = state.member as GuildMember;
        const channel = state.channel as Channel;

        if (channel.id === config.private.create) {
            await PrivateManager.createPrivateRoom(member);
        }
    }
}