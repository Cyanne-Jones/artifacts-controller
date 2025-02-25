require('dotenv').config()
const { TOKEN, API_BASE_URL } = process.env
  
async function movement() {

  const args = process.argv

  // Assign movement location / name here or in CLI command
  const xCoordinate = args.find(arg => arg.startsWith("x=")).split('=')[1] || 0
  const yCoordinate = args.find(arg => arg.startsWith("y=")).split('=')[1] || 0
  const character = args.find(arg => arg.startsWith("character="))?.split('=')[1] || "Flyanne"

  const newLocation = `{ "x": ${xCoordinate}, "y": ${yCoordinate}}`

  console.log('Moving character to new location:', newLocation)
      
  const url = `${API_BASE_URL}/my/${character}/action/move`
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN
    },
    body: newLocation
  }
  
  try {
    const response = await fetch(url, options);
    console.log({ response })
    if (!response.ok) {
      throw new Error('Failed to move character')
    }
    const { data } = await response.json();
    console.log({ data })
  } catch (error) {
    console.log({ error })
  }
}
  
movement()