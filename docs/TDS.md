# jazzguar TDS

Author: @yugisu-flux

[PRD](PRD.md)

## MVP

### Page structure

- `/` Main page - Header, search bar, link to the **Upload page**, gallery of photos with tags

- `/upload` Upload page - Header, a simple form that accepts a single (for the time being) photo, an input for manual tags, and a submit button.

### Tools overview & alternatives

#### UI framework

[SvelteKit](https://kit.svelte.dev/) - Claude advised me to go for it if I want to try something new apart from Next.js ¯\_(ツ)\_/¯.

#### Auth

- **No auth** (for the MVP stage)
- Firebase
- Supabase

#### Data persistence

- **Firestore**
- Supabase
- Prisma
- etc.

#### Storage

- **Firebase Storage**
- Supabase Storage
- just saving files to disk.

#### Image categorization & photo tag assignment

One of:

- [**Firebase Cloud Vision Image Labeling API**](https://firebase.google.com/docs/ml/label-images)
- [microsoft/resnet-50](https://huggingface.co/microsoft/resnet-50)

#### Search

Consists of two things:

1. Service for aligning queries with the existent tags; responsible for converting "feline", "kitty" Queries -> "cat" Tag (or more complex queries);

   - **GPT-like client**
   - Something lightweight and suitable for this "text-to-taglist" task

2. **Plain DB search for tags**, or some full-text search engine, if the former is unsufficient.
