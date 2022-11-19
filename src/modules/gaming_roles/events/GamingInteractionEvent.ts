import {BaseEvent, Event} from 'ioc:factory/Core/Event'
import {SelectMenuInteraction} from 'discord.js'
import {GamingManager} from "App/modules/gaming_roles/GamingManager";

@Event('interactionCreate')
export default class GamingInteractionEvent extends BaseEvent {
    public async run(interaction: SelectMenuInteraction): Promise<void> {
        if (interaction.customId === 'gaming_roles') {
            await GamingManager.checkRole(interaction, interaction.values);
        }
    }
}