import { REST, Routes } from "discord.js";

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

rest
	.put(Routes.applicationCommands("1320575111304314901"), { body: [] })
	.then(() => console.log("Successfully deleted all application commands."))
	.catch(console.error);
