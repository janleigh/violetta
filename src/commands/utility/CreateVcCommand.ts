/**
 *  Copyright (C) 2025 Jan Leigh Muñoz
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 **/

import { ChatInputCommand, Command, RegisterBehavior } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { ChannelType, PermissionFlagsBits } from "discord.js";
import { EmbedBuilder } from "../../lib/components/EmbedBuilder";

@ApplyOptions<Command.Options>({
	name: "createvc",
	fullCategory: ["Utility"]
})
export class CreateVcCommand extends Command {
	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder
					.setName("createvc")
					.setDescription("Create a voice channel that only people with your roles can join.")
					.addStringOption((option) =>
						option
							.setName("name")
							.setDescription("The name of the voice channel.")
							.setRequired(true)
							.setMaxLength(100)
					)
					.addIntegerOption((option) =>
						option
							.setName("userlimit")
							.setDescription("The maximum number of users that can join (0 = unlimited).")
							.setRequired(false)
							.setMinValue(0)
							.setMaxValue(99)
					),
			{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
		);
	}

	public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (!interaction.guild || !interaction.member) {
			const errorEmbed = new EmbedBuilder()
				.isErrorEmbed()
				.setDescription("This command can only be used in a server.");

			return interaction.reply({
				embeds: [errorEmbed],
				ephemeral: true
			});
		}

		const name = interaction.options.getString("name", true);
		const userLimit = interaction.options.getInteger("userlimit") ?? 0;

		const member = interaction.guild.members.cache.get(interaction.user.id);
		if (!member) {
			const errorEmbed = new EmbedBuilder().isErrorEmbed().setDescription("Could not find your member data.");

			return interaction.reply({
				embeds: [errorEmbed],
				ephemeral: true
			});
		}

		const userRoles = member.roles.cache.filter((role) => role.id !== interaction.guild!.id);

		// Hard-coded for a specific server to ignore certain roles
		// Comment this if you want to use this in your own server.
		const ignoredRoles = ["👥 Mga Ampon", "1435977013243547829"];
		userRoles.forEach((role) => {
			if (ignoredRoles.includes(role.name) || ignoredRoles.includes(role.id)) {
				userRoles.delete(role.id);
			}
		});

		if (userRoles.size === 0) {
			const errorEmbed = new EmbedBuilder()
				.isErrorEmbed()
				.setDescription("You need at least one role to create a restricted voice channel.");

			return interaction.reply({
				embeds: [errorEmbed],
				ephemeral: true
			});
		}

		await interaction.deferReply();

		try {
			const permissionOverwrites = [
				{
					id: interaction.guild.id,
					deny: [PermissionFlagsBits.Connect]
				},
				{
					id: interaction.user.id,
					allow: [PermissionFlagsBits.Connect, PermissionFlagsBits.Speak, PermissionFlagsBits.ViewChannel]
				},
				...userRoles.map((role) => ({
					id: role.id,
					allow: [PermissionFlagsBits.Connect, PermissionFlagsBits.Speak, PermissionFlagsBits.ViewChannel]
				}))
			];

			const voiceChannel = await interaction.guild.channels.create({
				name: name,
				type: ChannelType.GuildVoice,
				userLimit: userLimit,
				permissionOverwrites: permissionOverwrites
			});

			this.container.client.tempVoiceChannels.add(voiceChannel.id);

			const roleList = userRoles.map((role) => `<@&${role.id}>`).join(", ");

			const successEmbed = new EmbedBuilder()
				.isSuccessEmbed(true)
				.setDescription(`Voice channel <#${voiceChannel.id}> has been created!`)
				.addFields(
					{ name: "Allowed Roles", value: roleList, inline: false },
					{ name: "User Limit", value: userLimit === 0 ? "Unlimited" : String(userLimit), inline: true }
				)
				.setFooter({ text: "This channel will be automatically deleted when empty." });

			return interaction.editReply({
				embeds: [successEmbed]
			});
		} catch (error) {
			this.container.logger.error(`[CreateVcCommand] ${error}`);

			const errorEmbed = new EmbedBuilder()
				.isErrorEmbed()
				.setDescription(
					"Failed to create the voice channel. Make sure I have the `Manage Channels` permission."
				);

			return interaction.editReply({
				embeds: [errorEmbed]
			});
		}
	}
}
