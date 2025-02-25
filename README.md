# Artifacts Controller
### Basic JS controller for [Artifacts MMORPG](https://www.artifactsmmo.com/)

Use `.env.example` to populate a `.env` file with your token and character name, but the `API_BASE_URL` can stay the same
Run `npm i` in root to install dependencies

Call different functions from the CLI, each endpoint can take in a character name to override the one in the `.env` file easily.
Commands might look like `node action/move.js character=Fart x=2 y=1`, but each different file should have an example at the top of how it might be used! 

Actions supported so far:
- Move (`x` and`y` args)
- Basic POST actions without an HTTP body:
  - Rest
  - Gathering
  - Fight
- Crafting (item `code` arg)
- Unequip (`slot` arg)
- Equip (item `code` and `slot` args)

Have funnnnnnnn 
