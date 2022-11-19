import {BaseCommand, Command} from 'ioc:factory/Core/Command'
import {CommandInteraction} from "discord.js";
import {GamingManager} from "App/modules/gaming_roles/GamingManager";

@Command({
    scope: 'GUILDS',
    options: {
        name: 'gaming_roles-class_roles-setup',
        description: "Mettre en place l'embed du choix des class_roles gaming_roles",
        options: []
    }
})

export default class SetupRolesCommand extends BaseCommand {
    public async run(interaction: CommandInteraction): Promise<void> {
        await GamingManager.sendEmbed(interaction);
    }
}