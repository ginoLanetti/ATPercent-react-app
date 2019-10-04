import React from "react";
import AppStyle from "../styles/AppStyle";
import Header from "./Header";
import InputArea from "./InputArea";
import PlotArea from "./PlotArea";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      series: []
    };
    this.getData = this.getData.bind(this);
  }
  getData(val) {
    this.setState({ series: val });
  }
  render() {
    return (
      <AppStyle>
        <Header />
        <InputArea sendData={this.getData} />
        <PlotArea series={this.state.series} />
      </AppStyle>
    );
  }
}

export default App;
