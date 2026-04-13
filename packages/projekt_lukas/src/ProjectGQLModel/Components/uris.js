import { URIRootObj } from "../../uriroot"

const ProjectRoot = URIRootObj.model("project")

export const ListURI = String(ProjectRoot.action("list"))
export const CreateURI = String(ProjectRoot.action("create"))
export const ReadURI = String(ProjectRoot.action("view"))
export const UpdateURI = String(ProjectRoot.action("edit"))
export const DeleteURI = String(ProjectRoot.action("delete"))

export const LinkURI = ReadURI
export const VectorItemsURI = ListURI

export const ReadItemURI = String(ProjectRoot.action("view").id())
export const UpdateItemURI = String(ProjectRoot.action("edit").id())
export const DeleteItemURI = String(ProjectRoot.action("delete").id())