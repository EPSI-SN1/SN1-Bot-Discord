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
const editJsonFile = require("edit-json-file");

export class GamingManager {
    private static gamingRoles = config.gaming.roles as Array<string>;

    public static async sendEmbed(interaction: CommandInteraction): Promise<void> {
        const guild = interaction.guild as Guild;
        const options = [] as MessageSelectOptionData[];

        for (const roles of this.gamingRoles) {
            const role = guild.roles.cache.find(r => r.id === roles) as Role;
            options.push(await this.optionsBuilder(role.name, roles)); //Giving name for the label and id for the value
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

        if (!member.roles.cache.some(rl => rl.id === separatorRole.id)) {
            await member.roles.add(separatorRole);
        }

        roles.forEach(id => {
            const role = guild.roles.cache.find(roles => roles.id === id) as Role;

            if (member.roles.cache.some(roles => roles.name === role.name)) {
                deletedRoles.push(role);
            } else addedRoles.push(role);
        })

        await member.roles.add(addedRoles);
        await member.roles.remove(deletedRoles);

        await interaction.reply({
            content: `**Roles ajoutés**: ${addedRoles.join("")}. **Roles supprimés**: ${deletedRoles.join("")}.`,
            ephemeral: true
        });
    }

    public static async createRole(interaction: CommandInteraction, name: string): Promise<void> {
        const guild = interaction.guild as Guild;
        //const file = editJsonFile(`../../../config.json`);

        if (guild.roles.cache.some(roles => roles.name.toLowerCase() === name.toLowerCase())) {
            await interaction.reply({content: `Le rôle gaming **${name}** existe déjà.`, ephemeral: true});
            return;
        }

        const newRole = await guild.roles.create({
            name: name,
            mentionable: true,
        }) as Role;

        this.gamingRoles.push(newRole.id);
        //await file.append("gaming.roles", newRole.id);
        //await file.save();

        await interaction.reply({content: `Le rôle gaming **${name}** vient d'être crée.`});
    }

    private static async optionsBuilder(label: string, value: string): Promise<MessageSelectOptionData> {
        return {
            label: label,
            value: value,
        }
    }
}