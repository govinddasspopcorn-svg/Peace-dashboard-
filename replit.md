# Overview

This is a feature-rich Discord music bot built with discord.js v14, featuring advanced music playback capabilities through Kazagumo and Shoukaku (Lavalink), along with comprehensive server management tools including anti-nuke protection, automod, automation features, and aesthetic UI elements powered by Canvas libraries.

The bot provides a complete suite of features for Discord servers: high-quality music streaming from multiple platforms (YouTube, Spotify, SoundCloud), advanced moderation and security systems, automation tools (auto-responder, auto-react, voice roles), user profiles, welcome systems, and interactive commands with Canvas-generated graphics.

# Recent Changes

**December 8, 2025 - Drop System Implementation**
- Implemented complete drop system with auto-spawning every 30 minutes
- Created MongoDB schemas: DropUser (balances, cooldowns, stats) and DropGuild (channel, active drop, rain mode)
- Built rarity system: Mythical (0.5%), Legendary (1%), Rare (2.5%), Uncommon (6%), Common (90%)
- Rewards: Mythical 500k owo/$0.10 LTC, Legendary 250k/$0.05, Rare 100k/$0.02, Uncommon 50k/$0.01, Common 10k
- Cooldowns: Mythical 7 days, Legendary 5 days, Rare 24 hours
- Created 9 prefix commands in src/commands/Drops/: dclaim, dbal, dropchannel, forcedrop, rain, resetuser, giveowo, droprewards, dropleaderboard
- Created 9 slash commands in src/slashCommands/Drops/ (matching functionality)
- Added claim button handler in interactionCreate.js
- Updated help menu with Drops category
- Created cluster.js for proper discord-hybrid-sharding startup
- Bot Status: ✓ Running successfully
  - 193 prefix commands loaded (9 new Drops commands)
  - 55 slash commands deployed (9 new Drops commands)
  - Auto-spawner active: drops every 30 min, rain mode every 2 min
  - MongoDB connected

**November 18, 2025 - Giveaway System Enhancement**
- Fixed slash command permission properties (userPrams → userPerms, botPrams → botPerms)
- Enhanced GiveawayManager with automatic participant tracking every 30 seconds
- Added persistent participant storage in MongoDB during giveaway runtime
- Implemented automatic giveaway restoration on bot restart with participant data
- All giveaway commands now fully functional with data persistence

**November 10, 2025 - Initial Deployment**
- Extracted and deployed Discord bot from provided archive
- Installed Node.js 20 and all required npm dependencies (396 packages)
- Installed system dependency (util-linux) for Canvas image generation libraries
- Configured workflow to run bot via `node Shard.js`
- Security improvements:
  - Created `.gitignore` to exclude sensitive files (.env, node_modules, logs)
  - Refactored Top.gg API integration to use environment variable instead of hardcoded token

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Core Bot Architecture

**Discord Client Structure**
- Custom `MusicBot` class extending discord.js Client with hybrid sharding support via `discord-hybrid-sharding`
- Entry point: `Shard.js` creates a ClusterManager that spawns worker-based shards
- Main bot instance initialized in `index.js` with custom utilities and emoji configuration
- Modular command system supporting both prefix commands and slash commands
- Event-driven architecture with separate loaders for different event categories

**Command System**
- **Prefix Commands**: Located in `src/commands/` organized by category (Music, Config, Information, etc.)
- **Slash Commands**: Located in `src/slashCommands/` with automatic Discord API registration
- Dynamic command loading through dedicated loader modules (`loadCommands.js`, `loadSlashCommands.js`)
- Global deployment of slash commands using Discord REST API

**Event System**
- Segregated event handlers for different concerns:
  - Client events (`src/events/Client/`)
  - Music player events (`src/events/Players/`)
  - Lavalink node events (`src/events/Node/`)
  - Anti-nuke protection events (`src/events/Antinuke/`)
  - Automod events (`src/events/AutoMod/`)
- Each event category loaded through dedicated loader modules

## Music System Architecture

**Lavalink Integration**
- Built on Kazagumo (Lavalink wrapper) + Shoukaku (low-level Lavalink connector)
- Custom player manager implementation in `loadPlayerManager.js` with extended search capabilities
- Supports multiple search engines: YouTube, Spotify, SoundCloud, Deezer, JioSaavn, YouTube Music
- Configurable Lavalink nodes defined in `config.js` with connection options
- Spotify integration via `kazagumo-spotify` plugin for playlist and track resolution

**Audio Features**
- Queue management with autoplay functionality using similarity detection (Levenshtein algorithm)
- Track deduplication to prevent playing similar songs consecutively
- 24/7 mode support with auto-reconnect schema
- Audio filters and effects support
- Progress bar visualization for track playback
- Multiple music card rendering libraries (musicard, songcard, musicard-quartz)

**Rationale**: Kazagumo + Shoukaku provides a robust, performant music playback solution with automatic failover and resume capabilities. The dual-layer architecture (Kazagumo for high-level features, Shoukaku for low-level WebSocket handling) ensures stability while maintaining flexibility.

## Data Storage Architecture

