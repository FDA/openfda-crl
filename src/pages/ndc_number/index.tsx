import React from "react"
import type { PageProps } from "gatsby"
import BasicSearch from "../../components/BasicSearch"
import Layout from "../../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <BasicSearch
        searchHeader='NDC Number'
        errorText='At least four characters are required.'
        placeholder='Type the 4 or 5 digit NDC Labeler Code with the hyphen (e.g. 0001-), the 8 or 9 digit NDC Product
            Code (e.g. 0001-0001), or the 10 digit NDC (0001-0001-01)'
        searchField='item_code'
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