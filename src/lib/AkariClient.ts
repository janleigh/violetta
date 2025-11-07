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

export class AkariClient extends SapphireClient {
	public constructor() {
		super(CLIENT_OPTIONS);
	}

	public override async login(token?: string) {
		return super.login(token);
	}

	public override async destroy() {
		return super.destroy();
	}
}

declare module "@sapphire/pieces" {
	interface Container {
		client: AkariClient;
	}
}
