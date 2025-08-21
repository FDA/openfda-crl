import React from "react"
import type { PageProps } from "gatsby"
import BasicSearch from "../../components/BasicSearch"
import Layout from "../../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <BasicSearch
        searchHeader='Proprietary Name'
        errorText='At least three characters are required.'
        placeholder='Type in all or part of the proprietary name'
        searchField='product_name'
        searchLength={3}
        columnLabels={['Proprietary Name','NDC','Company Name','Application Number or Monograph ID','Product Type','Marketing Category']}
        tableType='standard'
        linkColumn='product_name'
        columnDefs={['item_code','company_name','application_number_or_monograph_id', 'product_type', 'marketing_category']}
      />
    </Layout>
  )
}

export default IndexPage