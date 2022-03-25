import { DeleteResult } from "typeorm";
import { EmployeeDto } from "../dto/EmployeeDto";
import { EmployeeUpdateDto } from "../dto/EmployeeUpdateDto";
import { LoginDto } from "../dto/LoginDto";
import { TokenResponseDto } from "../dto/TokenResponseDto";
import { Department } from "../entity/Department";
import { Employee } from "../entity/Employee";
import SearchResult from "../util/rest/searchresult";
import URLParams from "../util/rest/urlparams";

export interface EmployeeService {
  createEmployee(employeeData: EmployeeDto): Promise<Employee>;

  getAllEmployees(searchParams: URLParams): Promise<SearchResult>;

  updateEmployee(
    employeeId: string,
    updateEmployeesPayload: EmployeeUpdateDto
  ): Promise<Employee>;

  employeeLogin(email: string, password: string): Promise<TokenResponseDto>;

  getEmployeeById(employeeId: string): Promise<Employee>;

  deleteEmployee(employeeId: string): Promise<DeleteResult>;

  updateDepartment(
    employeeId: string,
    departmentId: string
  ): Promise<void>;
}
