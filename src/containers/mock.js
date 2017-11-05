import React from 'react'
export const items={
  0:{
    id:0,
    label:<i className="fa fa-bold" aria-hidden="true"></i>,
    className:'item',
    mark:'bold'
  },
  1: {
    id:1,
    label:<i className="fa fa-italic" aria-hidden="true"></i>,
    className:'item',
    mark:'italic'
  },
  2:{
    id:2,
    label:<i className="fa fa-bookmark-o" aria-hidden="true"></i>,
    className:'item',
  },
  3:{
    id:3,
    label:<i className="fa fa-comment-o" aria-hidden="true"></i>,
    className:'item',
  },
  4:{
    id:4,
    label:<i className="fa fa-ellipsis-h" aria-hidden="true"></i>,
    className:'item',
  },
  5:{
    id:5,
    label:<i className="fa fa-align-right" aria-hidden="true"></i>,
    className:'item1',
    mark:'alignRight'
  },
  6:{
    id:6,
    label:<i className="fa fa-align-center" aria-hidden="true"></i>,
    className:'item1',
    mark:'alignCenter'
  },
  7:{
    id:7,
    label:<i className="fa fa-align-left" aria-hidden="true"></i>,
    className:'item',
    mark:'alignLeft'
  },
  8:{
    id:8,
    label: <span>RENAT</span>,
    className:'item',
  },
  146:{
    id:146,
    label: <span>OSMANOV</span>,
    className:'item',
  },
  16:{
    id:16,
    label: <span>CHINO</span>,
    className:'item',
  },
  36:{
    id:36,
    label: <span>MORENO</span>,
    className:'item',
  },
  46:{
    id:46,
    label: <span>ABE</span>,
    className:'item',
  },
  62:{
    id:62,
    label: <span>STEFAN</span>,
    className:'item',
  },
  162:{
    id:162,
    label: <span>DAN</span>,
    className:'item',
  },
  8080:{
    id:8080,
    label: <span>google</span>,
    className:'item',
  }
}


export const inputData={
  id:0,
  className:'menuContainer',
  volume:'up',
  axis:'x',
  items:[
    {
      id: 0,
      list:{
        id:'l59',
        className:'menuContainer2',
        volume:'up',
        axis:'y',
        items:[
          {
            id:8080
          }
        ]
      }
    },
    {
      id: 1
    },
    {
      id: 7,
      list:{
        id:2,
        className:'menuContainer2',
        volume:'up',
        axis:'x',
        items:[
          {
            id: 6,
            list: {
              id:125,
              className:'menuContainer2',
              volume:'up',
              axis:'y',
              items:[
                {
                  id: 16,
                  list: {
                    id:225,
                    className:'menuContainer2',
                    volume:'up',
                    axis:'y',
                    items:[
                      {
                        id: 36
                      }
                    ]
                  }
                }

              ]
            }
          },
          {
            id: 8,
            list: {
              id:25,
              className:'menuContainer2',
              volume:'up',
              axis:'x',
              items:[
                {
                  id: 46,
                  list: {
                    id:215,
                    className:'menuContainer2',
                    volume:'up',
                    axis:'x',
                    items:[
                      {
                        id: 62
                      }
                    ]
                  }
                },
                {
                  id: 146,
                  list: {
                    id:1215,
                    className:'menuContainer2',
                    volume:'up',
                    axis:'y',
                    items:[
                      {
                        id: 162
                      }
                    ]
                  }
                }

              ]
            }
          },
        ]
      }
    }
  ]
}
