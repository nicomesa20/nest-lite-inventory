import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class EditCompanyDto {
    @ApiProperty()
    @IsUUID()
    companyId: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    nit: number;

    @ApiProperty()
    @IsNotEmpty()
    phone: string;
}