import React from 'react';
import  styled  from 'styled-components';


const Wrapper = styled.li`
    position:relative;
    cursor:pointer;
`



class MenuItem extends React.Component {

  state={
    //children:this.props.children || null
    show:false
  }

  _onMouseEnter=()=>{
    console.log('ENTER')
    this.setState({
      show:true
    })
  }

  _onMouseLeave=()=>{
//TODO from here parent siblings should listen
    this.setState({
    //  show:false
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('-------')
    console.log('next-->'+nextState.show)
    console.log('this-->'+this.state.show)
    console.log('-------')
    return !(nextState.show===this.state.show)
  }

  render() {
    const { onMouseDown, label, className} = this.props

    return (
      <Wrapper onMouseDown={onMouseDown} onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} className={className}>
        <div>
          {label}
        </div>
        {this.state.show && this.props.children}
      </Wrapper>
    );
  }
}


MenuItem.propTypes = {
  label: React.PropTypes.any.isRequired,
  onMouseDown: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  children: React.PropTypes.element,
}

export default MenuItem;

