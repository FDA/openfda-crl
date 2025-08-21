import React from "react"
import type { PageProps } from "gatsby"
import BasicSearch from "../../components/BasicSearch"
import Layout from "../../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <BasicSearch
        searchHeader='Application Number or Monograph ID'
        errorText='At least four characters are required.'
        placeholder='For application numbers, type the 6 digit application number, including the leading zero. For
            monographs, type in "part" and at least a portion of the monograph id (e.g. part310)'
        searchField='application_number_or_monograph_id'
        searchLength={4}
        columnLabels={['Proprietary Name','NDC','Company Name','Application Number or Monograph ID','Product Type','Marketing Category']}
        tableType='standard'
        linkColumn='product_name'
        columnDefs={['item_code','company_name','application_number_or_monograph_id', 'product_type', 'marketing_category']}
      />
    </Layout>
  )
}

export default IndexPage