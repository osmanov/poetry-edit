import React from 'react';
import { styled } from 'styled-components';

const MenuList = styled.ul`
    list-style-type: none;
    
    /* Adjust the background from the properties */
    background: ${(props) => props.background};

    /* Adapt based on the theme set in a parent ThemeProvider */
    border: ${(props) => props.theme.main}
`


MenuList.defaultProps = {
  axis:'x',
  direction:'plus'
}

MenuList.propTypes = {
  axis: React.PropTypes.oneOf(['x','y','X','Y']),
  direction: React.PropTypes.oneOf(['plus','minus']),
  children : React.PropTypes.any.isRequired
}

export default MenuList;
