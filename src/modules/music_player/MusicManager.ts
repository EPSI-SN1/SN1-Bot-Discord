import {Channel, CommandInteraction, Guild, TextChannel} from "discord.js";
import {Player, Song} from "discord-music-player";
import {Queue} from "discord-music-player/dist/managers/Queue";

export class MusicManager {
    public static player = undefined as unknown as Player;
    public static currentChannel = "" as string;
    public static currentTextChannel = "" as string;

    public static async play(interaction: CommandInteraction, channel: Channel,
                             textChannel: TextChannel, song: string): Promise<void> {
        const isConnected = interaction.client.voice.adapters.size > 0 as boolean;
        const guild = interaction.guild as Guild;

        if (isConnected) {
            if (this.currentChannel !== channel.id) {
                await interaction.reply({
                        content: "Je ne suis pas dans votre salon.",
                        ephemeral: true
                    }
                );
                return;
            }
        } else {
            this.currentChannel = channel.id;
            this.currentTextChannel = textChannel.id;
        }

        const queue = this.player.createQueue(guild.id) as Queue;
        await queue.join(channel.id);

        const playingSong = await queue.play(song).catch(err => {
            console.log(err);
        }) as Song;

        await interaction.reply({
            content: `Vous venez d'ajouter la musique **${playingSong.name}** au bot.`
        }).catch(err => console.log(err));
    }

    public static async stop(interaction: CommandInteraction, channel: Channel): Promise<void> {
        const isConnected = interaction.client.voice.adapters.size > 0 as boolean;
        const guild = interaction.guild as Guild;

        if (isConnected) {
            if (this.currentChannel !== channel.id) {
                await interaction.reply({
                        content: "Je ne suis pas dans votre salon.",
                        ephemeral: true
                    }
                );
                return;
            }

            const guildQueue = this.player.getQueue(guild.id) as Queue;

            guildQueue?.stop();
            this.currentChannel = "";

            await interaction.reply({
                    content: "Vous venez d'arrêter la musique.",
                    ephemeral: true
                }
            );
            return;
        }

        await interaction.reply({
                content: "Je ne joue aucune musique.",
                ephemeral: true
            }
        );
    }

    public static async queue(interaction: CommandInteraction, channel: Channel): Promise<void> {
        const isConnected = interaction.client.voice.adapters.size > 0 as boolean;
        const guild = interaction.guild as Guild;

        if (isConnected) {
            if (this.currentChannel !== channel.id) {
                await interaction.reply({
                        content: "Je ne suis pas dans votre salon.",
                        ephemeral: true
                    }
                );
                return;
            }

            const guildQueue = this.player.getQueue(guild.id) as Queue;

            let titles = "" as string;

            for (let i = 0; i < guildQueue?.songs.length; i++) {
                titles += `**Position. ${i + 1}** : ${guildQueue.songs[i].name} \n`;
            }

            await interaction.reply({content: `${titles}`})
            return;
        }

        await interaction.reply({
                content: "Je ne joue aucune musique.",
                ephemeral: true
            }
        );
    }

    public static async skip(interaction: CommandInteraction, channel: Channel): Promise<void> {
        const isConnected = interaction.client.voice.adapters.size > 0 as boolean;
        const guild = interaction.guild as Guild;

        if (isConnected) {
            if (this.currentChannel !== channel.id) {
                await interaction.reply({
                        content: "Je ne suis pas dans votre salon.",
                        ephemeral: true
                    }
                );
                return;
            }

            const guildQueue = this.player.getQueue(guild.id) as Queue;

            guildQueue?.skip();

            await interaction.reply({
                    content: `Je viens de passer à la musique suivante **${guildQueue.songs[1].name}**.`
                }
            );
            return;
        }

        await interaction.reply({
                content: "Je ne joue aucune musique.",
                ephemeral: true
            }
        );
    }

    public static async launchEvent(): Promise<void> {
        this.player.on('songChanged', async (queue: Queue, newSong: Song) => {
            const channel = this.player.client.channels.cache.get(this.currentChannel) as TextChannel;

            if (channel != null) {
                await channel.send(`Je joue actuellement la musique **${newSong}**.`).then(msg => {
                        setTimeout(async () => await msg.delete(), newSong.milliseconds);
                    }
                );
            }
        });
    }

}