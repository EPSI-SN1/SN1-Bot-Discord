import {
    CommandInteraction,
    Guild,
    GuildMember,
    MessageActionRow,
    MessageEmbed,
    MessageSelectMenu,
    MessageSelectOptionData,
    Role,
    SelectMenuInteraction
} from "discord.js";

const config = require('../../../config.json');

export class GamingManager {
    private static gamingRoles = config.gaming.roles as Array<string>;

    public static async sendEmbed(interaction: CommandInteraction): Promise<void> {
        const guild = interaction.guild as Guild;
        const options = [] as MessageSelectOptionData[];

        let step = 0;
        for (const roles of this.gamingRoles) {
            const role = guild.roles.cache.find(r => r.id === roles) as Role;
            options[step] = await this.optionsBuilder(role.name, roles); //Giving name for the label and id for the value
            step++;
        }

        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('gaming')
                .setPlaceholder('Choisi les jeux auxquels tu joues')
                .addOptions(options)
                .setMinValues(1)
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

        const addedRoles = [] as Array<Role>;
        const deletedRoles = [] as Array<Role>;

        if (!member.roles.cache.some(rl => rl.name === separatorRole.name)) {
            await member.roles.add(separatorRole);
        }

        for (const roleId of roles) {
            const role = guild.roles.cache.find(r => r.id === roleId) as Role;

            if (member.roles.cache.some(rl => rl.name === role.name)) {
                deletedRoles.push(role);
            } else addedRoles.push(role);
        }

        await member.roles.add(addedRoles);
        await member.roles.remove(deletedRoles);

        await interaction.reply({
            content: `**Roles ajoutés**: ${addedRoles.join("")}. **Roles supprimés**: ${deletedRoles.join("")}.`,
            ephemeral: true
        });
    }

    private static async optionsBuilder(label: string, value: string): Promise<MessageSelectOptionData> {
        return {
            label: label,
            value: value,
        }
    }
}