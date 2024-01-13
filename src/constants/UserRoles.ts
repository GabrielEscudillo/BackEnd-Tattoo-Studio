import { Role } from "../models/Role";

export const UserRoles = {
   CUSTOMER: { id: 1, role_name: "customer" } as Role,
   ARTIST: { id: 2, role_name: "artist" } as Role,
   SUPER_ADMIN: { id: 3, role_name: "super_admin" } as Role,
};