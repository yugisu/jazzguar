import { Client, AI_PROMPT, HUMAN_PROMPT } from '@anthropic-ai/sdk';

import { ANTHROPIC_API_KEY } from '$env/static/private';

export type TagRating = {
	tag: string;
	rating: number;
};

const getRankTagsPrompt = (query: string, tagList: string[]) => `${HUMAN_PROMPT}
Given the following list of tags (separated by the "\n" character) in <tags></tags>, and text query in <query></query>, select tags that relate to the text query the most, and rate them on a scale from 0 to 1 by how closely the text query meaning relates to a tag, rating 1 is for the most fitting tag among these tags, rating 0 is for the least close tag. Don't be afraid to rate a tag as 0. Return results in valid JSON format as an array of objects with keys "tag", "rating". Your response should only include the JSON result, no trailing commas.
<tags>
${tagList.join('\n')}
</tags>
<query>${query}</query>
${AI_PROMPT}`;

export const searchTagsByQuery = async (query: string, tagList: string[]): Promise<TagRating[]> => {
	const client = new Client(ANTHROPIC_API_KEY);

	const { completion } = await client.complete({
		model: 'claude-instant-1',
		prompt: getRankTagsPrompt(query, tagList),
		max_tokens_to_sample: 256,
		stop_sequences: [],
		temperature: 0.7,
	});

	// TODO: Add response validation and correction.
	const tagsRanking = JSON.parse(completion) as TagRating[];

	return tagsRanking.filter(({ rating }) => rating > 0).map(({ tag, rating }) => ({ tag: tag.trim(), rating }));
};
