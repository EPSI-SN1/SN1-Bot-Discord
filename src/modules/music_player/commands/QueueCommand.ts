import {BaseCommand, Command} from 'ioc:factory/Core/Command'
import {Channel, CommandInteraction, GuildMember} from 'discord.js'
import {MusicManager} from "App/modules/music_player/MusicManager";

@Command({
    scope: 'GUILDS',
    options: {
        name: 'queue',
        description: "Voir les musiques en attentes",
        options: [],
    }
})

export default class QueueCommand extends BaseCommand {
    public async run(interaction: CommandInteraction): Promise<void> {
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel as Channel;

        await MusicManager.queue(interaction, channel);
    }
}