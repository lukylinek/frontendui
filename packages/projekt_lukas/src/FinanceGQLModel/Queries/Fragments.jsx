import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

const LinkFragmentStr = `
fragment FinanceLink on FinanceGQLModel {
  __typename
  id
  name
  nameEn
  value
  lastchange
}
`

const LargeFragmentStr = `
fragment FinanceLarge on FinanceGQLModel {
  ...FinanceLink
  description
  financeTypeId
  masterfinanceId
  projectId
  masterfinance { __typename id name nameEn }
  subfinances { __typename id name nameEn value }
  project { __typename id name }
}
`

export const LinkFragment = createQueryStrLazy(LinkFragmentStr)
export const LargeFragment = createQueryStrLazy(LargeFragmentStr, LinkFragment)
