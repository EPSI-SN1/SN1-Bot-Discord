import {BaseCommand, Command} from 'ioc:factory/Core/Command'
import {Channel, CommandInteraction, GuildMember} from 'discord.js'
import {MusicManager} from "App/modules/music/MusicManager";

@Command({
    scope: 'GUILDS',
    options: {
        name: 'stop',
        description: "Arrêter la musique",
        options: [],
    }
})

export default class StopCommand extends BaseCommand {
    public async run(interaction: CommandInteraction): Promise<void> {
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel as Channel;

        await MusicManager.stop(interaction, channel);
    }
}