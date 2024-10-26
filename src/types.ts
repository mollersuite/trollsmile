import type {
	APIApplicationCommandOption,
	ApplicationCommandType,
	APIInteractionResponse,
	APIChatInputApplicationCommandInteraction,
	APIUserApplicationCommandInteraction,
	APIMessageApplicationCommandInteraction,
} from "discord-api-types/v10"

export enum IntegrationType {
	GUILD_INSTALL = 0,
	USER_INSTALL = 1,
}
export enum IntegrationContext {
	GUILD = 0,
	BOT_DM = 1,
	PRIVATE_CHANNEL = 2,
}

export type Command =
	| {
			type?: ApplicationCommandType
			name: string
			name_localizations?: Record<string, string>
			integration_types?: IntegrationType[] // Defaults to [GUILD_INSTALL]
			contexts?: IntegrationContext[] // Defaults to [GUILD, BOT_DM, PRIVATE_CHANNEL]
			nsfw?: boolean // Defaults to false
	  }
	| {
			type?: ApplicationCommandType.ChatInput
			description: string
			description_localizations?: Record<string, string>
			options?: APIApplicationCommandOption[]
			run(interaction: APIChatInputApplicationCommandInteraction): Promise<APIInteractionResponse> | APIInteractionResponse
	  }
	| {
			type: ApplicationCommandType.Message
			run(interaction: APIMessageApplicationCommandInteraction): Promise<APIInteractionResponse> | APIInteractionResponse
	  }
	| {
			type: ApplicationCommandType.User
			run(interaction: APIUserApplicationCommandInteraction): Promise<APIInteractionResponse> | APIInteractionResponse
	  }
