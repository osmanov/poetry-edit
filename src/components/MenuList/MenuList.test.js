/*
* axis:
*   whenX children are <--->
*   whenY children are:
*   ^
*   |
*   |
*   |
*   v
*
*
* */
import test from 'ava'
import { shallow } from 'enzyme';
import MenuList from './MenuList'

const children = (<li>Test</li>);
const renderComponent = (props = {}) => shallow(
  <MenuList {...props}>
    {children}
  </MenuList>
);

test('should render an <ul> tag', async t => {
  const renderedComponent = renderComponent();
  t.is(renderedComponent.type(), 'ul');
});
