import React from 'react';
import AppStyle from '../styles/AppStyle'
import Header from './Header'
import InputArea from './InputArea'
import PlotArea from './PlotArea'

class App extends React.Component {
  render(){
      return(
        <AppStyle>
          <Header />
          <InputArea />
          <PlotArea />
        </AppStyle>
      )
    }
}

export default App;
