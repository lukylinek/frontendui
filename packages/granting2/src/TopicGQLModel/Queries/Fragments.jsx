import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

const LinkFragmentStr = `
fragment Link on TopicGQLModel  {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId

  name
nameEn
order
description
semesterId
  
}
`

const MediumFragmentStr = `
fragment Medium on TopicGQLModel  {
  ...Link
  rbacobject {
    ...RBRoles
  }

  semester {
        __typename
        id
        order
        subject {
            __typename
            id
            name
        }
    }
}
`

const LargeFragmentStr = `
fragment Large on TopicGQLModel  {
  ...Medium
    
    lessons {
        __typename
        id
          count
        topicId
        
        typeId
        type { __typename name nameEn abbr}
    }
}
`

const RoleFragmentStr = `
fragment Role on RoleGQLModel {
    __typename
    id
    lastchange
    created
    createdbyId
    changedbyId
    rbacobjectId
    createdby { id __typename }
    changedby { id __typename }
    rbacobject { id __typename }
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

const RBACFragmentStr = `
fragment RBRoles on RBACObjectGQLModel {
  __typename
  id
  currentUserRoles {
    __typename
    id
    lastchange
    valid
    startdate
    enddate
    roletype {
      __typename
      id
      name
    }
    group {
      __typename
      id
      name
      grouptype {
        __typename
        id
        name
      }
    }
  }
}`

export const RoleFragment = createQueryStrLazy(`${RoleFragmentStr}`)
export const RBACFragment = createQueryStrLazy(`${RBACFragmentStr}`)

export const LinkFragment = createQueryStrLazy(`${LinkFragmentStr}`)
export const MediumFragment = createQueryStrLazy(`${MediumFragmentStr}`, LinkFragment, RBACFragment)
export const LargeFragment = createQueryStrLazy(`${LargeFragmentStr}`, MediumFragment)
  