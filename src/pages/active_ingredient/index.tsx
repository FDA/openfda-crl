import React from "react"
import type { PageProps } from "gatsby"
import BasicSearch from "../../components/BasicSearch"
import Layout from "../../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <BasicSearch
        searchHeader='Active Ingredient'
        errorText='At least three characters are required.'
        placeholder='Type in all or part of the active ingredient name'
        searchField='active_ingredient_name'
        searchLength={3}
        tableType='active_ingredient'
        columnLabels={['Ingredient Name','Proprietary Name','NDC','Company Name','Application Number or Monograph ID','Product Type','Marketing Category']}
        linkColumn='active_ingredient_name'
        columnDefs={['product_name','item_code','company_name','application_number_or_monograph_id', 'product_type', 'marketing_category']}
      />
    </Layout>
  )
}

export default IndexPage