import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import Activitydetails from "../details/Activitydetails";
import ActivityForm from "../form/ActivityForm";

interface Props
{
    activities: Activity[]; 
    selectedActivity : Activity | undefined; 
    selectActivity : (id:string) => void ;
    cancelActivity : () => void ;
    editMode: boolean;
    formOpen : (id: string) => void; 
    formClose: () => void 
    createoredit :(activity:Activity)=> void;
    deleteactivity:(id: string)=> void;
}
export default function ActivityDashboard({activities,selectedActivity,selectActivity , cancelActivity , formOpen , formClose, editMode, createoredit , deleteactivity}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
        <ActivityList activities={activities} 
        selectActivity={selectActivity}
        deleteactivity={deleteactivity}/>
            </Grid.Column>
            <Grid.Column width ='6'>
                {selectedActivity  && !editMode &&
                <Activitydetails activity = {selectedActivity}
                 cancelActivity={cancelActivity}
                 formOpen ={formOpen} />}
              
            {editMode && 
         
              <ActivityForm  formClose = {formClose}  activity={selectedActivity} createoredit={createoredit} />}
           
              
            </Grid.Column>
        </Grid>
    )
}