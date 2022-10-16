import {BaseEvent, Event} from 'ioc:factory/Core/Event'
import {SelectMenuInteraction} from 'discord.js'
import {GamingManager} from "App/modules/gaming/GamingManager";

@Event('interactionCreate')
export default class GamingInteractionEvent extends BaseEvent {
    public async run(interaction: SelectMenuInteraction): Promise<void> {
        if (interaction.customId === 'gaming') {
            await GamingManager.checkRole(interaction, interaction.values);
        }
    }
}