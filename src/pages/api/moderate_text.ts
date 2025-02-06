import type { NextApiRequest, NextApiResponse } from 'next';
import { Filter } from "content-checker";

const filter = new Filter({ openModeratorAPIKey: process.env.OPEN_MODERATOR_API_KEY });

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('moderate text req.body', req.body);

    const config = {
        // checkManualProfanityList is optional and defaults to false; it checks for the words in lang.ts (if under 50 words) before hitting the AI model. Note that this affects performance.
        checkManualProfanityList: false,
        // provider defaults to "google-perspective-api" (Google's Perspective API); it can also be "openai" (OpenAI Moderation API) or "google-natural-language-api" (Google's Natural Language API)
        provider: "google-perspective-api",
    };
    try {
        filter.isProfaneAI(req.body, config).then((response) => {
            if (response.profane) {
                console.log("Profanity found. Types: ", response.type.join(", "));
                return res.status(200).json({ profanity_types: response.type.join(", ") })
            } else {
                console.log("No profanity found");
                return res.status(200).json({ profanity_types: '' })
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'Unexpected error occurred' });
    }

}

