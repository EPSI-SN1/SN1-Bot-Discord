import {BaseEvent, Event} from 'ioc:factory/Core/Event'
import {GuildMember, Interaction, Role} from 'discord.js'
import {RolesManager} from "App/modules/class_roles/RolesManager";

const config = require('../../../../config.json');

@Event('interactionCreate')
export default class RolesInteractionEvent extends BaseEvent {
    public async run(interaction: Interaction): Promise<void> {
        if (!interaction.isButton()) return;

        const member = interaction.member as GuildMember;

        const group1Role = member.guild.roles.cache
            .find(r => r.id === config.roles.group1) as Role;
        const group2Role = member.guild.roles.cache
            .find(r => r.id === config.roles.group2) as Role;
        const separatorRole = member.guild.roles.cache
            .find(r => r.id === config.roles.separator_group) as Role;

        switch (interaction.customId) {
            case "group1": {
                if (await RolesManager.hasRole(interaction, group1Role, true) ||
                    await RolesManager.hasRole(interaction, group2Role)) {
                    break;
                }

                await member.roles.add(group1Role);
                await member.roles.add(separatorRole);
                await interaction.reply({
                        content: 'Vous venez de vous ajouter ce rôle.',
                        ephemeral: true
                    }
                );
                break;
            }
            case "group2": {
                if (await RolesManager.hasRole(interaction, group2Role, true) ||
                    await RolesManager.hasRole(interaction, group1Role)) {
                    break;
                }

                await member.roles.add(group2Role);
                await member.roles.add(separatorRole);
                await interaction.reply({
                        content: 'Vous venez de vous ajouter ce rôle.',
                        ephemeral: true
                    }
                );
                break;
            }
        }
    }
}