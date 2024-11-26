import { TCompanyServer } from 'src/types/companies';

export type TGetCompanyArgs = {
    limit: number,
    lastCursor: number
}

export type TGetCompanyResult = {
    companies: TCompanyServer[],
    lastCursor: number
}
