import {BaseEvent, Event} from 'ioc:factory/Core/Event';
import {GuildMember, Interaction, Role} from 'discord.js';
import {RolesManager} from 'App/modules/class_roles/RolesManager';

const config = require('../../../../config.json');

@Event('interactionCreate')
export default class RolesInteractionEvent extends BaseEvent {
    public async run(interaction: Interaction): Promise<void> {
        if (!interaction.isButton()) return;

        const member = interaction.member as GuildMember;
        const group1Role = member.guild.roles.cache.find((r: Role): boolean => r.id === config.roles.group1.id) as Role;
        const group2Role = member.guild.roles.cache.find((r: Role): boolean => r.id === config.roles.group2.id) as Role;
        const separatorRole = member.guild.roles.cache.find((r: Role): boolean => r.id === config.roles.separator_group) as Role;

        switch (interaction.customId) {
            case 'group1':
            case 'group2': {
                if (
                    await RolesManager.hasRole(interaction, group1Role, true, true) ||
                    await RolesManager.hasRole(interaction, group2Role, true, true)
                ) {
                    break;
                }

                const selectedRole = interaction.customId === 'group1' ? group1Role : group2Role as Role;

                await member.roles.add(selectedRole);
                await member.roles.add(separatorRole);
                await interaction.reply({
                    content: 'Vous venez de vous ajouter ce rôle.',
                    ephemeral: true,
                });
                break;
            }
            case 'dev':
            case 'network': {
                if (!await RolesManager.hasRole(interaction, group1Role) && !await RolesManager.hasRole(interaction, group2Role)) {
                    await interaction.reply({
                        content: 'Vous devez choisir votre groupe de classe.',
                        ephemeral: true,
                    });
                    break;
                }

                const group1DevRole = member.guild.roles.cache.find((r: Role): boolean => r.id === config.roles.group1.dev) as Role;
                const group2DevRole = member.guild.roles.cache.find((r: Role): boolean => r.id === config.roles.group2.dev) as Role;
                const group1NetworkRole = member.guild.roles.cache.find((r: Role): boolean => r.id === config.roles.group1.network) as Role;
                const group2NetworkRole = member.guild.roles.cache.find((r: Role): boolean => r.id === config.roles.group2.network) as Role;

                let selectedRole: Role;

                if (interaction.customId === 'dev') {
                    selectedRole = await RolesManager.hasRole(interaction, group1Role) ? group1DevRole : group2DevRole;
                } else {
                    selectedRole = await RolesManager.hasRole(interaction, group1Role) ? group1NetworkRole : group2NetworkRole;
                }

                const hasDev1Role = await RolesManager.hasRole(interaction, group1DevRole, true, true) as Boolean;
                const hasDev2Role = await RolesManager.hasRole(interaction, group2DevRole, true, true) as Boolean;
                const hasNetwork1Role = await RolesManager.hasRole(interaction, group1NetworkRole, true, true) as Boolean;
                const hasNetwork2Role = await RolesManager.hasRole(interaction, group2NetworkRole, true, true) as Boolean;

                if (hasDev1Role || hasDev2Role || hasNetwork1Role || hasNetwork2Role) {
                    break;
                }

                await member.roles.add(selectedRole);
                await interaction.reply({
                    content: 'Vous venez de vous ajouter ce rôle.',
                    ephemeral: true,
                });
                break;
            }
        }
    }
}
