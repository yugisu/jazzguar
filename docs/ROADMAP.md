# jazzguar Roadmap

## MVP

- [x] Start repo, setup the framework, styling, linters etc.
- [x] Build out basic UI pages
- [x] Implement uploading photos & basic photo gallery on the homepage
- [x] Add basic automatic image tagging functionality
- [x] Introduce image optimization for the gallery page and for the Cloud Vision API
- [x] Implement search based on tags
- [x] Implement v1 AI-powered search
- [x] UX improvements
  - [x] Improve the look of tags (tag list is too long, show only manually added tags and hide automatic behind a hover icon)
  - [x] ~~Add smart/dumb mode switcher to the search (smart = AI search, dumb = based on tags)~~ - no need for this since the search AI is fast enough.
- [x] Improve the search prompt
  - [x] Address security issues (like ability to inject your own arbitrary text into the text query).
  - [x] Improve the accuracy and add more context to the prompt.
- [x] Deploy the app - make sure your local env vars are kept under the `.env.local` file (not `.env`), and hit`yarn deploy`.

## Post-MVP

- [x] Authentication
- [x] ~~Rework authentication - consider pivoting to either frontend-driven or server-driven data fetching and auth, not both.~~
- [x] Restructure the lib/ folder
- [x] Per-user gallery
- [x] Eye-candy - Rework dashboard, header search page UI
- [ ] Eye-candy - Visual updates to photo cards etc.
- [ ] Eye-candy - Rework photo upload page UI
- [ ] Set up a basic landing page
- [ ] Photo bulk uploads
- [ ] Limit photo sizes to 50MB
- [x] Handle the case when the session cookie has expired. - just redirect the user to the /login page 4Head
- [ ] Photo folder structure
- [ ] Improve confidence score calculation by adding confidence score to the `Photo.tags` field
- [ ] Evaluate pricing costs
- [ ] Consider moving away from Google Cloud Vision and run image recognition on your own
- [ ] Add logging to backend and frontend logic.
- [ ] Explore other image tagging options ?

## Landing page & dashboard rework idea

Have photo skeletons show up on the server rendered app while the auth state and data are loading:

- In case the user hasn't signed in, fade in the landing page over skeleton loaders and start explaining what jazzguar is
- In case the user is authenticated, render photos in place of those skeletons
