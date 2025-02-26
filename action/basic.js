require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/basic.js a=rest character=Flyanne`

// a = rest | gathering | fight

// you can also run these without character the name arg with `npm run gather`, `npm run fight`, and `npm run rest`

const basic = async () => {

  args = process.argv

  let action = args.find(arg => arg.startsWith("a=")).split('=')[1] || "rest"
  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER 

  console.log('Performing action:', action)

  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/${action}`
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
  } catch (error) {
    console.log({ error })
  }
}

basic()