require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/recycle.js code=copper num=10 character=Flyanne`
  
const recycle = async () => {

  const args = process.argv

  const code = args.find(arg => arg.startsWith("code="))?.split('=')[1]
  const num = args.find(arg => arg.startsWith("num="))?.split('=')[1]

  if (!code && !num) {
    console.log('😱 Oh no! No code and/or quantity provided')
    return 
  }
  
  const body = {
    code,
    quantity: num
  }
  
  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER 

  console.log(`✨ Recycling ${num} item(s): ${code} ✨`)
      
  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/recycle`

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
      throw new Error('😱 Oh no! Failed to recycle item')
    }
    const { data } = await response.json();
    console.log('✅ Recycle successful!')
  } catch (error) {
    console.log({ error })
  }
}
  
recycle()