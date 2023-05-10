const { Events } = require('discord.js')

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isCommand() && !interaction.isButton()) return

        const command = interaction.client.commands.get(interaction.commandName)

        if (command) {
            try {
                await command.execute(interaction)
            } catch (error) {
                console.error(error)
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                })
            }
        }

        let userid
        if (interaction.isButton()) {
            userid = interaction.message.embeds.map(
                (embed) => embed.footer.text
            )
            if (!interaction.guild.members.resolveId(userid[0]))
                return interaction.reply({
                    ephemeral: true,
                    content: 'This user is not in this guild',
                })
            let user = interaction.guild.members.cache.find(
                (user) => user.id === userid[0]
            )
            switch (interaction.customId) {
                case 'kick':
                    if (interaction.guild.members.cache.get(user.id).kickable) {
                        try {
                            await interaction.guild.members.cache
                                .get(user.id)
                                .kick()
                        } catch (error) {}
                    } else {
                        await interaction.reply({
                            ephemeral: true,
                            content: "I can't kick this user",
                        })
                    }
                    interaction.reply({
                        ephemeral: true,
                        content: `The user ${user} has been kicked`,
                    })
                    break
                case 'ban':
                    if (interaction.guild.members.cache.get(user.id).bannable) {
                        try {
                            await interaction.guild.members.cache
                                .get(user.id)
                                .ban()
                        } catch (error) {}
                    } else {
                        await interaction.reply({
                            ephemeral: true,
                            content: "I can't ban this user",
                        })
                    }
                    interaction.reply({
                        ephemeral: true,
                        content: `The user ${user} has been banned`,
                    })
                    break
                case 'pollOpt1':
                    interaction.client.users.send(
                        interaction.user,
                        'You voted for option 1'
                    )
                    break
                case 'pollOpt2':
                    interaction.client.users.send(
                        interaction.user,
                        'You voted for option 2'
                    )
                    break
                case 'pollOpt3':
                    interaction.client.users.send(
                        interaction.user,
                        'You voted for option 3'
                    )
                    break
                case 'pollOpt4':
                    interaction.client.users.send(
                        interaction.user,
                        'You voted for option 4'
                    )
                default:
                    await interaction.reply({
                        ephemeral: true,
                        content: 'Button Clicked!',
                    })
                    break
            }
        }
    },
}
