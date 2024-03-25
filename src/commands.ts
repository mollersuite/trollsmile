import { Command, IntegrationContext, IntegrationType } from "./types"
import { ApplicationCommandOptionType, ApplicationCommandType, InteractionResponseType } from "discord-api-types/v10"

export const wavesmiley: Command = {
	name: "wavesmiley",
	description: "Yeah, I just been wavin' my smiley and gettin' it live, hold up",
	integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
	contexts: [IntegrationContext.GUILD, IntegrationContext.BOT_DM, IntegrationContext.PRIVATE_CHANNEL],
	run: () => ({
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			content: "https://wavesmiley.com",
		},
	}),
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
