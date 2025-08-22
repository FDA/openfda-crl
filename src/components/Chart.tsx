import React, { useState, useEffect } from "react"
import { LineChart, Line, Legend, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { API_LINK } from "../constants/api";

import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/index.scss'
import '../css/components/Search.scss'


const year_range = []
for (let year = new Date().getFullYear(); year !== null;) {
  for (let i = 0; i < 5; i++, year = (year > 2002 ? year - 1 : null)) {
    if (year !== null) {
      year_range.unshift({year: year.toString(),nda: '', bla: ''});
    }
  }
}

const urls = [
  {field: 'year', query: (API_LINK + '/transparency/crl.json?count=letter_year')},
  {field: 'BLA', query: (API_LINK + '/transparency/crl.json?count=letter_year&search=application_number:BLA*')},
  {field: "NDA", query: (API_LINK + '/transparency/crl.json?count=letter_year&search=application_number:NDA*')}
]

export default function BasicSearch() {
  const [chartData, setChartData] = useState([])
  const [errMsg, setErrMsg] = useState('')
  const [blaOpacity, setBlaOpacity] = React.useState(1);
  const [ndaOpacity, setNdaOpacity] = React.useState(1);

  useEffect(() => {
    Promise.all(urls.map(url => fetch(url.query)
      .then(response => {
        if (!response.ok){
          throw new Error(response.status + " Failed Fetch");
        }
        return response.json()
      })))
      .then(data => {
        let chart_data = []
        data[0].results.map(result => {
          chart_data.push({[urls[0].field]: result.term})
        })
        chart_data.sort((a,b) => a.year - b.year);
        data.forEach( (value, i) => {

          if ( i != 0 ) {
            data[i].results.map(result => {
              let index = chart_data.findIndex(entry => entry.year === result.term)
              chart_data[index] = {
                ...chart_data[index],
                [urls[i].field]: result.count
              }
            })
          }
        })
        setChartData(chart_data)
        setErrMsg('')
      })
      .catch(error => {
        setChartData(null)
        setErrMsg('No results found.')
      });
  }, [])

  const handleMouseEnter = (payload/*: LegendPayload */) => {
    if (payload.dataKey === 'NDA') {
      setBlaOpacity(0.5)
    } else {
      setNdaOpacity(0.5);
    }
  }

  const handleMouseLeave = () => {
    setBlaOpacity(1)
    setNdaOpacity(1)
  }


  return (
    <div className='bg-white margin-top-5 padding-left-2 padding-right-3'>
      <LineChart width={990} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" interval={1} />
        <YAxis/>
        <Tooltip />
        <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <Line type="monotone" dataKey="NDA" stroke="crimson" strokeOpacity={ndaOpacity} />
        <Line type="monotone" dataKey="BLA" stroke="blue" strokeOpacity={blaOpacity} />
      </LineChart>
    </div>
  )
}