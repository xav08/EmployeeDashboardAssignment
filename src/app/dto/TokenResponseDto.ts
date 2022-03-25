import { DeepPartial } from "typeorm";
import { Employee } from "../entity/Employee";

/**
 * Data transfer object (DTO) with expected fields for tokens.
 */
export class TokenResponseDto {

    public idToken: string;
    public employeeDetails?: Employee

}