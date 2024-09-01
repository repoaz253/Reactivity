
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';


function App() {

  //use hook for activities [acyivity,func]
  const [activities, setActivities] = useState([]);
  //useeffect--getdata--.returns type promise of type axios
  //then respose setActivities 
  useEffect(()=>{
    axios.get('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data)
    })
  },[])

  return (
    <div>
  <Header as ='h1' icon='users' color='blue' content='Reactivities'></Header>
    <List> {
      activities.map((activity:any) => (
        <li key ={activity.id}>
          {activity.title}
        </li>
      ))}
      </List>
   
    </div>
  )
}

export default App
