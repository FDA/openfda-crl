import React, { useState, useEffect, useMemo, useCallback } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import CustomLoadingOverlay from "./CustomLoadingOverlay";
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
      year_range.unshift({year: year.toString(),nda: Math.floor(Math.random() * 100), bla: Math.floor(Math.random() * 100)});
    }
  }
}

export default function BasicSearch() {
  const [chartData, setChartData] = useState([])
  const [errMsg, setErrMsg] = useState('')
  const [search_query, setSearchQuery] = useState('')

  useEffect(() => {
    if (search_query === '') {
      return
    } else {
      fetch(search_query)
        .then(response => {
          if (!response.ok){
            throw new Error(response.status + " Failed Fetch");
          }
          return response.json()
        })
        .then(json => {
          let data = []
          json.results.map(result => {
            data.push({
              'status': "Approved",
              'letter_date': result.letter_date,
              'company_name': result.company_name,
              'file_name': {'application_number': result['application_number'][0],'file_name': result['file_name']},
            })
          })
          setChartData(data)
          setErrMsg('')
        })
        .catch(error => {
          setChartData(null)
          setErrMsg('No results found.')
        });
    }
  }, [search_query])



  return (
    <div className='bg-white margin-top-3 padding-left-2 padding-right-3 padding-bottom-5'>
      <LineChart width={990} height={400} data={year_range}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" interval={1} />
        <YAxis/>
        <Tooltip />
        <Line type="monotone" dataKey="nda" stroke="crimson" />
        <Line type="monotone" dataKey="bla" stroke="blue" />
      </LineChart>
    </div>
  )
}