import React from 'react';
import  styled  from 'styled-components';
//display:${ props => props.isHidden ? 'inline-flex' : 'none'};
//display:${props=>props.isHidden?'none':'inline-flex'}
//visibility:${props=>props.isHidden?'hidden':'visible'}
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

class MenuList extends React.Component {
  static defaultProps = {
    axis:'x',
    volume:'up',
    root:false
  }

  static propTypes = {
    axis: React.PropTypes.oneOf(['x','y']),
    volume: React.PropTypes.oneOf(['up','down']),
    children : React.PropTypes.any.isRequired,
    isHidden : React.PropTypes.bool.isRequired,
    root : React.PropTypes.bool
  }

  componentDidMount() {
    console.log(this.props.root)
    const {axis,volume,root}=this.props
    if(!root){
      const parentCoords = this._list.parentElement.getBoundingClientRect()

      if(axis==='x'){
        if(volume==='down'){
          this._list.style.top = 0
          this._list.style.left = `${- this._list.offsetWidth}px`
        }
      }

      console.log(this._list)
     // debugger
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


export default MenuList
