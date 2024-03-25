import type {
	APIApplicationCommandOption,
	ApplicationCommandType,
	APIInteractionResponse,
	APIChatInputApplicationCommandInteraction,
	APIUserApplicationCommandInteraction,
	APIMessageApplicationCommandInteraction,
} from "discord-api-types/v10"

export enum CommandOptionType {
	SUB_COMMAND = 1,
	SUB_COMMAND_GROUP = 2,
	STRING = 3,
	INTEGER = 4, //	Any integer between -2^53 and 2^53
	BOOLEAN = 5,
	USER = 6,
	CHANNEL = 7, //	Includes all channel types + categories
	ROLE = 8,
	MENTIONABLE = 9, //	Includes users and roles
	NUMBER = 10, //	Any double between -2^53 and 2^53
	ATTACHMENT = 11,
}
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
			integration_types?: IntegrationType[] // Defaults to [GUILD_INSTALL]
			contexts?: IntegrationContext[] // Defaults to [GUILD, BOT_DM, PRIVATE_CHANNEL]
			nsfw?: boolean // Defaults to false
	  }
	| {
			type?: ApplicationCommandType.ChatInput
			description: string
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
