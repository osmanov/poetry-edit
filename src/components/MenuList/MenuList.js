import React from 'react';
import  styled  from 'styled-components';
//display:${ props => props.isHidden ? 'inline-flex' : 'none'};
//display:${props=>props.isHidden?'none':'inline-flex'}
//visibility:${props=>props.isHidden?'hidden':'visible'}
const Wrapper = styled.ul`
    list-style-type: none;
    margin:0;
    padding:0;
    display:'inline-flex';
    visibility:${props=>props.isHidden?'hidden':'visible'};
    ${(props) => {
  console.log('---'+props.isHidden+'----')
      let direction=''
      const isAxisX=props.axis === 'x'
      const isVolumeUp=props.volume === 'up'
      if(isAxisX){
        direction= isVolumeUp ? 'row' : 'row-reverse'
      }else{
        direction= isVolumeUp ? 'column-reverse' : 'column'
      }
      return `flex-direction:${direction}`
    }}
`

class MenuList extends React.Component {
  static defaultProps = {
    axis:'x',
    volume:'up',
    isHidden: false
  }

  static propTypes = {
    axis: React.PropTypes.oneOf(['x','y']),
    volume: React.PropTypes.oneOf(['up','down']),
    children : React.PropTypes.any.isRequired,
    isHidden : React.PropTypes.bool
  }

  state={
    isHidden:this.props.isHidden
  }

  render() {
    const {children,...other} = this.props
    console.log(other.isHidden)
    return (
      <Wrapper {...other}>
        {children}
      </Wrapper>
    );
  }
}


export default MenuList
