import {BaseEvent, Event} from 'ioc:factory/Core/Event'
import {CategoryChannel, GuildMember, VoiceBasedChannel, VoiceState} from "discord.js";
import {PrivateManager} from "App/modules/private_room/PrivateManager";

const config = require('../../../../config.json');

@Event('voiceLeave')
export default class VoiceLeftEvent extends BaseEvent {
    public async run(state: VoiceState): Promise<void> {
        const member = state.member as GuildMember;
        const channel = state.channel as VoiceBasedChannel;
        const channelParent = channel.parent as CategoryChannel;

        if (member == null || channelParent == null) {
            return;
        }

        if (channelParent.id === config.private.parent) {
            await PrivateManager.leavePrivateRoom(member, channel);
        }
    }
}