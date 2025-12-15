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
 */

import { ApplyOptions } from "@sapphire/decorators";
import { type ChatInputCommand, Command, RegisterBehavior } from "@sapphire/framework";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } from "discord.js";
import { getEmoji } from "../../lib/utils/common/parsers.ts";
import { text } from "../../lib/utils/index.ts";

@ApplyOptions<Command.Options>({
	name: "eval",
	fullCategory: ["Developer"],
	preconditions: ["DeveloperOnlyPrecondition"],
})
export class EvaluateCommand extends Command {
	override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder
					.setName("eval")
					.setDescription("Execute some raw JavaScript code.")
					.addStringOption((option) =>
						option.setName("input").setDescription("The code to execute.").setRequired(true),
					)
					.addBooleanOption((option) =>
						option
							.setName("ephemeral")
							.setDescription("Whether to send the reply public or not.")
							.setRequired(false),
					),
			{ behaviorWhenNotIdentical: RegisterBehavior.Overwrite },
		);
	}

	override chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const input = interaction.options.getString("input");
		const ephemeral = interaction.options.getBoolean("ephemeral") ?? false;
		let content = "";

		const deleteButton = new ButtonBuilder()
			.setCustomId("evalDelete")
			.setLabel("Delete")
			.setStyle(ButtonStyle.Danger)
			.setEmoji("🗑️");

		const deleteRow = new ActionRowBuilder<ButtonBuilder>().addComponents(deleteButton);

		try {
			// biome-ignore lint/security/noGlobalEval: needed for command
			let evaled = eval(input as string);
			const timeTaken = ((Date.now() - interaction.createdTimestamp) / 1000).toFixed(3);
			evaled = text.clean(evaled);

			content = `:bricks: **EVAL COMPLETE** (${timeTaken}s) :bricks:\n\`\`\`xl\n${evaled}\`\`\``;
		} catch (err) {
			this.container.logger.error(`[EvalCommand] ${err}`);
			content = `:x: **EVAL ERROR**\n\`\`\`xl\n${text.clean(String(err))}\`\`\``;
			return interaction.reply({
				content,
			});
		}

		if (content.length < 2000) {
			return interaction.reply({
				content,
				flags: ephemeral ? MessageFlags.Ephemeral : undefined,
				components: [deleteRow],
			});
		} else {
			this.container.logger.info("!! EVAL COMPLETE !!");
			this.container.logger.info(content.replaceAll("```xl", "").replaceAll("```", ""));

			return interaction.reply({
				content: `${getEmoji("crossmark")} The output was too long to be sent as a message. Output has been logged to the console.`,
				flags: ephemeral ? MessageFlags.Ephemeral : undefined,
				components: [deleteRow],
			});
		}
	}
}
