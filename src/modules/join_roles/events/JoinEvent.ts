import {BaseEvent, Event} from 'ioc:factory/Core/Event'
import {GuildMember, Role} from 'discord.js'

const config = require('../../../../config.json');

@Event('guildMemberAdd')
export default class JoinEvent extends BaseEvent {
    public async run(member: GuildMember): Promise<void> {
        const role = member.guild.roles.cache
            .find(r => r.id === config.roles.default) as Role;

        await member.roles.add(role);
    }
}