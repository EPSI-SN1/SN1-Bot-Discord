import {
    CommandInteraction,
    Guild,
    GuildMember,
    MessageActionRow,
    MessageEmbed,
    MessageSelectMenu, MessageSelectOptionData,
    Role,
    SelectMenuInteraction
} from "discord.js";

const config = require('../../../config.json');

export class GamingManager {
    private static gamingRoles = config.gaming.roles as Array<string>;

    public static async sendEmbed(interaction: CommandInteraction): Promise<void> {
        const guild = interaction.guild as Guild;
        const options = [{}] as MessageSelectOptionData[];

        let step = 0;
        for (const roles of this.gamingRoles) {
            const role = guild.roles.cache.find(r => r.id === roles) as Role;
            options[step] = this.optionsBuilder(role.name, roles); //Giving name for the label and id for the value
            step++;
        }

        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('gaming')
                .setPlaceholder('Choisi les jeux auxquels tu joues')
                .addOptions(options)
                .setMinValues(1)
                .setMaxValues(3)
        )

        await interaction.channel!.send({
            embeds: [
                new MessageEmbed({
                    title: "Choisir vos jeux favoris",
                })
            ],
            components: [row]
        });

        await interaction.reply({content: 'Crée avec succès !', ephemeral: true});
    }

    public static async checkRole(interaction: SelectMenuInteraction, roles: Array<string>): Promise<void> {
        const guild = interaction.guild as Guild;
        const member = interaction.member as GuildMember;
        const separatorRole = guild.roles.cache.find(r => r.id === config.gaming.seperator_group) as Role;

        let addedRoles = "";
        let deletedRoles = "";

        if (!member.roles.cache.some(rl => rl.name === separatorRole.name)) {
            await member.roles.add(separatorRole);
        }

        for (const roleId of roles) {
            const role = guild.roles.cache.find(r => r.id === roleId) as Role;

            if (member.roles.cache.some(rl => rl.name === role.name)) {
                await member.roles.remove(role);
                deletedRoles += role.name + ", ";
            } else {
                await member.roles.add(role);
                addedRoles += role.name + ", ";
            }
        }

        if (addedRoles === "") addedRoles = "Aucun";
        if (deletedRoles === "") deletedRoles = "Aucun";

        await interaction.reply({
            content: `**Roles ajoutés**: ${addedRoles}. **Roles supprimés**: ${deletedRoles}.`,
            ephemeral: true
        });
    }

    private static optionsBuilder(label: string, value: string) {
        return {
            label: label,
            value: value,
        }
    }
}