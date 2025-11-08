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

import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, type ListenerOptions } from "@sapphire/framework";
import { VoiceState } from "discord.js";

@ApplyOptions<ListenerOptions>({
	event: Events.VoiceStateUpdate
})
export class VoiceStateUpdateListener extends Listener<typeof Events.VoiceStateUpdate> {
	public async run(oldState: VoiceState, newState: VoiceState) {
		if (newState.channel && oldState.channelId !== newState.channelId) {
			const joinedId = newState.channelId;
			if (joinedId && this.container.client.tempVoiceChannelTimeouts.has(joinedId)) {
				const to = this.container.client.tempVoiceChannelTimeouts.get(joinedId)!;
				clearTimeout(to as unknown as number);
				this.container.client.tempVoiceChannelTimeouts.delete(joinedId);
				this.container.logger.info(
					`[VoiceStateUpdate] Cancelled unused timeout for channel ${joinedId} because someone joined.`
				);
			}
		}
		if (oldState.channel && oldState.channelId !== newState.channelId) {
			const channelId = oldState.channelId;

			if (channelId && this.container.client.tempVoiceChannels.has(channelId)) {
				const channel = oldState.channel;

				if (channel.members.size === 0) {
					try {
						await channel.delete("Temporary voice channel is empty");

						this.container.client.tempVoiceChannels.delete(channelId);

						this.container.logger.info(
							`[VoiceStateUpdate] Deleted empty temporary voice channel: ${channel.name} (${channelId})`
						);
					} catch (error) {
						this.container.logger.error(
							`[VoiceStateUpdate] Failed to delete temporary voice channel ${channelId}: ${error}`
						);

						this.container.client.tempVoiceChannels.delete(channelId);
					}
				}
			}
		}
	}
}
