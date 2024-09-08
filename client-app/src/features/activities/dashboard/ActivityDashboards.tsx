import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import Activitydetails from "../details/Activitydetails";
import ActivityForm from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import { UseStore } from "../../../app/stores/stores";

interface Props
{
    activities: Activity[]; 
    createoredit :(activity:Activity)=> void;
    deleteactivity:(id: string)=> void;
    submiting: boolean;
   
}
 function ActivityDashboard({activities , createoredit , deleteactivity,submiting}:Props){
    const {activityStore} = UseStore()
    const {selectedActivity , EditMode} = activityStore;
    return(
        <Grid>
            <Grid.Column width='10'>
        <ActivityList activities={activities} 
        deleteactivity={deleteactivity}
        submiting = {submiting}/>
            </Grid.Column>
            <Grid.Column width ='6'>
                {selectedActivity  && !EditMode &&
                <Activitydetails />}
              
            {EditMode && 
         
              <ActivityForm  activity ={selectedActivity}  createoredit={createoredit} />}
           
              
            </Grid.Column>
        </Grid>
    )
}
export default observer(ActivityDashboard);