**MongoDB with Mongoose**
- Connection string stored in `config.js` pointing to MongoDB Atlas cluster
- Schema-based data models in `src/schema/` directory covering:
  - Server configurations (prefix, preset, setup, roles)
  - Music system (247 mode, playlists)
  - Moderation (antinuke, antilink, antispam, blacklist)
  - Automation (autoresponder, autoreact, autorole, voicerole)
  - User data (profiles, badges, AFK status, vote bypass)
  - Welcome system with customizable embeds

**Data Model Design**
- Guild-scoped configurations (indexed by `guildId`)
- User-scoped data (indexed by `userId`)
- Array-based storage for whitelists, playlists, and multi-value settings
- Embedded documents for complex structures (welcome system embeds, social media links)
- Expiration support for temporary permissions (noprefix, vote bypass)

**Rationale**: MongoDB's flexible schema design accommodates the diverse configuration options required by different server features. Mongoose provides validation and type safety while maintaining the ability to quickly iterate on data structures.

## Security & Moderation Architecture

**Anti-Nuke System**
- Real-time event monitoring for destructive actions (mass bans, role deletes, channel operations)
- Configurable whitelist system (users and roles)
- Extra owner designation for trusted administrators
- Log channel integration for audit trails
- Event handlers in `src/events/Antinuke/` for specific Discord events

**Automod Features**
- Anti-spam detection with configurable thresholds and timeframes
- Anti-link filtering with whitelist support
- Message tracking with user/role exemptions
- Automatic action enforcement (delete, timeout, etc.)

**Permission & Access Control**
- Owner-only commands restricted by `ownerID` configuration
- Vote-based feature access with bypass system
- No-prefix access for privileged users
- Badge system for user classification (owner, dev, admin, staff, etc.)
- Blacklist system with timestamp tracking

## Automation Architecture

**Auto-Responder System**
- Trigger-response pairs stored per guild
- Pattern matching for message content
- Supports multiple auto-responses per server

**Auto-React System**
- Keyword-emoji associations stored per guild
- Automatic emoji reactions to matching messages

**Voice Role System**
- Automatic role assignment based on voice channel activity
- Guild-specific role configuration

**Auto-Role System**
- Separate role assignments for humans and bots on join
- Array-based role storage for multiple roles

**Welcome System**
- Fully customizable welcome messages with embed support
- Canvas-based banner generation
- Auto-delete functionality with configurable timeframe
- Placeholder system for dynamic content (user info, server info)

## UI/UX Architecture

**Custom Component Builders**
- `src/custom/button.js`: Chainable button builder with style shortcuts
- `src/custom/embed.js`: Simplified embed creation with method chaining
- Centralized emoji configuration in `src/utils/emoji.json` and client emoji object

**Canvas Graphics**
- Libraries: canvacard, canvafy for profile cards and welcome banners
- Music visualization through musicard variants
- Custom templates and theming support

**Message Formatting**
- Number formatting utility (`numformat.js`) for K/M/B abbreviations
- Time conversion utilities for duration display
- Progress bar generation for music playback

## External Service Architecture

**Third-Party Integrations**
- **Top.gg**: Bot statistics and voting via `@top-gg/sdk` and `topgg-autoposter`
- **Spotify API**: Track/playlist resolution using client ID/secret credentials
- **Lavalink Nodes**: External audio processing servers with fallback support
- **Discord Webhooks**: Logging and notifications for various bot events

**Webhook System**
- Centralized webhook URLs in `config.js` for different event types
- Separate webhooks for: blacklist actions, player lifecycle, guild events, command execution
- Structured logging with consistent formatting

## Utility Architecture

**Helper Modules**
- `src/utils/util.js`: Message building, welcome preview, settings management
- `src/utils/convert.js`: Time and number conversion utilities
- `src/utils/functions.js`: Autoplay logic with similarity detection
- `src/utils/logger.js`: Color-coded console logging with timestamps (Asia/Kolkata timezone)
- `src/utils/progressbar.js`: Visual progress indicator for music playback

**Developer Tools**
- Dokdo integration for REPL-style debugging (JSK commands)
- Shell environment detection for cross-platform compatibility

# External Dependencies

## Music & Audio Services
- **Lavalink Node**: `lava-v4.ajieblogs.eu.org:443` (primary audio processing server)
- **Spotify API**: Integration via client credentials for track resolution
- Multiple search providers: YouTube, SoundCloud, Deezer, JioSaavn

## Database
- **MongoDB Atlas**: Cloud-hosted MongoDB cluster (`cluster0.myrrp0j.mongodb.net`)
- Database name: `musicbot`
- Connection via Mongoose ODM with connection pooling

## Discord Services
- **Top.gg**: Bot listing and voting platform
- **Discord Webhooks**: Multiple webhook endpoints for logging and notifications
- **Discord API**: Gateway v10 for bot operations

## NPM Packages
- **discord.js v14**: Core Discord bot framework with gateway intents
- **kazagumo v3**: High-level Lavalink client with plugin support
- **shoukaku v4**: Low-level Lavalink WebSocket client
- **mongoose v8**: MongoDB object modeling
- **discord-hybrid-sharding v2**: Multi-process bot scaling
- **Canvas Libraries**: canvacard, canvafy for image generation
- **Utility Libraries**: axios (HTTP), moment (date/time), archiver (file compression)
- **Music Cards**: musicard, songcard for visual track display

## Configuration Storage
- Bot token and credentials stored in `src/config.js`
- Environment-specific settings (prefix, owner ID, API keys)
- Node configuration with secure connection options