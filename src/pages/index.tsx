import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'
import '../css/index.scss'
import '../css/components/Layout.scss'
import '../css/pages/HomePage.scss'
import Layout from "../components/Layout";
import BasicSearch from "../components/BasicSearch";
import Chart from "../components/Chart";

const IndexPage: React.FC<PageProps> = () => {

  return (
    <Layout>
      <section className='main-content'>
        <div className='flex flex-column bg-white padding-3' style={{maxWidth:'1600px'}}>
          <h2 className='margin-bottom-0'>Complete Response Letters</h2>
          <Chart/>
          <BasicSearch
            searchHeader='Company Name'
            errorText='At least three characters are required.'
            placeholder="Type in all or part of the company's name, or type *** to search all"
            searchField='company_name.exact'
            searchLength={3}
            columnLabels={['Status','CRL Date','Company Name','CRL File']}
            tableType='standard'
            linkColumn='application_number'
            columnDefs={['status','letter_date','company_name', 'application_number']}
          />
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => {
  return (
    <>
      <title>FDA Complete Response Letters</title>
    </>
  )
}
