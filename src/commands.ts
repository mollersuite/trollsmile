import { Command, IntegrationContext, IntegrationType } from "./types"
import { ApplicationCommandOptionType, ApplicationCommandType, InteractionResponseType } from "discord-api-types/v10"

export const wavesmiley: Command = {
	name: "wavesmiley",
	description: "Say hello.",
	integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
	contexts: [IntegrationContext.GUILD, IntegrationContext.BOT_DM, IntegrationContext.PRIVATE_CHANNEL],
	run: (interaction) => {
		// if (false) {
		// 	const scary_messages = ["Im not playing", "look behind you", "your days are numbered", "i know your ip address"]
		// 	return {
		// 		type: InteractionResponseType.ChannelMessageWithSource,
		// 		data: {
		// 			content: scary_messages[Math.floor(Math.random() * scary_messages.length)],
		// 		},
		// 	}
		// }
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: "https://wavesmiley.com",
			},
		}
	},
}


export const badger: Command = {
	name: "badger",
	description: "https://github.com/mollersuite/trollsmile/issues/1",
	integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
	contexts: [IntegrationContext.GUILD, IntegrationContext.BOT_DM, IntegrationContext.PRIVATE_CHANNEL],
	run: (interaction) => {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: "https://raw.githubusercontent.com/mollersuite/trollsmile/refs/heads/main/badger.mp4",
			},
		}
	},
}

export const gayvesmiley: Command = {
	name: "gayvesmiley",
	description: "Gay hello.",
	integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
	contexts: [IntegrationContext.GUILD, IntegrationContext.BOT_DM, IntegrationContext.PRIVATE_CHANNEL],
	run: () => ({
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			content: "https://wave.pages.gay",
		},
	}),
}

export const evilwavesmiley: Command = {
	name: "evilwavesmiley",
	description: "Say goodbye.",
	integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
	contexts: [IntegrationContext.GUILD, IntegrationContext.BOT_DM, IntegrationContext.PRIVATE_CHANNEL],
	run: (interaction) => {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: "https://evilwavesmiley.com",
			},
		}
	},
}

export const duck: Command = {
	name: "duck",
	description: "just duck it",
	name_localizations: {
		"es-ES": "pato",
		"es-419": "pato",
	},
	description_localizations: {
		"es-ES": "simplemente pato eso",
		"es-419": "simplemente pato eso",
	},
	integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
	contexts: [IntegrationContext.GUILD, IntegrationContext.BOT_DM, IntegrationContext.PRIVATE_CHANNEL],
	options: [
		{
			name: "query",
			description: "The query to search for",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
	run: async (interaction) => {
		const url = `https://duckduckgo.com/?q=%5C${encodeURIComponent(
			interaction.data.options!.find((o) => o.name === "query")!.value as string
		)}`
		const ddg = await fetch(url)
		console.log(ddg.headers)
		const found = (await ddg.text()).match(/https%3A(.*?)'/)?.[1].replace(/&rut=.*/, "")

		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: found ? "https:" + decodeURIComponent(found) : url,
			},
		}
	},
}

export const Wave: Command = {
	name: "Wave",
	name_localizations: {
		"es-ES": "Saludar",
		"es-419": "Saludar",
	},
	type: ApplicationCommandType.User,
	integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
	contexts: [IntegrationContext.GUILD, IntegrationContext.BOT_DM, IntegrationContext.PRIVATE_CHANNEL],
	run: (interaction) => ({
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			content: `https://wavesmiley.com <@${interaction.data.target_id}>`,
		},
	}),
}

export const EvilWave: Command = {
	name: "Evil Wave",
	name_localizations: {
		"es-ES": "Malvado Saludar",
		"es-419": "Malvado Saludar",
	},
	type: ApplicationCommandType.User,
	integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
	contexts: [IntegrationContext.GUILD, IntegrationContext.BOT_DM, IntegrationContext.PRIVATE_CHANNEL],
	run: (interaction) => ({
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			content: `https://evilwavesmiley.com <@${interaction.data.target_id}>`,
		},
	}),
}

export const GayWave: Command = {
	name: "Gay Wave",
	type: ApplicationCommandType.User,
	integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
	contexts: [IntegrationContext.GUILD, IntegrationContext.BOT_DM, IntegrationContext.PRIVATE_CHANNEL],
	run: (interaction) => ({
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			content: `https://wave.pages.gay <@${interaction.data.target_id}>`,
		},
	}),
}

export const EmbedFixer: Command = {
	name: "Fix Embeds",
	type: ApplicationCommandType.Message,
	integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
	contexts: [IntegrationContext.GUILD, IntegrationContext.BOT_DM, IntegrationContext.PRIVATE_CHANNEL],
	run(interaction) {
		const [{ content }] = Object.values(interaction.data.resolved.messages)
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: content
					.replaceAll("https://nixos.wiki", "https://wiki.nixos.org")
					.replaceAll("https://twitter.com", "https://fxtwitter.com")
					.replaceAll("https://x.com", "https://fxtwitter.com"),
			},
		}
	},
}
