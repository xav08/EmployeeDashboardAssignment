import {
  DeepPartial,
  DeleteResult,
  getManager,
  getRepository,
  Repository,
} from "typeorm";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/errorCode";
import URLParams from "../util/rest/urlparams";
import SearchResult from "../util/rest/searchresult";
import { SortOrder } from "../util/constants/SortOrder";
import { EmployeeDao } from "./EmployeeDao";
import { Employee } from "../entity/Employee";
import { EmployeeDto } from "../dto/EmployeeDto";
import { Department } from "../entity/Department";

/**
 * Handles CRUD operations on employee data in database
 */
class EmployeeDaoImpl implements EmployeeDao {
  public createEmployee = async (
    employeeData: EmployeeDto
  ): Promise<Employee> => {
    const employeeRepo: Repository<Employee> = getRepository(Employee);
    const userDetail: Employee = await employeeRepo.save(employeeData);
    return userDetail;
  };

  public updateEmployee = async (
    employeeId: string,
    updateEmployeesPayload: DeepPartial<Employee>
  ): Promise<Employee> => {
    const employeeRepo: Repository<Employee> =
      getManager().getRepository(Employee);
    const employeeDetail: Employee = await this.getEmployeeById(employeeId);
    if (employeeDetail) {
      updateEmployeesPayload.id = employeeDetail.id;
      return employeeRepo.save(updateEmployeesPayload);
    }
  };

  public getEmployeeById = async (employeeId: string): Promise<Employee> => {
    const employeeRepo: Repository<Employee> =
      getManager().getRepository(Employee);

    const employeeData = await employeeRepo.findOne(employeeId, {
      relations: ["departments"],
    });
    if (!employeeData) {
      const error = ErrorCodes.USER_NOT_FOUND;
      throw new EntityNotFoundException(error);
    }
    return employeeData;
  };

  public getAllEmployees = async (
    searchParams: URLParams
  ): Promise<SearchResult> => {
    const employeeRepo = getRepository(Employee)
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.departments", "departments");

    if (searchParams.limit) {
      employeeRepo.take(searchParams.limit);
    }

    if (searchParams.offset) {
      employeeRepo.skip(searchParams.offset);
    }

    const order: SortOrder =
      (searchParams.order as SortOrder) || SortOrder.DESC;

    employeeRepo.orderBy(`employee.${searchParams.sort || "name"}`, order);

    const [records, total] = await employeeRepo.getManyAndCount();
    return {
      data: records,
      length: records.length,
      total,
    };
  };

  public checkEmployeeExistsByEmail = async (
    email: string
  ): Promise<Employee> => {
    const employeeRepo = getManager().getRepository(Employee);
    const employeeDetail = await employeeRepo.findOne({
      where: { email },
    });
    return employeeDetail;
  };

  public deleteEmployee = async (employeeId: string): Promise<DeleteResult> => {
    const employeeRepo = getManager().getRepository(Employee);
    const deletedEmployee = await employeeRepo.delete(employeeId);
    return deletedEmployee;
  };

  public updateDepartment = async (
    employeeId: string,
    departmentId: string
  ): Promise<void> => {
    const employeeDetails = await this.getEmployeeById(employeeId);
    const departmentDetails = await getManager().getRepository(Department).findOne(departmentId);
    if (!employeeDetails || !departmentDetails) {
      const error = ErrorCodes.USER_NOT_FOUND;
      throw new EntityNotFoundException(error);
    }
    await getRepository(Employee)
      .createQueryBuilder("employee")
      .relation("departments")
      .of(employeeDetails)
      .add(departmentDetails);
  };
}

export default EmployeeDaoImpl;
