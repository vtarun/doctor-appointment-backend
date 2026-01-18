import { ROLES } from "../constants/roles";
import { requireRoles } from "./requireRole";

export const requireDoctor = requireRoles([ROLES.DOCTOR]);
export const requirePatient = requireRoles([ROLES.PATIENT]);
export const requireAdmin = requireRoles([ROLES.ADMIN]);
export const requireDoctorOrAdmin = requireRoles([ROLES.DOCTOR, ROLES.ADMIN]);