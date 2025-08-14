"use server";
/**
 * @fileOverview This file implements the dynamic meta tag generation for hotel pages.
 *
 * - generateDynamicMetaTags - A function that generates SEO-optimized meta tags for a given hotel.
 * - GenerateDynamicMetaTagsInput - The input type for the generateDynamicMetaTags function.
 * - GenerateDynamicMetaTagsOutput - The return type for the generateDynamicMetaTags function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const GenerateDynamicMetaTagsInputSchema = z.object({
  hotelName: z.string().describe("The name of the hotel."),
  hotelDescription: z.string().describe("A detailed description of the hotel."),
  hotelLocation: z.string().describe("The location of the hotel."),
  hotelFeatures: z
    .array(z.string())
    .describe("An array of features offered by the hotel."),
  nearbyAttractions: z
    .array(z.string())
    .describe("An array of nearby attractions."),
});
export type GenerateDynamicMetaTagsInput = z.infer<
  typeof GenerateDynamicMetaTagsInputSchema
>;

const GenerateDynamicMetaTagsOutputSchema = z.object({
  title: z.string().describe("The SEO-optimized title tag for the hotel page."),
  description: z
    .string()
    .describe("The SEO-optimized description meta tag for the hotel page."),
  keywords: z
    .string()
    .describe(
      "A comma-separated string of SEO-optimized keywords for the hotel page."
    ),
  ogTitle: z
    .string()
    .describe("The Open Graph title for social media sharing."),
  ogDescription: z
    .string()
    .describe("The Open Graph description for social media sharing."),
});
export type GenerateDynamicMetaTagsOutput = z.infer<
  typeof GenerateDynamicMetaTagsOutputSchema
>;

export async function generateDynamicMetaTags(
  input: GenerateDynamicMetaTagsInput
): Promise<GenerateDynamicMetaTagsOutput> {
  return generateDynamicMetaTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: "generateDynamicMetaTagsPrompt",
  input: { schema: GenerateDynamicMetaTagsInputSchema },
  output: { schema: GenerateDynamicMetaTagsOutputSchema },
  prompt: `You are an SEO expert specializing in creating meta tags for hotel websites.

  Generate an SEO-optimized title, description, keywords, and Open Graph tags for a hotel page based on the following information:

  Hotel Name: {{hotelName}}
  Description: {{hotelDescription}}
  Location: {{hotelLocation}}
  Features: {{#each hotelFeatures}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Nearby Attractions: {{#each nearbyAttractions}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Requirements:
  - Title: (50-60 characters, include the hotel name and a key selling point)
  - Description: (150-160 characters, summarize the hotel and its key features and location)
  - Keywords: (A comma-separated list of 8-12 relevant keywords, including hotel name, location, features, and attractions)
  - OG Title: (Similar to title but optimized for social media, can be slightly longer)
  - OG Description: (Engaging description for social media sharing, can be slightly longer than meta description)
  
  Make sure all content is engaging, unique, and optimized for both search engines and social media sharing.
  Focus on local SEO keywords and unique selling points of the hotel.
  `,
});

const generateDynamicMetaTagsFlow = ai.defineFlow(
  {
    name: "generateDynamicMetaTagsFlow",
    inputSchema: GenerateDynamicMetaTagsInputSchema,
    outputSchema: GenerateDynamicMetaTagsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
