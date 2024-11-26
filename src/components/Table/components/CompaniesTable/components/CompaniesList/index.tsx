import { TCompany, TCompanyServer } from 'src/types/companies';
import { CompanyTable } from './components/CompanyTable';

type TProps = {
  companies: TCompany[];
  onEditClick: (company: TCompanyServer) => void;
  isLoadingManyDeletes: boolean;
  onToggleSelectCompany: (id: number) => void;
  onDeleteCompany: (id: number) => void;
}

export const CompaniesList = ({
  companies,
  isLoadingManyDeletes,
  onEditClick,
  onDeleteCompany,
  onToggleSelectCompany
}: TProps) =>  (
  <>
    {companies.map(({ id, name, address, isSelected }) => (
      <CompanyTable
        key={id}
        name={name}
        address={address}
        isSelected={isSelected}
        isDisabled={isLoadingManyDeletes}
        onEditClick={onEditClick}
        onDeleteCompany={onDeleteCompany}
        onToggleSelectCompany={onToggleSelectCompany}
        id={id}
      />
    ))}
  </>
);

