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

import { inspect } from "util";

/**
 * Cleans a string by removing sensitive information and formatting issues.
 * @param {string} [text] The text to clean.
 * @returns The cleaned text.
 */
export const clean = (text: string) => {
	if (typeof text !== "string") {
		text = inspect(text, { depth: 1 });
	}

	text = text
		.replace(/`/g, "`" + String.fromCharCode(8203))
		.replace(/@/g, "@" + String.fromCharCode(8203))
		.replace(process.env.DISCORD_TOKEN, "<TOKEN>");
	return text;
};

/**
 * Splits a message into chunks of specified length while preserving word boundaries
 * @param {string} message - The message to split
 * @param {number} maxLength - The maximum length of each chunk
 * @returns {string[]} An array of message chunks
 */
export const splitMessage = (message: string, maxLength: number) => {
	if (message.length <= maxLength) {
		return [message];
	}

	const chunks: string[] = [];
	let currentChunk = "";
	const words = message.split(" ");

	for (const word of words) {
		// If adding this word would exceed the limit
		if (currentChunk.length + word.length + 1 > maxLength) {
			if (currentChunk.length > 0) {
				chunks.push(currentChunk.trim());
				currentChunk = "";
			}

			// If a single word is longer than maxLength, split it
			if (word.length > maxLength) {
				let remainingWord = word;
				while (remainingWord.length > maxLength) {
					chunks.push(remainingWord.substring(0, maxLength));
					remainingWord = remainingWord.substring(maxLength);
				}
				currentChunk = remainingWord;
			} else {
				currentChunk = word;
			}
		} else {
			currentChunk += (currentChunk.length > 0 ? " " : "") + word;
		}
	}

	if (currentChunk.length > 0) {
		chunks.push(currentChunk.trim());
	}

	return chunks;
};
