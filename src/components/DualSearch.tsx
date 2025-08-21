import React, { useState, useEffect, useMemo, useCallback } from "react"
import { AgGridReact } from "ag-grid-react";
import { Alert, TextInput } from '@trussworks/react-uswds'
import { Link } from "gatsby";
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import { API_LINK } from "../constants/api";

import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../css/index.scss'
import '../css/components/Search.scss'

const FDA_LABEL_LINK = "https://www.accessdata.fda.gov/spl/data/" // ex: 210ad5fe-33e4-4606-b5c0-6dae095f9a9d/210ad5fe-33e4-4606-b5c0-6dae095f9a9d.xml

const column_map = {
  'standard': [
    {
      field: 'product_name',
      headerName: 'Proprietary Name',
      sort: 'asc',
      comparator: (valueA, valueB) => {
        if (valueA.product_name.toLowerCase() == valueB.product_name.toLowerCase()) return 0;
        return (valueA.product_name.toLowerCase() > valueB.product_name.toLowerCase()) ? 1 : -1;
      },
      cellRenderer:(params) => {
        return <a href={FDA_LABEL_LINK + params.value.spl_id + '/' + params.value.spl_id + '.xml'} target="_blank">{params.value.product_name}</a>
      }
    },
    {
      field: 'item_code',
      headerName: 'NDC'
    },
    {
      field: 'company_name',
      headerName: 'Company Name'
    },
    {
      field: 'application_number_or_monograph_id',
      headerName: 'Application Number or Monograph ID'
    },
    {
      field: 'product_type',
      headerName: 'Product Type'
    },
    {
      field: 'marketing_category',
      headerName: 'Marketing Category'
    }
  ]
}

export default function DualSearch({searchHeader, errorText, placeholder, searchField, searchLength, tableType}) {
  const [drugs, setDrugs] = useState<[] | null>(null)
  const [errMsg, setErrMsg] = useState('')
  const [search, setSearch] = useState('')
  const [searchTwo, setSearchTwo] = useState('')
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
              'product_name': {'product_name': result['product_name'],'spl_id': result['spl_link_id']},
              'company_name': result.company_name,
              'item_code': result.item_code,
              'application_number_or_monograph_id': result.application_number_or_monograph_id,
              'product_type': result.product_type,
              'marketing_category': result.marketing_category
            })
          })
          setDrugs(data)
          setErrMsg('')
        })
        .catch(error => {
          setDrugs(null)
          setErrMsg('No results found.')
        });
    }
  }, [search_query])

  const searchHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (search.length < searchLength || searchTwo.length < searchLength) {
      setDrugs(null)
      setErrMsg(errorText)
    } else {
      setSearchQuery(`${API_LINK}/drug/labelsearch.json?search=${searchField[0]}:*${search}*+AND+${searchField[1]}:*${searchTwo}*`)
    }
  };

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
          <div className='grid-row flex-row'>
            <TextInput
              className='input-padding height-4'
              id={searchField[0]}
              name={searchField[0]}
              type='string'
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
            <span className='padding-top-1 padding-left-1'>({placeholder[0]})</span>
          </div>
          <div className='grid-row flex-row'>
            <TextInput
              className='input-padding height-4'
              id={searchField[1]}
              name={searchField[1]}
              type='string'
              value={searchTwo}
              onChange={event => setSearchTwo(event.target.value)}
            />
            <span className='padding-top-1 padding-left-1'>({placeholder[1]})</span>
          </div>
          <button className='minw-205 usa-button margin-top-2' type='submit'>
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
          {drugs && (
            <div className="ag-theme-alpine margin-bottom-3" style={drugs.length <5 ? {height: 250}: {height: 400}}>
              <AgGridReact
                rowData={drugs}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onFirstDataRendered={onFirstDataRendered}
                noRowsOverlayComponent={loadingOverlayComponent}
                noRowsOverlayComponentParams={loadingOverlayComponentParams}
                pagination={true}
                domLayout={drugs.length <5 ? 'autoHeight': 'normal'}
              />
            </div>
          )}
        </div>
      </div>
      <div className='margin-left-1'>
        <Link to='/'>Back to the FDA Label Search Page</Link>
      </div>
    </div>
  )
}