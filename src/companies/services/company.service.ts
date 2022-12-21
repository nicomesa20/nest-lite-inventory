import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { instanceToPlain, plainToClass } from "class-transformer";
import { CreateCompanyDto, EditCompanyDto } from "src/dto";
import { Repository } from "typeorm";
import { Company } from "../models/company.entity";

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private companyRepository: Repository<Company>
    ) { }

    public async create(company: CreateCompanyDto): Promise<Company> {
        const data = instanceToPlain(company);
        const comp = plainToClass(Company, data);
        const newCompany = await this.companyRepository.create(comp);

        return await this.companyRepository.save(newCompany);
    }

    public async findAll(): Promise<Company[]> {
        return this.companyRepository.find();
    }

    public async update(editCompany: EditCompanyDto): Promise<void> {
        const id = editCompany.companyId;
        const companyToUpdate = await this.companyRepository.findOne({ where: { id } });
        const companyUpdated = Object.assign(companyToUpdate, editCompany);

        await this.companyRepository.save(companyUpdated);
    }

    public async delete(id: string): Promise<void> {
        const company = await this.companyRepository.findOne({ where: { id } });

        await this.companyRepository.remove(company);
    }
}