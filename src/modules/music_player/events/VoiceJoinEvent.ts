import {BaseEvent, Event} from 'ioc:factory/Core/Event'
import {GuildMember, User, VoiceChannel, VoiceState} from "discord.js";
import {MusicManager} from "App/modules/music_player/MusicManager";

@Event('voiceJoin')
export default class VoiceJoinEvent extends BaseEvent {
    public async run(state: VoiceState): Promise<void> {
        const member = state.member as GuildMember;
        const user = member.user as User;

        if (user.tag === "Kelix#3555" && user.bot) {
            const channel = state.channel as VoiceChannel;
            const channelId = channel.id as string;

            if (channelId != null) {
                MusicManager.currentChannel = channelId;
            }
        }
    }
}