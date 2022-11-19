import {BaseCommand, Command} from 'ioc:factory/Core/Command'
import {RolesManager} from "App/modules/class_roles/RolesManager";
import {CommandInteraction} from "discord.js";

@Command({
    scope: 'GUILDS',
    options: {
        name: 'class_roles-setup',
        description: "Mettre en place l'embed du choix des class_roles",
        options: []
    }
})

export default class SetupRolesCommand extends BaseCommand {
    public async run(interaction: CommandInteraction): Promise<void> {
        await RolesManager.systemIsReady(interaction);
        await RolesManager.systemSetup(interaction);
    }
}