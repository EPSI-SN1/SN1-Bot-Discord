import {BaseCommand, Command} from 'ioc:factory/Core/Command'
import {CommandInteraction, MessageEmbed, TextChannel} from 'discord.js'
import {Colors} from "@discord-factory/colorize";

const config = require('../../../../config.json')

@Command({
    scope: 'GLOBAL',
    options: {
        name: 'suggestion',
        description: 'Faire une suggestion',
        options: [
            {
                name: 'suggestion',
                description: 'Votre suggestion',
                type: 'STRING',
                required: true
            },
        ],
    },
})
export default class SuggestionCommand implements BaseCommand {
    public async run(interaction: CommandInteraction): Promise<void> {
        const suggestion = interaction.options.getString('suggestion') as string | null;

        if (suggestion != null) {
            await interaction.deferReply({ephemeral: true});

            const suggestionDestination = interaction.guild?.channels.cache.get(config.suggestion.parent) as TextChannel;

            const message = await suggestionDestination.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle(`Suggestion de ${interaction.user.username}`)
                        .setDescription(suggestion)
                        .setThumbnail(interaction.user.avatarURL() ?? '')
                        .setFooter("/suggestion", interaction.guild?.iconURL() ?? "")
                        .setTimestamp(new Date().getTime())
                ]
            });

            await message.react("✅");
            await message.react("❌");

            await message.startThread(
                {
                    name: `Suggestion de ${interaction.user.username}`,
                    autoArchiveDuration: 60
                }
            );

            // Reply to command user
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Suggestion envoyée")
                        .setDescription(`Votre suggestion a été envoyée dans le salon ${suggestionDestination}`)
                ]
            });
        }
    }
}
