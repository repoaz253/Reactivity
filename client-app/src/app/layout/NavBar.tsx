import React from "react";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import { UseStore } from "../stores/stores";

export default function NavBar(){
    const {activityStore} = UseStore();
    return(
    
        <Menu inverted fixed='top'>
            <Container>
            <Menu.Item header>
                <img src = "/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                Reactivities
            </Menu.Item>
             <Menu.Item>
            <Menu.Item name='Activities'/>
            </Menu.Item>
             
            <Menu.Item>
                <Button onClick={() => activityStore.FormOpen} positive content="Create Activity"></Button>
                  </Menu.Item>
        </Container>
    </Menu>



    )

}