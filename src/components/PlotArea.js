import React from 'react'
import PlotStyle from '../styles/PlotStyle'
import {curveCatmullRom} from 'd3-shape'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineMarkSeries, Hint} from 'react-vis'

class PlotArea extends React.Component {
    constructor(){
        super();
        this.state = {
            value: null,
            data: [
                {x: 0, y: 8},
                {x: 1, y: 5},
                {x: 2, y: 4},
                {x: 4, y: 1},
                {x: 4.02, y: 1},
                {x: 6, y: 6},
                {x: 7, y: 3},
                {x: 8, y: 2},
                {x: 9, y: 0},
              ]
        }
    }
    forgetValue = () => {
      this.setState({
        value: null
      });
    };
  
    rememberValue = value => {
      this.setState({value});
    };
    render(){
        const {value} = this.state;
        return(
            <PlotStyle>
              <XYPlot width={1000} height={500} className="plotArea">
                <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
                <VerticalGridLines style={{stroke: '#B7E9ED'}} />
                <XAxis
                  title="position"
                  style={{
                    line: {stroke: '#ADDDE1'},
                    ticks: {stroke: '#ADDDE1'},
                    text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                  }}
                />
                <YAxis title="AT content" />
                <LineMarkSeries
                  curve={curveCatmullRom.alpha(0.5)}
                  data={this.state.data}
                  onNearestXY={this.rememberValue}
                  size={1}
                />
                {value ? <Hint value={value} /> : null}
              </XYPlot>
            </PlotStyle>
        )
    }
}

export default PlotArea