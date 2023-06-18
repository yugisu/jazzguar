# jazzguar Roadmap

## MVP

- [x] Start repo, setup the framework, styling, linters etc.
- [x] Build out basic UI pages
- [x] Implement uploading photos & basic photo gallery on the homepage
- [x] Add basic automatic image tagging functionality
- [x] Introduce image optimization for the gallery page and for the Cloud Vision API
- [x] Implement search based on tags
- [x] Implement v1 AI-powered search
- [ ] Improve the UI
  - [ ] Improve the look of tags (tag list is too long, show only manually added tags and hide automatic behind a hover icon)
  - [ ] Add smart/dumb mode switcher to the search (smart = AI search, dumb = based on tags)
- [ ] Improve the search prompt
  - [ ] Address security issues (like ability to inject your own arbitrary text into the text query).
  - [ ] Improve the accuracy and add more context to the prompt.
- [ ] Add logging to backend and frontend logic
- [ ] Explore other image tagging options ?

## Post-MVP

- [ ] Improve confidence score calculation by adding confidence score to the `Photo.tags` field
- [ ] Photo bulk uploads
- [ ] Evaluate pricing costs
- [ ] Auth, per-user gallery
- [ ] Folder structure
