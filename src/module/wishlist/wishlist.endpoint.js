import { roles } from "../../services/roles.js";

export const endpoint={
    add:[roles.User],
    update:[roles.Admin],
    remove:[roles.User]
}