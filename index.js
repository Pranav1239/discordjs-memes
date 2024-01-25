const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const axios = require("axios");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

const Token = process.env.TOKEN;

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "help") {
    try {
      const aboutEmbed = new EmbedBuilder()
        .setTitle("Commands")
        .setColor("#ffd700") // Set a color for the embed
        .addFields(
          { name: "/meme", value: "Generate meme" },
          { name: "/about", value: "Says about me" },
          { name: "/help", value: "Every CMD's list" }
        )
        .setFooter({
          text: "Explore More about Xen Bot it's a meme generator",
        });
      await interaction.reply({ embeds: [aboutEmbed] });
    } catch (error) {
      console.error("Error while calling help / ::", error);
      interaction.reply("Error Please try again later");
    }
  }

  if (interaction.commandName === "meme") {
    try {
      const response = await axios.get("https://meme-api.com/gimme");
      const memeUrl = response;
      interaction.reply({ files: [memeUrl.data.url] });
    } catch (error) {
      console.error("Error making API call:", error);
      interaction.reply("Failed to fetch data from the API.");
    }
  }

  if (interaction.commandName === "about") {
    const aboutEmbed = new EmbedBuilder()
      .setTitle("About Me")
      .setDescription(
        "I'm Pranav, a 17-year-old full-stack developer and guitarist with a passion for coding."
      )
      .setColor("#ffd700") // Set a color for the embed
      .addFields(
        { name: "Age", value: "17" },
        { name: "Occupation", value: "Full-Stack Developer" },
        { name: "Location", value: "Vizag, India" },
        {
          name: "Interests",
          value:
            "Coding, Exploring new places, Combining technology and creativity and a Guitarist",
        },
        { name: "Education", value: "Pursuing Diploma in Computer Science" }
      )
      .setFooter({ text: "Always eager to learn and grow!" });
    await interaction.reply({ embeds: [aboutEmbed] });
  }
});

client.login(`${Token}`);
