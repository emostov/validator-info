# @zekemostov/validator-info [WIP]
A CLI tool for quickly getting info about validators from a substrate based chain.

## Getting started

**Note:** In the future this will be available as an NPM package, but for now it must be used by cloning the repo.

1) Install deps: `yarn install`

2) Locally install the CLI bin and start up with help menu: `yarn local`

3) Use the cli: `val-info -noms HngUT2inDFPBwiey6ZdqhhnmPKHkXayRpWw9rFj55reAqvi` which should output something like
      ```bash
      {
        nominators: [
          {
            nominatorId: 'H9eSvWe34vQDJAWckeTHWSqSChRat8bgKHG39GC1fjvEm7y',
            active: '562000076508465'
          },
          {
            nominatorId: 'GnL41mJJJTp9npr1W9wLMzEfFL4thqyjPt6hwxLirmJt5vQ',
            active: '2780482535861780'
          },
          {
            nominatorId: 'Dab4bfYTZRUDMWjYAUQuFbDreQ9mt7nULWu3Dw7jodbzVe9',
            active: '5917616159137933'
          },
          {
            nominatorId: 'DPs2tExwULx8tRc2N7ECrWTzrPhbdVBApLVDiugkusaVH8Q',
            active: '2236157721572278'
          },
          {
            nominatorId: 'EG4LPxwtrFfXvMg2ZBK2mcdCVcV7ByoLkkpveFcxNZ6LXnP',
            active: '2500000000000000'
          }
        ],
        nominatorsActiveSum: '13996256493080456'
      }
      ```

