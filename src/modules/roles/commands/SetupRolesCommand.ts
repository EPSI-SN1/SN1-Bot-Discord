import {BaseCommand, Command} from 'ioc:factory/Core/Command'
import {CommandInteraction} from 'discord.js'
import {RolesManager} from "App/modules/roles/RolesManager";

@Command({
    scope: 'GUILDS',
    options: {
        name: 'roles-setup',
        description: "Mettre en place l'embed du choix des roles",
        options: []
    }
})

export default class SetupRolesCommand extends BaseCommand {
    public async run(interaction: CommandInteraction): Promise<void> {
        await RolesManager.systemIsReady(interaction);
        await RolesManager.systemSetup(interaction);
    }
}