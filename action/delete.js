require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/delete.js code=copper num=10 character=Flyanne`
  
const deleteItem = async () => {

  const args = process.argv

  const code = args.find(arg => arg.startsWith("code="))?.split('=')[1]
  const num = args.find(arg => arg.startsWith("num="))?.split('=')[1]

  if (!code && !num) {
    console.log('😱 Oh no! No code and/or quantity provided')
    return 
  }
  
  const body = JSON.stringify({
    code,
    quantity: parseInt(num)
  })

  console.log({ body })
  
  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER 

  console.log(`✨ Deleting ${num} item(s): ${code} ✨`)
      
  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/delete`

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
      throw new Error('😱 Oh no! Failed to delete item')
    }
    const { data } = await response.json();
    console.log('✅ Delete successful!')
  } catch (error) {
    console.log({ error })
  }
}
  
deleteItem()