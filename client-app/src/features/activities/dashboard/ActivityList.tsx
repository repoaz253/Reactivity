import { Button, Item, Label, List, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { UseStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";

 function ActivityList()
    {
        const {activityStore} = UseStore();
        
        const [Target, setTarget] = useState('');

        const {deleteActivity , activities , loading} = activityStore;

        function handleActivitydelete(e:SyntheticEvent<HTMLButtonElement>, id:string)
        {
            setTarget(e.currentTarget.name);
            deleteActivity(id);

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
                          loading={loading && Target === activity.id} 
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
    export default observer(ActivityList);