import React from 'react';
import  styled  from 'styled-components'

const Wrapper = styled.ul`
    position:absolute;
    list-style-type: none;
    margin:0;
    padding:0;
    display:${props=>props.isHidden?'none':'inline-flex'};
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

class MenuInfinityList extends React.Component {
  static defaultProps = {
    axis:'x',
    volume:'up',
    root:false
  }

  static propTypes = {
    axis: React.PropTypes.oneOf(['x','y']),
    volume: React.PropTypes.oneOf(['up','down']),
    children : React.PropTypes.any.isRequired,
    root : React.PropTypes.bool
  }

  componentDidMount() {
    const {axis,volume,root}=this.props
    
    if(!root){
     // debugger

      if(axis==='x'){
        if(volume==='down'){
          this._list.style.top = 0
          this._list.style.left = `${- this._list.offsetWidth}px`
        }
        if(volume==='up'){
          this._list.style.top = 0
          this._list.style.left = `${this._list.parentElement.offsetWidth}px`
        }
      }else if(axis==='y'){
        if(volume==='down'){
          this._list.style.top =  `${this._list.parentElement.offsetHeight}px`
          this._list.style.left = '-1px'
        }
        if(volume==='up'){
          this._list.style.top =  `${- this._list.offsetHeight}px`
          this._list.style.left = 0
        }
      }
    }
  }

  render() {
    const {children,...other} = this.props
    return (
      <Wrapper innerRef={comp => { this._list = comp }} {...other}>
        {children}
      </Wrapper>
    );
  }
}


export default MenuInfinityList
