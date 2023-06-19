# jazzguar `📸🐆🎶`

A photo management web app leveraging AI capabilities. Created during the Fluxon AI hackathon.

The idea behind Jazzguar comes from a personal issue of organizing a navigable photo storage. This tool aims to make stored photos easy to traverse by categorizing them and allowing to query these categories using natural language. For labeling, which happens upon the image upload, it uses [Google Cloud Vision API](https://cloud.google.com/vision), and it's possible to assign image labels manually, as well; for querying the categories, it uses Anthropic Claude with a [prompt](https://github.com/yugisu/jazzguar/blob/main/src/lib/server/search.ts) crafted for this purpose. This allows for quick image search, suitable for personal image galleries.

The project is using SvelteKit because Claude advised me to go for it if I wanted to try something new apart from Next.js. Also, she's been helping me to learn it, even though she hallucinated a lot of Svelte libraries I asked her for ¯\\_(ツ)\_/¯

🔗 [PRD](docs/PRD.md) | [TDS](docs/TDS.md)
