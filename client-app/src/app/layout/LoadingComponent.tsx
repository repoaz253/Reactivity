import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

//interface inc inverted and content 
interface Props{
    inverted? : true,
    content?: string
}

export default function LoadingComponent({inverted=true,content = 'Loading..' }:Props)
{ return(
    <Dimmer active={true} inverted ={inverted}>
        <Loader content ={content}/>
    </Dimmer>
)
}

