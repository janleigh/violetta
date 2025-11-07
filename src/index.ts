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

import { BaseClient } from "./lib/BaseClient";

import "@sapphire/plugin-logger/register";
import "dotenv/config";

const main = (): void => {
	if (!process.env.DISCORD_TOKEN) {
		throw new TypeError(
			`Environment variable 'DISCORD_TOKEN' should be type string. Got type ${typeof process.env
				.DISCORD_TOKEN} instead.`
		);
	}

	void new BaseClient().login();
};

main();
