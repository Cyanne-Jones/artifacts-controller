

require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env
// run this with `node loop/basic.js a=rest count=5 character=Flyanne`

// a = rest | gathering | fight

// there's some npm scripts I added to package.json for this also to make loops easier for default characters!

const basicActionHTTPRequest = async ({action, character}) => { 
  const url = `${API_BASE_URL}/my/${character}/action/${action}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN
    },
    // no body needed for basic actions
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log({ response })
      throw new Error('Failed to perform action')
    }
    const { data } = await response.json();
    console.log('Action successful:', { data })
    return data
  } catch (error) {
    console.log({ error })
  }
}

const recursiveBasic = async () => {

  args = process.argv

  const action = args.find(arg => arg.startsWith("a=")).split('=')[1] || "rest"
  const actionCount = args.find(arg => arg.startsWith("count="))?.split('=')[1] || 1
  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER 

  console.log(`Performing recursive action: ${action} for ${actionCount} times`)

  try {
    for (let i = 0; i < actionCount; i++) { 
      console.log(`Performing action ${i + 1} of ${actionCount}`)

      const { cooldown } = await basicActionHTTPRequest({action, character: parsedCharacter})

      // only cooldown if there are more actions to perform
      if (i + 1 < actionCount )  {
        console.log(`${cooldown.total_seconds}s cooldown time from ${action} action, ${actionCount - (i + 1)} remaining`)
        await new Promise(resolve => setTimeout(resolve, cooldown.total_seconds * 1000))
      }
    }
    console.log('All actions completed')
  } catch (error) {
    console.log({ error })
  }
}

recursiveBasic()