import {BaseCommand, Command} from 'ioc:factory/Core/Command'
import {Channel, CommandInteraction, GuildMember, TextChannel} from 'discord.js'
import {MusicManager} from "App/modules/music_player/MusicManager";

@Command({
    scope: 'GUILDS',
    options: {
        name: 'play',
        description: "Lancer une musique",
        options: [
            {
                name: 'link',
                description: 'Lien de la musique',
                type: 'STRING',
                required: true
            },
        ],
    }
})

export default class PlayCommand extends BaseCommand {
    public async run(interaction: CommandInteraction): Promise<void> {
        const link = interaction.options.getString('link') as string | null;

        if (link != null) {
            const member = interaction.member as GuildMember;
            const channel = member.voice.channel as Channel;
            const textChannel = interaction.channel as TextChannel;

            await MusicManager.play(interaction, channel, textChannel, link);
            return;
        }

        await interaction.reply({
                content: 'Votre lien est invalide.',
                ephemeral: true
            }
        );
    }
}