import { EntityRepository, getConnection, Repository } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository extends Repository<Employee> {
    public async getAllEmployees() {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findAndCount();
    }

    public async getEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id);
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.update({ id: employeeId, deletedAt: null }, {
            name: employeeDetails.name ? employeeDetails.name : undefined,
            age: employeeDetails.age ? employeeDetails.age : undefined
        });
        return updateEmployeeDetails;
    }

    public async updateEmployeeDetailsQueryBuilder(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.createQueryBuilder("Employee").update(Employee).set({
            name: employeeDetails.name ? employeeDetails.name : undefined,
            age: employeeDetails.age ? employeeDetails.age : undefined
        }).where({ id: employeeId, deletedAt: null }).returning("*").execute();
        return updateEmployeeDetails;
    }

    public async softDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete({
            id
        });
    }

    public async hardDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.delete({
            id
        });
    }

    public async hardRemoveEmployee(employee: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.remove(employee);
    }

    public async softRemoveEmployee(employee: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softRemove(employee);
    }
}
