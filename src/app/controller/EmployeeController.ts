import { NextFunction, Response } from "express";
import multer from "multer";
import APP_CONSTANTS from "../constants";
import { EmployeeDto } from "../dto/EmployeeDto";
import { EmployeeUpdateDto } from "../dto/EmployeeUpdateDto";
import { LoginDto } from "../dto/LoginDto";
import { DeptUpdateDto } from "../dto/DeptUpdateDto";
import authorize from "../middleware/authorize";
import validationMiddleware from "../middleware/validationMiddleware";
import { EmployeeService } from "../service/EmployeeService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";
/**
 * Implementation of the EmployeeController route.
 *
 */
class EmployeeController extends AbstractController {
  private employeeService: EmployeeService;
  private upload = multer({ dest: "./public/uploads/" });

  constructor(employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employees`);
    this.employeeService = employeeService;
    this.initializeRoutes();
  }

  protected initializeRoutes = (): void => {
    this.router.post(
      `${this.path}`,
      validationMiddleware(EmployeeDto, APP_CONSTANTS.body),
      this.asyncRouteHandler(this.createEmployee)
    );

    this.router.get(
      `${this.path}`,
      authorize(),
      this.asyncRouteHandler(this.getAllEmployees)
    );

    this.router.get(
      `${this.path}/:id`,
      authorize(),
      this.asyncRouteHandler(this.getEmployeeById)
    );

    this.router.put(
      `${this.path}/:id`,
      authorize(),
      validationMiddleware(EmployeeUpdateDto, APP_CONSTANTS.body),
      this.asyncRouteHandler(this.updateEmployee)
    );

    this.router.put(
      `${this.path}/:id/update-dept`,
      authorize(),
      validationMiddleware(DeptUpdateDto, APP_CONSTANTS.body),
      this.asyncRouteHandler(this.updateDepartment)
    );

    this.router.delete(
      `${this.path}/:id`,
      authorize(),
      this.asyncRouteHandler(this.deleteEmployee)
    );

    this.router.post(
      `${this.path}/upload`,
      this.upload.single("file"),
      this.asyncRouteHandler(this.uploadImage)
    );

    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginDto, APP_CONSTANTS.body),
      this.asyncRouteHandler(this.login)
    );
  };

  /**
   * Create a user with given data.
   *
   * @returns User record
   */
  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const employeeData: EmployeeDto = request.body;
    const employeeDetail = await this.employeeService.createEmployee(
      employeeData
    );
    response.send(
      this.fmt.formatResponse(
        employeeDetail,
        Date.now() - request.startTime,
        "OK"
      )
    );
  };

  private getAllEmployees = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const urlParams = request.query;
    const { data, total } = await this.employeeService.getAllEmployees(
      urlParams
    );
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", total)
    );
  };

  private updateEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const id: string = request.params.id;
    const employeeData: EmployeeUpdateDto = request.body;
    const employeeDetail = await this.employeeService.updateEmployee(
      id,
      employeeData
    );
    response.send(
      this.fmt.formatResponse(
        employeeDetail,
        Date.now() - request.startTime,
        "OK"
      )
    );
  };

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData: LoginDto = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.email.toLowerCase(),
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };

  private uploadImage = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const filePath = `${APP_CONSTANTS.basePath}/${request.file.path.slice(7)}`;
    response.send(
      this.fmt.formatResponse(
        { filePath },
        Date.now() - request.startTime,
        "OK"
      )
    );
  };

  private deleteEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const employeeId: string = request.params.id;
    const deleteResp = await this.employeeService.deleteEmployee(employeeId);
    response.send(
      this.fmt.formatResponse(deleteResp, Date.now() - request.startTime, "OK")
    );
  };

  private getEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const employeeId: string = request.params.id;
    const employeeDetail = await this.employeeService.getEmployeeById(
      employeeId
    );
    response.send(
      this.fmt.formatResponse(
        employeeDetail,
        Date.now() - request.startTime,
        "OK"
      )
    );
  };

  private updateDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const employeeId: string = request.params.id;
    const departmentId: string = request.body.deptId
     await this.employeeService.updateDepartment(employeeId, departmentId);
    response.send(
      this.fmt.formatResponse({status: "Department Updated"}, Date.now() - request.startTime, "OK")
    );
  };
}

export default EmployeeController;
