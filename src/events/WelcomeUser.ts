import { GuildMember, TextChannel } from 'discord.js';
import { Event, Events } from '../interfaces/Event';

export default <Event>{
  name: Events.GuildMemberAdd,
  run: async (bot, member: GuildMember) => {
    const channel = member.guild.channels.cache.find(
      (ch) => ch.id === '1206351138807357500'
    ) as TextChannel;
    if (!channel) return;

    channel.send({
      embeds: [
        {
          title: `Welcome our new member, ${member.user.username}!`,
          description: `We are so glad that you joined us and another ${member.guild.memberCount} members!`,
          color: 0xe266ac,
        },
      ],
    });
  },
};
