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

import { type Command, Precondition } from "@sapphire/framework";
import type { Message } from "discord.js";
import { DEV_USER_IDS } from "../config.ts";

export class DeveloperOnlyPrecondition extends Precondition {
	public chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		return this.checkDev(interaction.user.id);
	}

	public contextMenuRun(interaction: Command.ContextMenuCommandInteraction) {
		return this.checkDev(interaction.user.id);
	}

	public messageRun(message: Message) {
		return this.checkDev(message.author.id);
	}

	private checkDev(userId: string) {
		return DEV_USER_IDS.includes(userId)
			? this.ok()
			: this.error({ message: "This command is only available to developers." });
	}
}
