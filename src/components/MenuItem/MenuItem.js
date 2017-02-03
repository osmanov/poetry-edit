import React from 'react';
import  styled  from 'styled-components';


const Label = styled.div`
    background:${props => props.isEdit ? 'red': ''}
`



const MenuItem = ({ children, onMouseDown, isEdit, label, className}) => (
  <li onMouseDown={onMouseDown} className={className}>
    <Label isEdit={isEdit}>
      {label}
    </Label>
    {children}
  </li>
)


MenuItem.propTypes = {
  label: React.PropTypes.any.isRequired,
  onMouseDown: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  children: React.PropTypes.element,
  isEdit: React.PropTypes.bool
}

export default MenuItem;

