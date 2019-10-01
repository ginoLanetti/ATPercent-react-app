import React from 'react'
import InputStyle from '../styles/InputStyle'

class InputArea extends React.Component {
    constructor(){
        super();
        this.state = {
            seqsArray: [],
            labelsArray: [],
            windowWidth: 0,
            stepLength: 0,
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }
    render(){
        return(
            <InputStyle>
                <label>
                    Window width (bp)
                    <br/>
                    <input 
                        type="text" 
                        name="windowWidth" 
                        value={this.state.windowWidth} 
                        onChange={this.handleChange}   
                    />
                </label>
                <br/>
                <label>
                    Step length (bp)
                    <br/>
                    <input 
                        type="text" 
                        name="stepLength" 
                        value={this.state.stepLength} 
                        onChange={this.handleChange}   
                    />
                </label>
            </InputStyle>
        )
    }
}

export default InputArea