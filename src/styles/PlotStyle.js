import styled from 'styled-components'

const PlotStyle = styled.div`
  width: 100%;
  height: 33vh;
  display: block;
  .chart{
    width: 75%;
    height: 100%;
    display: inline-block;
  }
  .legend{
    width: 25%;
    display: inline-block;
    vertical-align: top;
  }
  @media (max-width: 768px){
    .chart{
      width: 100%;
    }
    .legend{
      display: block;
      margin: 0 auto;
    }
`
export default PlotStyle