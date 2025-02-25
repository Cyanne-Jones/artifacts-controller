require('dotenv').config();
const server = "https://api.artifactsmmo.com";
const token = process.env.TOKEN;

const character = "Flyanne";
  
async function movement() {

  console.log('Moving character...');
  console.log(token)
      
  const url = server + '/my/' + character +'/action/move';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: '{"x":0,"y":1}' //change the position here
  };
  
  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  }
  
movement();