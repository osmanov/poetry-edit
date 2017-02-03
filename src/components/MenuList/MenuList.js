import React from 'react';
import  styled  from 'styled-components';

const Wrapper = styled.ul`
    list-style-type: none;
    margin:0;
    padding:0;
    display:inline-flex;
    ${(props) => {
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
    isVisible: false
  }

  static propTypes = {
    axis: React.PropTypes.oneOf(['x','y']),
    volume: React.PropTypes.oneOf(['up','down']),
    children : React.PropTypes.any.isRequired,
    isVisible : React.PropTypes.bool
  }

  state={
    isVisible:this.props.isVisible
  }

  render() {
    const {children,...other} = this.props
    return (
      <Wrapper {...other}>
        {children}
      </Wrapper>
    );
  }
}


export default MenuList
