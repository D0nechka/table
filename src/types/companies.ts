export type TCompany = {
    name: string,
    address: string,
    id: number,
    isSelected: boolean
}

export type TCompanyServer = Omit<TCompany, 'isSelected'>;
export type TCompanyValidate = Omit<TCompany, 'isSelected' | 'id'>
