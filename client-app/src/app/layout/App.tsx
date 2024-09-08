
import { Fragment, useEffect, useState } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboards';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { UseStore } from '../stores/stores';
import ActivityStore from '../stores/activitystores';
import { observer } from 'mobx-react-lite';

function App() {
    const {activityStore} = UseStore();
  //use hook for activities [acyivity,func]
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
  const [editMode , setEditMode] = useState(false);
  const [loading , setLoading] = useState(true);
  const [submitting , setSubmitting] = useState(false);

  //useeffect--getdata--.returns type promise of type axios
  //then respose setActivities 
  useEffect(()=>{
    agent.Activities.list().then(response =>{
      let activities : Activity[] = [];
      response.forEach(activity =>{
        
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
  },[])



  function handleFormOpen(id?: string)
  {
    id ?  handleselectedactivity(id) : handlecancelselectedactivity();
    setEditMode(true);
  }

  function handleFormClose()
  {
    setEditMode(false);
  }
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

 if (loading) return <LoadingComponent content = 'LoadingApplication'/>

  return (
    <Fragment>
      <NavBar openForm ={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
       
       
    <ActivityDashboard 
    activities={activities}
    
    selectedActivity = {selectedActivity}
    selectActivity = {handleselectedactivity}
    cancelActivity = { handlecancelselectedactivity}
    editMode ={editMode}
    formOpen = {handleFormOpen}
    formClose ={handleFormClose}
    createoredit = {handleCreateOrEditActivity}
    deleteactivity = {handledeleteactivity}
    submiting ={submitting}
    
    />
        
      </Container>
   
    </Fragment>
  )
}

export default observer(App);
