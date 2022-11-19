import {BaseEvent, Event} from 'ioc:factory/Core/Event'
import {GuildMember, VoiceBasedChannel, VoiceState} from "discord.js";
import {PrivateManager} from "App/modules/private_room/PrivateManager";

const config = require('../../../../config.json');

@Event('voiceJoin')
export default class VoiceJoinEvent extends BaseEvent {
    public async run(state: VoiceState): Promise<void> {
        const member = state.member as GuildMember;
        const channel = state.channel as VoiceBasedChannel;

        if (member == null || channel == null) {
            return;
        }

        if (channel.id === config.private.create) {
            await PrivateManager.createPrivateRoom(member);
        }
    }
}