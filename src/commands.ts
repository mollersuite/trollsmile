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
	integration_types: [IntegrationType.GUILD_INSTALL, IntegrationType.USER_INSTALL],
	contexts: [IntegrationContext.GUILD, IntegrationContext.BOT_DM, IntegrationContext.PRIVATE_CHANNEL],
	run: async (interaction) => {
		const url = `https://duckduckgo.com/?q=%5C${encodeURIComponent(
			interaction.data.options!.find((o) => o.name === "query")!.value as string
		)}`
		try {
			const ddg = await fetch(url)
			console.log(ddg.headers)
			const found = (await ddg.text()).match(/https%3A(.*?)'/)?.[1].replace(/&rut=.*/, "")

			return {
				type: InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: found ? "https:" + decodeURIComponent(found) : url,
				},
			}
		} catch (e) {
			console.log("Something went wrong", e)
			return {
				type: InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: url,
				},
			}
		}
	},
	options: [
		{
			name: "query",
			description: "The query to search for",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
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
