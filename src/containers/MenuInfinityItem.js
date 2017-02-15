import React from 'react'
import  styled  from 'styled-components'


const Wrapper = styled.li`
    position:relative;
    cursor:pointer;
`

class MenuItem extends React.Component {

  render() {
    const { item, className} = this.props

    return (
      <Wrapper data-item-id={item.id} data-list-id={item.listId} className={className}>
        <div>
          {item.label}
        </div>
        {this.props.children}
      </Wrapper>
    );
  }
}


MenuItem.propTypes = {
  className: React.PropTypes.string,
  item: React.PropTypes.object.isRequired,
  children: React.PropTypes.element,
}

export default MenuItem;

