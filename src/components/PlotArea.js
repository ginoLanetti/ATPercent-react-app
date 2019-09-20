import React from 'react'
import PlotStyle from '../styles/PlotStyle'
import { VictoryTheme, VictoryChart, VictoryLine, VictoryVoronoiContainer} from 'victory';


class PlotArea extends React.Component {
    constructor(){
        super();
        this.state = {
            data: [
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 4 },
                { x: 4, y: 7 },
                { x: 5, y: 11 }
              ]
        }
    }
    render(){
        return(
            <PlotStyle>
                <VictoryChart
                    theme={VictoryTheme.material}
                    width={600}
                    height={500}
                    containerComponent={
                        <VictoryVoronoiContainer labels={({ datum }) => `${datum.x}# bp, AT content:${datum.y}%`}/>
                    }
                >
                <VictoryLine 
                data={this.state.data} 
                style={{data: { stroke: "#c43a31" }}}
                animate={{duration: 100}} 
                interpolation="monotoneX" 
                />
                </VictoryChart>
            </PlotStyle>
        )
    }
}

export default PlotArea