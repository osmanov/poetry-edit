import React from 'react'
import Header from '../../components/Header'
import styled,{ ThemeProvider } from 'styled-components';
import HoveringMenu from 'components/HoveringMenu'

import EditorMenu from 'components/EditorMenu'
import './CoreLayout.css'



const provider = {
    className:'menuContainer',//<--set classname if you want
    volume:'up',
    axis:'x',
    items:[


      {
        label:<span>SUBMIT&nbsp;</span>,
        className:''
      },

      {
        label:<span>PRESSI&nbsp;</span>,
        className:'',
        list:{
          className:'menuContainer',//<--set classname if you want
          volume:'down',
          axis:'y',
          items:[{
            label:<i className="fa fa-italic" aria-hidden="true"></i>,
            className:'',
            mark:'italic',
            list:{
              volume:'up',
              axis:'x',
              className:'menuContainer',
              items:[
                {
                  label:<span>SUB_ITALIC_1&nbsp;</span>,
                  className:'',

                },
                {
                  label:<span>SUB_ITALIC_2&nbsp;</span>,
                  className:'',
                  list:{
                    volume:'up',
                    axis:'y',
                    items:[
                      {
                        label:<span>LUSHA&nbsp;</span>,
                        className:'',
                        mark:'alignRight'
                      }
                    ]
                  }
                },
                {
                  label:<span>SUB_ITALIC_3&nbsp;</span>,
                  className:'',
                }
              ]
            }
          },
            {
              label:<span>SAY_SOMETHING</span>,
              className:'',
            }
          ]
        }
      },
      {
        label:<i class="fa fa-bold" aria-hidden="true"></i>,
        className:'',
        mark:'bold'
      },

      {
        label:<span>CODE</span>,
        className:'',
        mark:'code'
      }
    ]
}

const schema = {
  marks: {
    bold: props => <strong>{props.children}</strong>,
    code: props => <code>{props.children}</code>,
    italic: props => <em>{props.children}</em>,
    underlined: props => <u>{props.children}</u>,
    alignRight: props => <p style={{textAlign: 'right'}}>{props.children}</p>,
  }
}

export const CoreLayout = ({ children }) => (
  <div className="container text-center">
    <Header />

    <EditorMenu provider={provider} schema={schema} />

    <div className="core-layout__viewport">
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
}

export default CoreLayout
