const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "about",
    description: "Says about me",
  },
  {
    name: "meme",
    description: "Generate meme",
  },
  {
    name: "help",
    description: "Commands of Xen_World Bot",
  },
];

const Token = process.env.TOKEN;
const Client = process.env.CLIENT_ID;

const rest = new REST({ version: "10" }).setToken(`${Token}`);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(`${Client}`), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
