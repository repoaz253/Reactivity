import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import Activitydetails from "../details/Activitydetails";
import ActivityForm from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import { UseStore } from "../../../app/stores/stores";


export default observer(function ActivityDashboard(){
    const {activityStore} = UseStore()
    const {selectedActivity , editMode } = activityStore;
    return(
        <Grid>
            <Grid.Column width='10'>
        <ActivityList />
            </Grid.Column>
            <Grid.Column width ='6'>
                {selectedActivity  && !editMode &&
                <Activitydetails />}
              
            { activityStore.editMode && 
              <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
}
)