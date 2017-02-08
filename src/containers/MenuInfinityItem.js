import React from 'react'
import  styled  from 'styled-components'


const Wrapper = styled.li`
    position:relative;
    cursor:pointer;
`



class MenuItem extends React.Component {

  _onMouseLeave=(e)=>{

  }


  render() {
    const { onMouseEnter, item, className} = this.props

    return (
      <Wrapper onMouseEnter={() => onMouseEnter(item)} onMouseLeave={this._onMouseLeave} className={className}>
        <div>
          {item.item.label}
        </div>
        {this.props.children}
      </Wrapper>
    );
  }
}


MenuItem.propTypes = {
  onMouseEnter: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  item: React.PropTypes.object.isRequired,
  children: React.PropTypes.element,
}

export default MenuItem;

