import React from 'react'
import Header from '../../components/Header'
import styled,{ ThemeProvider } from 'styled-components';
import EditorMenu from 'components/EditorMenu'
import './CoreLayout.css'



const provider = {
    className:'menuContainer',//<--set classname if you want
    volume:'up',
    axis:'x',
    items:[

      {
        label:<span>PRESSI</span>,
        className:'',
        list:{
          className:'',//<--set classname if you want
          volume:'down',
          axis:'y',
          items:[{
            label:<span>ITALIC</span>,
            className:'',
            mark:'italic',
            list:{
              volume:'down',
              axis:'x',
              className:'',
              items:[
                {
                  label:<span>SUB_ITALIC_1</span>,
                  className:'',
                },
                {
                  label:<span>SUB_ITALIC_2</span>,
                  className:'',
                },
                {
                  label:<span>SUB_ITALIC_3</span>,
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
        label:<span>SUBMIT</span>,
        className:''
      },


      {
        label:<span>BOLD</span>,
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
  }
}

export const CoreLayout = ({ children }) => (
  <div className="container text-center">
    <Header />

    <EditorMenu provider={provider} schema={schema} />

    {/*<HoveringMenu/>*/}

    <div className="core-layout__viewport">
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
}

export default CoreLayout
