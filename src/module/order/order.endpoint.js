import { roles } from "../../services/roles.js";

export const endpoint={
    create:[roles.User],
    update:[roles.Admin]
}