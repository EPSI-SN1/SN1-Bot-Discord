import {BaseCommand, Command} from 'ioc:factory/Core/Command'
import {CommandInteraction, Guild, Role} from "discord.js";
import {GamingManager} from "App/modules/gaming/GamingManager";

@Command({
    scope: 'GUILDS',
    options: {
        name: 'create-gaming-roles',
        description: "Créer un role gaming",
        options: [
            {
                name: 'name',
                description: 'Nom du jeu vidéo',
                type: 'STRING',
                required: true
            },
        ],
    }
})
export default class SetupRolesCommand extends BaseCommand {
    public async run(interaction: CommandInteraction): Promise<void> {
        const name = interaction.options.getString('name') as string | null;

        if (name != null) {
            await GamingManager.createRole(interaction, name);
            return;
        }

        await interaction.reply({content: 'Le nom est invalide.', ephemeral: true});
    }
}