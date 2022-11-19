import {BaseCommand, Command} from 'ioc:factory/Core/Command'
import {Channel, CommandInteraction, GuildMember} from 'discord.js'
import {MusicManager} from "App/modules/music_player/MusicManager";

@Command({
    scope: 'GUILDS',
    options: {
        name: 'skip',
        description: "Skip la musique en cours",
        options: [],
    }
})

export default class SkipCommand extends BaseCommand {
    public async run(interaction: CommandInteraction): Promise<void> {
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel as Channel;

        await MusicManager.skip(interaction, channel);
    }
}