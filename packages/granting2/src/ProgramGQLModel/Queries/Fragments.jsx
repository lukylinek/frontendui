import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

const LinkFragmentStr = `
fragment Link on ProgramGQLModel  {
  __typename
  id
  lastchange
  created
  createdbyId
  changedbyId
  rbacobjectId
    name
  nameEn

  guarantorsGroupId
  licencedGroupId
  
  typeId


  createdby { __typename id fullname }
  changedby { __typename id fullname }
}
`

const MediumFragmentStr = `
fragment Medium on ProgramGQLModel  {
  ...Link
  rbacobject {
    ...RBRoles
  }

    type {
        __typename
        id
        lastchange
        created
        createdbyId
        changedbyId
        rbacobjectId
        createdby { __typename id fullname email }
        changedby { __typename id fullname email }
        rbacobject { ...RBRoles }
        name
        nameEn
        levelId
        levelType { __typename id name }
        titleId
        titleType { __typename id name }
        languageId
        languageType { __typename id name }
        formId
        formType { __typename id name }
    }


    
    licencedGroup {
        __typename
        id
        name
    }
    guarantors {
        __typename
        id
        name
    } 

    subjects {
        __typename
        id
        name
        nameEn
        description
        descriptionEn
        semesters {
            __typename
            id
            order
        }
    }

    students {
        __typename
        id
        userId
        user { __typename id fullname email}
        programId
        program { __typename id name }
        stateId
        semesterNumber
    }
}
`

const LargeFragmentStr = `
fragment Large on ProgramGQLModel  {
  ...Medium
           
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
  