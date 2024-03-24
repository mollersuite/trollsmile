import dotenv from "dotenv"
import process from "node:process"
import * as commands from "./commands"

dotenv.config({ path: ".dev.vars" })

const token = process.env.DISCORD_TOKEN
const applicationId = process.env.DISCORD_APPLICATION_ID

if (!token) {
	throw new Error("The DISCORD_TOKEN environment variable is required.")
}
if (!applicationId) {
	throw new Error("The DISCORD_APPLICATION_ID environment variable is required.")
}

/**
 * Register all commands globally.  This can take o(minutes), so wait until
 * you're sure these are the commands you want.
 */
const url = `https://discord.com/api/v10/applications/${applicationId}/commands`

const response = await fetch(url, {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bot ${token}`,
	},
	method: "PUT",
	body: JSON.stringify(
		Object.values(commands).map((command) =>
			Object.assign(command, {
				run: undefined, // used internally, not by discord
			})
		)
	),
})

if (response.ok) {
	console.log("Registered all commands")
	const data = await response.json()
	console.log(JSON.stringify(data, null, 2))
} else {
	console.error("Error registering commands")
	let errorText = `Error registering commands \n ${response.url}: ${response.status} ${response.statusText}`
	try {
		const error = await response.text()
		if (error) {
			errorText = `${errorText} \n\n ${error}`
		}
	} catch (err) {
		console.error("Error reading body from request:", err)
	}
	console.error(errorText)
}
