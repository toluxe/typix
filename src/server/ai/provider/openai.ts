import { fetchUrlToDataURI } from "@/server/lib/util";
import openai from "openai";
import type { AiProvider, ApiProviderSettings, ApiProviderSettingsItem } from "../types/provider";
import { type ProviderSettingsType, chooseAblility, doParseSettings, findModel } from "../types/provider";

// Convert DataURI base64 string to FsReadStream compatible format
function createImageStreamFromDataUri(dataUri: string) {
	// Extract MIME type and base64 data from DataURI
	const [mimeTypePart, base64Data] = dataUri.split(",");
	if (!base64Data || !mimeTypePart) {
		throw new Error("Invalid DataURI format");
	}

	// Extract file extension from MIME type (e.g., "data:image/png;base64" -> "png")
	const mimeTypeMatch = mimeTypePart.match(/data:image\/([^;]+)/);
	const extension = mimeTypeMatch ? mimeTypeMatch[1] : "png";

	const binaryString = atob(base64Data);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}

	const stream = {
		path: `image.${extension}`,
		async *[Symbol.asyncIterator]() {
			yield bytes;
		},
	};

	return stream;
}

const openAISettingsSchema = [
	{
		key: "apiKey",
		type: "password",
		required: true,
	},
	{
		key: "baseURL",
		type: "url",
		required: false,
		defaultValue: "https://api.openai.com/v1",
	},
	{
		key: "model",
		type: "string",
		required: false,
		defaultValue: "gpt-image-1",
	},
] as const satisfies ApiProviderSettingsItem[];

// Automatically generate type from schema
export type OpenAISettings = ProviderSettingsType<typeof openAISettingsSchema>;

const OpenAI: AiProvider = {
	id: "openai",
	name: "OpenAI",
	supportCors: true,
	enabledByDefault: true,
	settings: openAISettingsSchema,
	models: [
		{
			id: "gpt-image-1",
			name: "GPT Image 1",
			ability: "i2i",
			maxInputImages: 3,
			enabledByDefault: true,
		},
	],
	parseSettings: <OpenAISettings>(settings: ApiProviderSettings) => {
		return doParseSettings(settings, openAISettingsSchema) as OpenAISettings;
	},
	generate: async (request, settings) => {
		const { baseURL, apiKey } = OpenAI.parseSettings<OpenAISettings>(settings);

		const client = new openai.OpenAI({ baseURL, apiKey, dangerouslyAllowBrowser: true });

		let generateResult: openai.ImagesResponse;
		try {
			switch (chooseAblility(request, findModel(OpenAI, request.modelId).ability)) {
				case "t2i":
					// Text-to-image generation
					generateResult = await client.images.generate({
						model: request.modelId,
						prompt: request.prompt,
						n: request.n || 1,
					});
					break;
				default:
					// Image editing
					generateResult = await client.images.edit({
						model: request.modelId,
						image: request.images!.map(createImageStreamFromDataUri),
						prompt: request.prompt,
						n: request.n || 1,
					});
					break;
			}
		} catch (e) {
			if (e instanceof openai.AuthenticationError || e instanceof openai.NotFoundError) {
				return {
					errorReason: "CONFIG_ERROR",
					images: [],
				};
			}
			throw e;
		}

		return {
			images: await Promise.all(
				(generateResult.data || []).map(async (image) => {
					if (image.b64_json) {
						return image.b64_json;
					}
					if (image.url) {
						try {
							return await fetchUrlToDataURI(image.url);
						} catch (error) {
							console.error("OpenAI image fetch error:", error);
							return null;
						}
					}
					return undefined;
				}),
			).then((results) => results.filter(Boolean) as string[]),
		};
	},
};

export default OpenAI;
