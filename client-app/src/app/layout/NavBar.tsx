import React from "react";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import { UseStore } from "../stores/stores";
import { observer } from "mobx-react-lite";

export default observer(function NavBar(){
    const {activityStore} = UseStore();
    const {formOpen} = activityStore;

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
                <Button onClick={() => formOpen()} positive content="Create Activity"></Button>
                  </Menu.Item>
        </Container>
    </Menu>



    )

}
)