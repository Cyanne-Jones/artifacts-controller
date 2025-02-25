require('dotenv').config();
const server = "https://api.artifactsmmo.com";
const token = process.env.TOKEN;

const character = "Flyanne";
  
async function movement() {

  const args = process.argv

  const xCoordinate = args.find(arg => arg.startsWith("x=")).split('=')[1];
  const yCoordinate = args.find(arg => arg.startsWith("y=")).split('=')[1];

  const newLocation = (xCoordinate && yCoordinate) ? `{ "x": ${xCoordinate}, "y": ${yCoordinate}}` : '{ "x": 0, "y": -2 }';

  console.log('Moving character to new location:', newLocation);
      
  const url = server + '/my/' + character +'/action/move';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: newLocation
  };
  
  try {
    const response = await fetch(url, options);
    console.log({ response })
    if (!response.ok) {
      throw new Error('Failed to move character');
    }
    const { data } = await response.json();
    console.log({ data });
  } catch (error) {
    console.log({ error });
  }
  }
  
movement();