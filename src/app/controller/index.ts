/**
 * Wraps Controllers for easy import from other modules
 */

import EmployeeController from "./EmployeeController";
import EmployeeServiceImpl from "../service/EmployeeServiceImpl";
import EmployeeDaoImpl from "../repository/EmployeeDaoImpl";

const employeeDao = new EmployeeDaoImpl()
const employeeService = new EmployeeServiceImpl(employeeDao)

export default [
  new EmployeeController(employeeService)
];
