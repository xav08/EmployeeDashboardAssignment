import {
    IsDefined,
    IsUUID
} from "class-validator";

/**
 * Data transfer object (DTO) with expected fields for dept update.
 */
export class DeptUpdateDto {

    @IsUUID()
    @IsDefined()
    public deptId: string;
}
