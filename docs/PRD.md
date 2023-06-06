# jazzguar PRD

Author: @yugisu-flux

## Problem Statement

Storing, sorting and categorizing photos can sometimes feel overwhelming after even casual photoshoots. Finding photos of a specific subject scattered across different folders can be even more cumbersome at times.

## Solution

A photo storage service with emphasis on categorization with AI capabilities for automatic tag assignment and picture search. Do you have a photo of a cat? This tool should allow you to find it by searching "feline" or "kitty".

## Requirements

### P0

1. Upload a picture, manually assign tags (stored in the DB, not in the file metadata) to it. Upon uploading, the image is processed and assigned automatic tags in addition to manual
2. Gallery view with a searchbar
3. Search functionality which breaks down the search query into existing tags

### P1

1. Authentication, per-user gallery
2. Multiple photo upload
3. Folders structure
4. Switch to tools optimized for these specific use cases

### Future

1. Switch from photos to docs or wikis and apply the same tagging and search logic to these new objects
