import React from "react";
import PlotStyle from "../styles/PlotStyle";
import { curveCatmullRom } from "d3-shape";
import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineMarkSeries,
  Highlight,
  DiscreteColorLegend,
  Crosshair,
  FlexibleXYPlot
} from "react-vis";

class PlotArea extends React.Component {
  constructor(props) {
    super();
    this.state = {
      lastDrawLocation: null,
      crosshairValues: [],
      series: []
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.series !== this.props.series) {
      this.setState({ series: nextProps.series });
    }
  }
  _clickHandler = item => {
    const { series } = this.state;
    item.disabled = !item.disabled;
    this.setState({ series });
  };
  _onMouseLeave = () => {
    this.setState({ crosshairValues: [] });
  };
  _onNearestX = (value, { index }) => {
    const { series } = this.state;
    this.setState({ crosshairValues: series.map(entry => entry.data[index]) });
  };

  render() {
    const { series, lastDrawLocation } = this.state;
    return (
      <PlotStyle>
        <div
          className="chart no-select"
          onDragStart={function(e) {
            e.preventDefault();
          }}
        >
          <FlexibleXYPlot
            xDomain={
              lastDrawLocation && [
                lastDrawLocation.left,
                lastDrawLocation.right
              ]
            }
            yDomain={
              lastDrawLocation && [
                lastDrawLocation.bottom,
                lastDrawLocation.top
              ]
            }
            onMouseLeave={this._onMouseLeave}
            className="plotArea"
          >
            <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
            <VerticalGridLines style={{ stroke: "#B7E9ED" }} />
            <XAxis
              title="position"
              style={{
                line: { stroke: "#ADDDE1" },
                ticks: { stroke: "#ADDDE1" },
                text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
              }}
            />
            <YAxis
              title="AT content"
              style={{
                line: { stroke: "#ADDDE1" },
                ticks: { stroke: "#ADDDE1" },
                text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
              }}
            />

            {series.map(entry => (
              <LineMarkSeries
                curve={curveCatmullRom.alpha(0.5)}
                key={entry.title}
                data={entry.data}
                onNearestX={this._onNearestX}
                size={0}
                opacity={entry.disabled ? 0.2 : 1}
              />
            ))}
            <Highlight
              onBrushEnd={area => {
                this.setState({ lastDrawLocation: area });
              }}
            />
            <Crosshair
              values={this.state.crosshairValues}
              itemsFormat={values => {
                let items = [];
                for (let i = 0; i < values.length; i++) {
                  if (series[i].disabled === false) {
                    items.push({ title: series[i].title, value: values[i].y });
                  }
                }
                return items;
              }}
            />
          </FlexibleXYPlot>
        </div>
        <div className="legend">
          <DiscreteColorLegend
            onItemClick={this._clickHandler}
            width={100}
            items={series}
          />
        </div>
      </PlotStyle>
    );
  }
}
export default PlotArea;
