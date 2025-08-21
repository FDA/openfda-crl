import React, { useState, useEffect, useMemo, useCallback } from "react"
import { AgGridReact } from "ag-grid-react";
import Select from 'react-select'
import { Alert, TextInput } from '@trussworks/react-uswds'
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import { API_LINK } from "../constants/api";

import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/index.scss'
import '../css/components/Search.scss'

const CRL_File_LINK = "https://download.open.fda.gov/crl/" // ex: 215973,215974Orig1s000OtherActionLtrs.pdf

const column_map = {
  'standard': [
    {
      field: 'status',
      headerName: 'Status'
    },
    {
      field: 'letter_date',
      headerName: 'CRL Date'
    },
    {
      field: 'company_name',
      headerName: 'Company Name'
    },
    {
      field: 'file_name',
      headerName: 'CRL File',
      cellRenderer:(params) => {
        return <a href={CRL_File_LINK + params.value.file_name} target="_blank">{params.value.application_number}</a>
      }
    },
  ]
}

const year_range = [{value: 'all', label: 'All'}]
for (let year = new Date().getFullYear(); year !== null;) {
  for (let i = 0; i < 5; i++, year = (year > 2002 ? year - 1 : null)) {
    if (year !== null) {
      year_range.push({value: year.toString(), label: year.toString()});
    }
  }
}

export default function BasicSearch({searchHeader, errorText, placeholder, searchField, searchLength, tableType}) {
  const [letters, setLetters] = useState<[] | null>(null)
  const [status, setStatus] = useState("approved")
  const [year, setYear] = useState(year_range[0])
  const [errMsg, setErrMsg] = useState('')
  const [search, setSearch] = useState('')
  const [search_query, setSearchQuery] = useState('')
  const columnDefs = useMemo(() => column_map[tableType], []);
  const defaultColDef = useMemo(() => ({resizable: true, sortable: true}), []);

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
          setLetters(data)
          setErrMsg('')
        })
        .catch(error => {
          setLetters(null)
          setErrMsg('No results found.')
        });
    }
  }, [search_query])

  const searchHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (search.length < searchLength) {
      setLetters(null)
      setErrMsg(errorText)
    } else {
      if (year.value === 'all') {
        setSearchQuery(`${API_LINK}/transparency/crl.json?search=${searchField}:*${search}*&limit=1000`)
      } else {
        setSearchQuery(`${API_LINK}/transparency/crl.json?search=${searchField}:*${search}+AND+letter_date:[${year.value}-01-01+TO+${year.value}-12-31]*&limit=1000`)
      }
    }
  };

  const onStatusChange = e => {
    setStatus(e.target.value)
  }

  const onYearChange = (option) => {
    setYear(option)
  }

  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const loadingOverlayComponent = useMemo(() => {
    return CustomLoadingOverlay;
  }, []);

  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: 'One moment please...',
    };
  }, []);

  return (
    <div className='bg-white margin-top-3 padding-left-2 padding-right-3 padding-bottom-5'>
      <div className='grid-row flex-column'>
        <div className='grid-col flex-auto padding-1'>
          <b>Search By {searchHeader}:</b>
        </div>
        <form className='minw-205 padding-left-1' onSubmit={searchHandler}>
          <div className='grid-col flex-column'>
            <TextInput
              className='input-padding height-4'
              id={searchField[0]}
              name={searchField[0]}
              type='string'
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
            <span className='padding-top-1 padding-left-1'>({placeholder})</span>
            <div className='grid-col flex-column flex-align-center'>
              <h3>Status:</h3>
              <input type="radio" name="approved" value="Approved" id="approved" checked={status === "approved"} onChange={onStatusChange}/>
              <label className='center padding-left-1'>Approved</label>
            </div>
            <div className='grid-col flex-column flex-align-center'>
              <h3>Year:</h3>
              <Select
                defaultValue={year_range[0]}
                name="years"
                options={year_range}
                value={year}
                onChange={onYearChange}
                className="basic-multi-select year-select"
                classNamePrefix="select"
              />
            </div>
          </div>
          <button className='minw-205 usa-button margin-top-2 margin-bottom-2' type='submit'>
            <span className="usa-search__submit-text">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="usa-icon usa-icon--size-3 usa-search__submit-icon" focusable="false" role="img"
              name="Search"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </form>
      </div>
      {
        // Display error message if no results found.
        errMsg.length > 0 && (
          <div className='grid-row padding-1'>
            <div className='grid-col flex-auto'>
              <Alert type={"info"} headingLevel={'h1'}>{errMsg}</Alert>
            </div>
          </div>
        )
      }
      <div className='grid-row flex-column'>
        <div className='grid-col padding-left-1'>
          {letters && (
            <div className="ag-theme-alpine margin-bottom-3" style={letters.length <5 ? {height: 250}: {height: 400}}>
              <AgGridReact
                rowData={letters}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onFirstDataRendered={onFirstDataRendered}
                noRowsOverlayComponent={loadingOverlayComponent}
                noRowsOverlayComponentParams={loadingOverlayComponentParams}
                pagination={true}
                domLayout={letters.length <5 ? 'autoHeight': 'normal'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}