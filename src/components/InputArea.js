import React from "react";
import InputStyle from "../styles/InputStyle";
import {
  returnSequences,
  returnLabels,
  returnATPercentDataSeries
} from "./PlotLogic";

class InputArea extends React.Component {
  constructor(props) {
    super();
    this.state = {
      seqsArray: [],
      labelsArray: [],
      windowWidth: 0,
      stepLength: 0,
      series: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.fileInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: Number(value)
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    let file = this.fileInput.current.files[0];
    if (file.type.match(/text.*/)) {
      let reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        this.setState(
          {
            seqsArray: returnSequences(fileContent),
            labelsArray: returnLabels(fileContent)
          },
          () =>
            this.props.sendData(
              returnATPercentDataSeries(
                this.state.seqsArray,
                this.state.stepLength,
                this.state.windowWidth,
                this.state.labelsArray,
                this.state.seqsArray.length
              )
            )
        );
      };
      reader.readAsText(file);
    } else {
      alert(
        "File not supported!\nTip: Try changing uploaded file's extension to .txt"
      );
    }
  }
  render() {
    return (
      <InputStyle>
        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file
            <br />
            <input type="file" ref={this.fileInput} />
          </label>
          <br />
          <label>
            Window width (bp)
            <br />
            <input
              type="text"
              name="windowWidth"
              value={this.state.windowWidth}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Step length (bp)
            <br />
            <input
              type="text"
              name="stepLength"
              value={this.state.stepLength}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </InputStyle>
    );
  }
}

export default InputArea;
