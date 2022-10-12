import {CategoryChannelResolvable, Guild, GuildChannel, GuildMember} from "discord.js";

const config = require('../../../config.json');

export class PrivateManager {

    public static async createPrivateRoom(member: GuildMember): Promise<void> {
        const guild = member.guild as Guild;

        const channel = await guild.channels.create(`Salon de ${member.user.username}`, {
            type: "GUILD_VOICE",
            parent: guild.channels.cache.get(config.private.parent) as CategoryChannelResolvable,
        });

        await channel.permissionOverwrites.create(member, {
            MANAGE_CHANNELS: true,
        });

        await member.voice.setChannel(channel);
    }

    public static async leavePrivateRoom(member: GuildMember, channel: GuildChannel): Promise<void> {
        if(!channel.name.startsWith("Salon de ")) return;
        if(channel.members.size < 1) return;

        await channel.delete();
    }

}