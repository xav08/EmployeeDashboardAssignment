import { DeepPartial, DeleteResult } from "typeorm";
import { EmployeeDto } from "../dto/EmployeeDto";
import { Department } from "../entity/Department";
import { Employee } from "../entity/Employee";
import SearchResult from "../util/rest/searchresult";
import URLParams from "../util/rest/urlparams";

export interface EmployeeDao {
  createEmployee(employeeData: EmployeeDto): Promise<Employee>;

  getAllEmployees(searchParams: URLParams): Promise<SearchResult>;

  getEmployeeById(employeeId: string): Promise<Employee>;

  updateEmployee(
    employeeId: string,
    updateEmployeesPayload: DeepPartial<Employee>
  ): Promise<Employee>;

  deleteEmployee(employeeId: string): Promise<DeleteResult>;

  checkEmployeeExistsByEmail(email: string): Promise<Employee>;

  updateDepartment(
    employeeId: string,
    departmentId: string
  ): Promise<void>;
}
