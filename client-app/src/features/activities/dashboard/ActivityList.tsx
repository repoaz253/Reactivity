import { Button, Item, Label, List, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    activities: Activity[];
    selectActivity : (id:string) => void ;
    deleteactivity:(id: string)=> void;
}

export default function ActivityList({activities , selectActivity,deleteactivity}: Props)
    {
        return (
            <Segment>
                <Item.Group divided>
                     {
                activities.map(activity => (
                  <Item key ={activity.id}>
                    <Item.Content>
                <Item.Header as ='a'>{activity.title}</Item.Header> 
                   <Item.Meta>{activity.date}</Item.Meta>
                   <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.city},{activity.venue}</div>
                    </Item.Description>
                    <Item.Extra>
              
                         <Button onClick={()=> selectActivity(activity.id)} floated='right' content='View' color='purple'/>
                         <Button onClick={()=> deleteactivity(activity.id)} floated='right' content='Delete' color='red'/>
                         <Label content={activity.category}/> 
                      
                    </Item.Extra>

                    </Item.Content>
                 </Item>
                ))}
            
                </Item.Group>
            </Segment>
        )

    }
