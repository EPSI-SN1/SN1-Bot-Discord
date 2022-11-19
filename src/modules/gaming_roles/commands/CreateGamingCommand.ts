import {BaseCommand, Command} from 'ioc:factory/Core/Command'
import {CommandInteraction} from "discord.js";
import {GamingManager} from "App/modules/gaming_roles/GamingManager";

@Command({
    scope: 'GUILDS',
    options: {
        name: 'create-gaming_roles-class_roles',
        description: "Créer un role gaming_roles",
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

        await interaction.reply({
                content: 'Le nom est invalide.',
                ephemeral: true
            }
        );
    }
}