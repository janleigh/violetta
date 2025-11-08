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

import { SapphireClient } from "@sapphire/framework";
import { CLIENT_OPTIONS } from "../config";

export class BaseClient extends SapphireClient {
	/**
	 * @description Set of temporary voice channel IDs that should be deleted when empty.
	 * @type {Set<string>}
	 */
	public tempVoiceChannels: Set<string> = new Set();

	public constructor() {
		super(CLIENT_OPTIONS);
	}

	/**
	 * @override
	 * @description Logs in the client.
	 * @param {string} [token] The bot token.
	 */
	public override async login(token?: string) {
		return super.login(token);
	}

	/**
	 * @override
	 * @description Destroys the client.
	 */
	public override async destroy() {
		return super.destroy();
	}
}
