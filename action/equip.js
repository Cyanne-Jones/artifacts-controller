require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/equip.js code=wooden_staff slot=weapon character=Flyanne`

// code = snake case item code, see docs for full list
// slot = helmet | weapon | shield | body_armor | leg_armor | boots | ring1 | ring2 | amulet | artifact1 | artifact2 | artifact3 | utility1 | utility2 | bag | rune
  
async function equip() {

  const args = process.argv

  const codeArg = args.find(arg => arg.startsWith("code="))?.split('=')[1]
  const slot = args.find(arg => arg.startsWith("slot="))?.split('=')[1] || "weapon"

  if (!codeArg && !slot) {
    console.log('No item code or slot provided')
    return 
  }

  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER
  const body = `{ "code": "${codeArg}", "slot": "${slot}" }`


  console.log(`Equipping item with code ${codeArg} to ${slot} slot...`)
      
  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/equip`

  console.log({url})

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN
    },
    body
  }
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log({ response })
      throw new Error('Failed to equip item')
    }
    const { data } = await response.json();
    console.log('Equipping successful:', { data })
  } catch (error) {
    console.log({ error })
  }
}
  
equip()