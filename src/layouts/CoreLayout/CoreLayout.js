import React from 'react'
import Header from '../../components/Header'
import styled,{ ThemeProvider } from 'styled-components';
import HoveringMenu from 'components/HoveringMenu'
import MenuInfinityContainer from 'containers/MenuInfinityContainer'

import EditorMenu from 'components/EditorMenu'
import ExampleMenu from 'components/ExampleMenu'
import './CoreLayout.css'


const provider = {
    className:'menuContainer',//<--set classname if you want
    volume:'up',
    axis:'x',
    items:[
      {
        label:<i className="fa fa-bold" aria-hidden="true"></i>,
        className:'item',
        mark:'bold'
      },
      {
        label:<i className="fa fa-italic" aria-hidden="true"></i>,
        className:'item',
        mark:'italic'
      },
      {
        label:<i className="fa fa-align-left" aria-hidden="true"></i>,
        className:'item',
        mark:'alignLeft',
        list:{
          className:'menuContainer2',//<--set classname if you want
          volume:'down',
          axis:'y',
          items:[{
            label:<i className="fa fa-align-center" aria-hidden="true"></i>,
            className:'item1',
            mark:'alignCenter'
          },
            {
              label:<i className="fa fa-align-right" aria-hidden="true"></i>,
              className:'item1',
              mark:'alignRight'
            }
          ]
        }
      },
      {
        label:<i className="fa fa-bookmark-o" aria-hidden="true"></i>,
        className:'item',
      },
      {
        label:<i className="fa fa-comment-o" aria-hidden="true"></i>,
        className:'item',
      },
      {
        label:<i className="fa fa-ellipsis-h" aria-hidden="true"></i>,
        className:'item',
      }

    ]
}

const schema = {
  marks: {
    bold: props => <strong>{props.children}</strong>,
    code: props => <code>{props.children}</code>,
    italic: props => <em>{props.children}</em>,
    alignLeft: props => <p style={{textAlign: 'left'}}>{props.children}</p>,
    alignCenter: props => <p style={{textAlign: 'center'}}>{props.children}</p>,
    alignRight: props => <p style={{textAlign: 'right'}}>{props.children}</p>,
  }
}

export const CoreLayout = ({ children }) => (
  <div className="container text-center">
    <Header />

    {/*<EditorMenu provider={provider} schema={schema} />*/}
    {<ExampleMenu schema={schema}/>}

    <div className="core-layout__viewport">
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
}

export default CoreLayout
