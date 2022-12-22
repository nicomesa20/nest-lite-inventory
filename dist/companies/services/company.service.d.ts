import { CreateCompanyDto, EditCompanyDto } from "src/dto";
import { Repository } from "typeorm";
import { Company } from "../models/company.entity";
export declare class CompanyService {
    private companyRepository;
    constructor(companyRepository: Repository<Company>);
    create(company: CreateCompanyDto): Promise<Company>;
    findAll(): Promise<Company[]>;
    update(editCompany: EditCompanyDto): Promise<void>;
    delete(id: string): Promise<void>;
}
