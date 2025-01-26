import { json } from '@sveltejs/kit';

import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST({ request }) {
    try {
        const { text } = await request.json();

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": "You hare a sentiment analyser"
                        },
                    ]
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            response_format: {
                "type": "json_schema",
                "json_schema": {
                    "name": "sentiment_output_model",
                    "strict": true,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "sentiment": {
                                "type": "string",
                                "description": "The overall sentiment identified from the text, e.g., positive, negative, neutral.",
                                "enum": [
                                    "positive",
                                    "negative",
                                    "neutral"
                                ]
                            },
                            "confidence": {
                                "type": "number",
                                "description": "A confidence score indicating the strength of the sentiment analysis, ranging from 0 to 1."
                            },
                            "keywords": {
                                "type": "array",
                                "description": "A list of key terms or phrases that influenced the sentiment analysis.",
                                "items": {
                                    "type": "string",
                                    "description": "A keyword or key phrase extracted from the analyzed text."
                                }
                            },
                            "analysis": {
                                "type": "object",
                                "description": "Detailed analysis of the text including breakdown of sentiment components.",
                                "properties": {
                                    "positive": {
                                        "type": "number",
                                        "description": "Score indicating positive sentiment components."
                                    },
                                    "negative": {
                                        "type": "number",
                                        "description": "Score indicating negative sentiment components."
                                    },
                                    "neutral": {
                                        "type": "number",
                                        "description": "Score indicating neutral sentiment components."
                                    }
                                },
                                "required": [
                                    "positive",
                                    "negative",
                                    "neutral"
                                ],
                                "additionalProperties": false
                            }
                        },
                        "required": [
                            "sentiment",
                            "confidence",
                            "keywords",
                            "analysis"
                        ],
                        "additionalProperties": false
                    }
                }
            },
            temperature: 1,
            max_completion_tokens: 4096,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });

        console.log(response)

        const sentiment = response.choices[0].message.content;
        return json(JSON.parse(sentiment));
    } catch (err) {
        console.error('Error in sentiment analysis:', err);
        return json({ error: 'Failed to analyze sentiment' }, { status: 500 });
    }

}