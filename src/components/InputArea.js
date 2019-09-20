import React from 'react'
import InputStyle from '../styles/InputStyle'

class InputArea extends React.Component {
    constructor(){
        super();
        this.state = {
            seqsArray: [],
            labelsArray: [],
            window: 0,
            step: 0,
        }
    }
    render(){
        return(
            <InputStyle>
                Siema siema
            </InputStyle>
        )
    }
}

export default InputArea