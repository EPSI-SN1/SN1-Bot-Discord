import {BaseCommand, Command} from 'ioc:factory/Core/Command'
import {CommandInteraction} from "discord.js";
import {GamingManager} from "App/modules/gaming/GamingManager";

@Command({
    scope: 'GUILDS',
    options: {
        name: 'gaming-roles-setup',
        description: "Mettre en place l'embed du choix des roles gaming",
        options: []
    }
})

export default class SetupRolesCommand extends BaseCommand {
    public async run(interaction: CommandInteraction): Promise<void> {
        await GamingManager.sendEmbed(interaction);
    }
}