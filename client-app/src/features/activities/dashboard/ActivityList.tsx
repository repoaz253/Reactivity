import { Button, Item, Label, List, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { SyntheticEvent, useState } from "react";
import { UseStore } from "../../../app/stores/stores";

interface Props{
    activities: Activity[];
    deleteactivity:(id: string)=> void;
    submiting : boolean;
}

export default function ActivityList({activities , deleteactivity, submiting}: Props)
    {
        const {activityStore} = UseStore();
        
        const [Target, setTarget] = useState('');

        function handleActivitydelete(e:SyntheticEvent<HTMLButtonElement>, id:string)
        {
            setTarget(e.currentTarget.name);
            deleteactivity(id);

        }
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
              
                         <Button onClick={()=> activityStore.selectActivity(activity.id)} floated='right' content='View' color='purple'/>
                         <Button
                          name ={activity.id} 
                          loading={submiting && Target === activity.id} 
                          onClick={(e)=>handleActivitydelete(e, activity.id)}
                           floated='right' 
                           content='Delete' 
                           color='red'/>
                         <Label content={activity.category}/> 
                      
                    </Item.Extra>

                    </Item.Content>
                 </Item>
                ))}
            
                </Item.Group>
            </Segment>
        )

    }
