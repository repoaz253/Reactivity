
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';


function App() {

  //use hook for activities [acyivity,func]
  const [activities, setActivities] = useState<Activity[]>([]);
  //useeffect--getdata--.returns type promise of type axios
  //then respose setActivities 
  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data)
    })
  },[])

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
      
    <List> {
      activities.map(activity => (
        <List.Item key ={activity.id}>
          {activity.title}
       </List.Item>
      ))}
      </List>
        
      </Container>
   
    </Fragment>
  )
}

export default App
