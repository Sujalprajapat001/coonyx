const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-account")
        .setDescription("Link your social media account")

        .addStringOption(option =>
            option
                .setName("platform")
                .setDescription("Select platform")
                .setRequired(true)
                .addChoices(
                    { name: "Instagram", value: "instagram" },
                    { name: "TikTok", value: "tiktok" },
                    { name: "YouTube", value: "youtube" },
                    { name: "Kick", value: "kick" },
                    { name: "X", value: "twitter" }
                ))

        .addStringOption(option =>
            option
                .setName("username")
                .setDescription("Your username")
                .setRequired(true)),

    async execute(interaction) {

        const platform = interaction.options.getString("platform");
        const username = interaction.options.getString("username");

        const code =
            "CN-" +
            Math.random().toString(36).substring(2,8).toUpperCase();

        const embed = new EmbedBuilder()

            .setColor("#00ff88")

            .setTitle("✅ Account Linked")

            .setDescription(
`Platform: **${platform}**

Username: **${username}**

Verification Code:

\`${code}\`

Paste this code inside your bio.

After that run

\`/verify-status\`
`)

.setFooter({
text:"ClipNation Verification"
});

        await interaction.reply({
            embeds:[embed],
            ephemeral:true
        });

    }
};
