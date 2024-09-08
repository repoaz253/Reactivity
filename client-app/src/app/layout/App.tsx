
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
 

  //useeffect--getdata--.returns type promise of type axios
  //then respose setActivities 
  useEffect(()=>{
        activityStore.loadactivities();
  },[activityStore])

 if (activityStore.loadingInitial) return <LoadingComponent content = 'LoadingApplication'/>

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
       
    <ActivityDashboard />
      </Container>
   
    </Fragment>
  )
}

export default observer(App);
