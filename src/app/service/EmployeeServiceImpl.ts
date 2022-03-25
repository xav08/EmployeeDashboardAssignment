import { ErrorCodes } from "../util/errorCode";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import bcrypt from "bcrypt";
import URLParams from "../util/rest/urlparams";
import SearchResult from "../util/rest/searchresult";
import { EmployeeService } from "./EmployeeService";
import { EmployeeDao } from "../repository/EmployeeDao";
import { Employee } from "../entity/Employee";
import { EmployeeDto } from "../dto/EmployeeDto";
import { EmployeeUpdateDto } from "../dto/EmployeeUpdateDto";
import { TokenResponseDto } from "../dto/TokenResponseDto";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import jsonwebtoken from "jsonwebtoken";
import { TokenData } from "../dto/TokenDto";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import { DeleteResult } from "typeorm";
import { Department } from "../entity/Department";

class EmployeeServiceImpl implements EmployeeService {
  private employeeDao: EmployeeDao;

  constructor(employeeDao: EmployeeDao) {
    this.employeeDao = employeeDao;
  }

  public createEmployee = async (
    employeeData: EmployeeDto
  ): Promise<Employee> => {
    const employeeDetail: Employee = await this.employeeDao.createEmployee(
      employeeData
    );
    employeeData.password = await bcrypt.hash(employeeData.password, 10);
    return employeeDetail;
  };

  public getAllEmployees = async (
    searchParams: URLParams
  ): Promise<SearchResult> => {
    const results: SearchResult = await this.employeeDao.getAllEmployees(
      searchParams
    );
    return results;
  };

  public updateEmployee = async (
    employeeId: string,
    updateEmployeesPayload: EmployeeUpdateDto
  ): Promise<Employee> => {
    return await this.employeeDao.updateEmployee(
      employeeId,
      updateEmployeesPayload
    );
  };

  public employeeLogin = async (
    email: string,
    password: string
  ): Promise<TokenResponseDto> => {
    const employeeDetails = await this.employeeDao.checkEmployeeExistsByEmail(
      email
    );
    if (!employeeDetails) {
      throw new UserNotAuthorizedException();
    }
    if (bcrypt.compare(password, employeeDetails.password)) {
      let payload: TokenData = {
        "custom:id": employeeDetails.id,
        "custom:email": employeeDetails.email,
      };
      const token = this.generateAuthTokens(payload);
      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      throw new IncorrectUsernameOrPasswordException();
    }
  };

  public getEmployeeById = async (employeeId: string): Promise<Employee> => {
      return await this.employeeDao.getEmployeeById(employeeId);
  }

  public deleteEmployee = async (employeeID: string): Promise<DeleteResult> => {
      return await this.employeeDao.deleteEmployee(employeeID);
  }

  public updateDepartment = async (employeeId: string, departmentId: string) : Promise<void> => {
      return await this.employeeDao.updateDepartment(employeeId, departmentId);
  }

  private generateAuthTokens = (payload: TokenData) => {
    return jsonwebtoken.sign(payload, process.env.ID_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };
}

export default EmployeeServiceImpl;
