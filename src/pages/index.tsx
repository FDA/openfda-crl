import React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import '@trussworks/react-uswds/lib/uswds.css'
import '@trussworks/react-uswds/lib/index.css'
import '../css/index.scss'
import '../css/components/Layout.scss'
import '../css/pages/HomePage.scss'
import Layout from "../components/Layout";
import BasicSearch from "../components/BasicSearch";
import Chart from "../components/Chart";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage: React.FC<PageProps> = () => {

  return (
    <Layout>
      <section className='main-content'>
        <div className='flex'>
          <div className='bg-white padding-3'>
            <h2>Complete Response Letters</h2>
            <div className='grid-row flex-row flex-align-center'>
              <Chart/>
              <StaticImage
                src="../images/word_cloud.png" // Relative path to your image
                alt="CRLs Word Cloud"
                placeholder="blurred" // Optional: "blurred", "tracedSVG", "none"
                layout="fixed" // Optional: "fixed", "fullWidth", "constrained"
                width={512} // Optional: Specify width for fixed/constrained layouts
                height={512} // Optional: Specify height for fixed/constrained layouts
              />
            </div>
            <BasicSearch
              searchHeader='Company Name'
              errorText='At least three characters are required.'
              placeholder="Type in all or part of the company's name, or type *** to search all"
              searchField='company_name'
              searchLength={3}
              columnLabels={['Status','CRL Date','Company Name','CRL File']}
              tableType='standard'
              linkColumn='application_number'
              columnDefs={['status','letter_date','company_name', 'application_number']}
            />
          </div>
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
