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

import { container } from "@sapphire/pieces";
import { GuildEmoji } from "discord.js";
import { Emoji } from "../../types/constants";
import { EmojiName } from "../../types/constants/Emoji";

/**
 * Parses an emoji by its ID.
 * @param {string} [emojiID] The emoji ID.
 * @returns {GuildEmoji | undefined}
 */
export const parseEmojiByID = (emojiID: string): GuildEmoji | undefined => {
	return container.client.emojis.cache.get(emojiID);
};

/**
 * Gets an emoji by its name.
 * @param {EmojiName} emoji The name of the emoji to get.
 * @returns {GuildEmoji | undefined} The emoji if found, otherwise undefined.
 */
export const getEmoji = (emoji: EmojiName | string): GuildEmoji | undefined => {
	switch (emoji) {
		case "checkmark":
			return parseEmojiByID(Emoji.CheckmarkEmoji);
		case "crossmark":
			return parseEmojiByID(Emoji.CrossMarkEmoji);
		case "info":
			return parseEmojiByID(Emoji.InfoEmoji);
		case "typing":
			return parseEmojiByID(Emoji.TypingEmoji);
	}
};
