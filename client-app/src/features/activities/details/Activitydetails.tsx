import React, { act } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Image } from "semantic-ui-react";
import { UseStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";



export default observer(function Activitydetails()
{
  const {activityStore} = UseStore();
  const {selectedActivity : activity , formOpen , cancelActivity } = activityStore;

if(!activity)  return;
    return (
        <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} alt={activity.category}/>
    <CardContent>
      <CardHeader>{activity.title}</CardHeader>
      <CardMeta>
        <span >{activity.date}</span>
      </CardMeta>
      <CardDescription>
       {activity.description}
      </CardDescription>
    </CardContent>
    <CardContent extra>
    <Button.Group widths ='2'>
    <Button onClick = {() => formOpen(activity.id)} basic color='blue' content='Edit'/>
      <Button onClick = {() => cancelActivity} basic color='grey' content='Cancel' />
     
    </Button.Group>
    </CardContent>
  </Card>
    )
})