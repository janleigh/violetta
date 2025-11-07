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

import { EmbedBuilder as DEmbedBuilder } from "discord.js";
import { getEmoji } from "../utils/common/parsers";

export class EmbedBuilder extends DEmbedBuilder {
	/**
	 * @description Whether the embed is an error embed.
	 * @type {boolean}
	 * @default false
	 */
	public errorEmbed: boolean = false;

	/**
	 * @description Whether the embed has a checkmark.
	 * @type {boolean}
	 * @default false
	 */
	public hasCheckmark: boolean = false;

	/**
	 * @description The embed constructor.
	 * @constructor
	 */
	public constructor() {
		super();

		this.setColor("#fdd59a");
	}

	/**
	 * @override
	 * @description Sets the embed description.
	 * @param {string | null} [description] The embed description.
	 * @param {boolean} [boldDescription] Whether to bold the description.
	 * @returns {this}
	 */
	public override setDescription(description: string | null, boldDescription = false): this {
		if (description === null) return this;
		if (this.errorEmbed === true) {
			return super.setDescription(`${getEmoji("crossmark")} **${description}**`);
		}
		if (this.hasCheckmark === true) {
			return super.setDescription(`${getEmoji("checkmark")} **${description}**`);
		}

		return super.setDescription(`${boldDescription ? "**" : ""}${description}${boldDescription ? "**" : ""}`);
	}

	/**
	 * @description Sets the embed color to red.
	 * @returns {this}
	 */
	public isErrorEmbed(): this {
		this.setColor("#E84A5F");
		this.errorEmbed = true;
		return this;
	}

	/**
	 * @description Sets the embed color to green.
	 * @param {boolean} [emoji] Whether to add the checkmark emoji to the embed description.
	 * @returns {this}
	 */
	public isSuccessEmbed(emoji?: boolean): this {
		this.setColor("#1ED760");
		this.hasCheckmark = emoji ?? false;
		return this;
	}
}
