import { Command, IntegrationContext, IntegrationType } from "./types"
import { ApplicationCommandType, InteractionResponseType } from "discord-api-types/v10"

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
