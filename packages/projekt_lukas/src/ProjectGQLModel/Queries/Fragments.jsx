import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

const LinkFragmentStr = `
fragment ProjectLink on ProjectGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  name
  nameEn
  path
}
`

const RBACFragmentStr = `
fragment ProjectRBRoles on RBACObjectGQLModel {
  __typename
  id
  roles { __typename id }
  currentUserRoles {
    __typename
    id
    lastchange
    valid
    startdate
    enddate
    roletype { __typename id name }
    group { __typename id name grouptype { __typename id name } }
  }
}
`

const UserFragmentStr = `
fragment ProjectUser on UserGQLModel {
  __typename
  id
  fullname
  firstname
  surname
  email
  valid
}
`

const FinanceFragmentStr = `
fragment ProjectFinance on FinanceGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  path
  name
  nameEn
  value
  description
  financeTypeId
  masterfinanceId
  masterfinance { __typename id name nameEn }
  subfinances { __typename id name nameEn value }
  type { __typename id }
  projectId
  project { __typename id }
}
`

const ProjectTypeFragmentStr = `
fragment ProjectTypeDetail on ProjectTypeGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  path
  name
  nameEn
  mastertypeId
  mastertype { __typename id name nameEn }
  subtypes { __typename id name nameEn }
}
`

const MediumFragmentStr = `
fragment ProjectMedium on ProjectGQLModel {
  ...ProjectLink
  rbacobject { ...ProjectRBRoles }
}
`

const LargeFragmentStr = `
fragment ProjectLarge on ProjectGQLModel {
  ...ProjectMedium
  done
  startdate
  enddate
  description
  projectTypeId
  masterprojectId
  financeId

  createdby { ...ProjectUser }
  changedby { ...ProjectUser }

  masterproject {
    __typename
    id
    name
    nameEn
    done
    startdate
    enddate
    description
    projectTypeId
    masterprojectId
  }

  subprojects {
    __typename
    id
    name
    nameEn
    startdate
    enddate
    done
  }

  finance { ...ProjectFinance }
  type { ...ProjectTypeDetail }
}
`

const RoleFragmentStr = `
fragment ProjectRole on RoleGQLModel {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
  valid
  deputy
  startdate
  enddate
  roletypeId
  userId
  groupId
  roletype { __typename id }
  user { __typename id fullname }
  group { __typename id name }
}
`

export const RoleFragment = createQueryStrLazy(`${RoleFragmentStr}`)
export const RBACFragment = createQueryStrLazy(`${RBACFragmentStr}`)
export const UserFragment = createQueryStrLazy(`${UserFragmentStr}`)
export const FinanceFragment = createQueryStrLazy(`${FinanceFragmentStr}`)
export const ProjectTypeFragment = createQueryStrLazy(`${ProjectTypeFragmentStr}`)

export const LinkFragment = createQueryStrLazy(`${LinkFragmentStr}`)
export const MediumFragment = createQueryStrLazy(
  `${MediumFragmentStr}`,
  LinkFragment,
  RBACFragment
)
export const LargeFragment = createQueryStrLazy(
  `${LargeFragmentStr}`,
  MediumFragment,
  UserFragment,
  FinanceFragment,
  ProjectTypeFragment
)
