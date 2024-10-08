import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { UseStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm()
{
    const {activityStore} = UseStore();
    const {selectedActivity ,formClose , updateactivity , createActivity , loading  } = activityStore;

        const initialState = selectedActivity ?? {
            id : ' ',
            title: ' ',
            date: ' ',
            description: ' ',
            category: ' ',
            city: ' ',
            venue: ' '

        }
     
       const [activity , setActivity] = useState(initialState);

        function handleSubmit()
        {
           activity.id ? updateactivity(activity) : createActivity(activity);
        }

       function handleInputChange(event: ChangeEvent<HTMLInputElement>){
           
        const{name , value } = event.target;
        setActivity({...activity, [name]: value})

       }

    return(
        <Segment clearing>
        <Form onSubmit={handleSubmit}>
            <Form.Input placeholder = 'Title'  value={activity.title || undefined} name = 'title'    onChange={handleInputChange} />
            <Form.Input placeholder = 'Description' value={activity.description}  name = 'description'   onChange={handleInputChange}/>
            <Form.Input placeholder  = 'Category' value={activity.category} name = 'category' onChange={handleInputChange}/>
            <Form.Input placeholder  = 'Date' value={activity.date} name = 'date' onChange={handleInputChange}/>
            <Form.Input placeholder  = 'City' value={activity.city} name = 'city' onChange={handleInputChange}/>
            <Form.Input placeholder  = 'Venue' value={activity.venue} name = 'venue' onChange={handleInputChange}/>
            <Button loading = {loading} floated="right" positive type="submit" content="Submit" />
            <Button onClick= {formClose} floated="right" type="button" content="cancel" />
        </Form>
    </Segment>
    )
   
})
