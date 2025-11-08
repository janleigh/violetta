<!---
this readme sucks
--->

<!--- TITLE --->
<h1 align="center"> violetta </h1>

<!--- DESCRIPTION --->
<div align="center">
   <p>
   <strong>A (not-so) generic helper bot for Discord.</strong>
   </p>
   <br>
</div>

<!--- SETUP --->
## <samp>SETUP</samp>

### Prerequisites
   - [Bun](https://bun.sh) (v1.0.0 or higher)
   - A Discord Bot Token (get one from the [Discord Developer Portal](https://discord.com/developers/applications))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/janleigh/violetta.git
   cd violetta
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Discord bot token:
   ```env
   DISCORD_TOKEN="your-bot-token-here"
   ```

4. **Configure bot settings (optional)**
   
   Edit `src/config.ts` to customize:
   - `DEV_SERVER_IDS` - Server IDs where developer commands will be registered
   - `DEV_USER_IDS` - User IDs who can use developer commands
   - Bot presence and activity settings

5. **Run the bot**
   
   For development (with debug logging):
   ```bash
   bun run start:dev
   ```
   
   For production:
   ```bash
   bun start
   ```

### Required Bot Permissions

When inviting the bot to your server, make sure it has these permissions:
- `Manage Channels` - Required for creating/deleting voice channels
- `Send Messages` - For sending command responses
- `Embed Links` - For sending rich embeds
- `Connect` & `Speak` - For voice channel functionality
- `View Channel` - To see channels in the server

Or just use the [invite link below](#links) and switch the client id to your application as it includes all necessary permissions.

<!--- LINKS --->
## <samp>LINKS</samp>
   - [Invite Violetta](https://discord.com/oauth2/authorize?client_id=1320575111304314901&permissions=1237423877622&scope=bot%20applications.commands)
   - [Support Server](https://discord.gg/fPdqz4f8wf)

<!--- LICENSE --->
## <samp>LICENSE</samp>
   This project is licensed under the [AGPL-3.0](../LICENSE.md) license.
