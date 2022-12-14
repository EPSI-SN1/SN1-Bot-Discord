import {
    CommandInteraction,
    GuildMember,
    Interaction,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Role
} from "discord.js";

const config = require('../../../config.json');

export class RolesManager {

    public static async systemIsReady(interaction: CommandInteraction) {
        await interaction.reply({
                content: 'Création en cours...',
                ephemeral: true
            }
        );
    }

    public static async systemSetup(interaction: CommandInteraction) {
        const group1 = new MessageButton({
            type: "BUTTON",
            label: "GROUPE 1",
            customId: "group1",
            style: "PRIMARY"
        }) as MessageButton;
        const group2 = new MessageButton({
            type: "BUTTON",
            label: "GROUPE 2",
            customId: "group2",
            style: "PRIMARY"
        }) as MessageButton;

        const row: MessageActionRow = new MessageActionRow()
            .addComponents(group1)
            .addComponents(group2);

        await interaction.channel!.send({
            embeds: [
                new MessageEmbed({
                    title: "Choisir votre groupe de classe\n",
                })
            ],
            components: [row]
        });
    }

    public static async hasRole(interaction: Interaction, roleGiven: Role,
                                remove?: boolean): Promise<boolean> {
        if (!interaction.isButton())
            return false;

        const member = interaction.member as GuildMember;
        const separatorRole = member.guild.roles.cache
            .find(r => r.id === config.roles.separator_group) as Role;

        if (member.roles.cache.some(role => role.name === roleGiven.name)) {
            if (remove) {
                await interaction.reply({
                        content: 'Vous venez de vous enlever ce rôle.',
                        ephemeral: true
                    }
                );
                await member.roles.remove(roleGiven);
                await member.roles.remove(separatorRole);
                return true;
            }
            await interaction.reply({
                    content: `Vous avez déjà le rôle ${roleGiven.name}.`,
                    ephemeral: true
                }
            );
            return true;
        }

        return false;
    }
}