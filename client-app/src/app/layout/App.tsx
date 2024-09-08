
import { Fragment, useEffect, useState } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboards';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { UseStore } from '../stores/stores';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = UseStore(); //Access activityStore here

  //use hook for activities [acyivity,func]
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
  const [editMode , setEditMode] = useState(false);
  const [submitting , setSubmitting] = useState(false);

  //useeffect--getdata--.returns type promise of type axios
  //then respose setActivities 
  useEffect(()=>{
        activityStore.loadactivities();
  
  },[activityStore])



  //func handleselectedactivity
  function handleselectedactivity(id: string)
  { 
    setSelectedActivity(activities.find(x=>x.id === id));
  }


  ////func handlecancelselectedactivity
  function handlecancelselectedactivity()
  {
    setSelectedActivity(undefined);

  }
  //setSelectedActivity(undefined)

  function handleCreateOrEditActivity(activity:Activity)
  {
    setSubmitting(true);
    if(activity.id){
        agent.Activities.update(activity).then(()=>
        {
          setActivities([...activities.filter(x=>x.id!==activity.id),activity ])
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);
        })
      }
        else{
          activity.id = uuid();
          agent.Activities.create(activity).then(() =>
          {
            setActivities([...activities , {...activity , id: uuid()}]);
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false);
          })
        }
    }
  

 function handledeleteactivity(id:string)
 {
  setSubmitting(true);
  agent.Activities.delete(id).then(()=>
  { 
    setActivities([...activities.filter(x => x.id !==id)]);
    setSubmitting(false);
  })
  setActivities([...activities.filter(x=>x.id!==id)])
 }

 if (activityStore.loadingInitial) return <LoadingComponent content = 'LoadingApplication'/>

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
       
       
    <ActivityDashboard 
    activities={activityStore.activities}
    deleteactivity = {handledeleteactivity}
    submiting ={submitting}/>
        
      </Container>
   
    </Fragment>
  )
}

export default observer(App);
