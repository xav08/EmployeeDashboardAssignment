/**
 * Wraps Controllers for easy import from other modules
 */
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController()
];
