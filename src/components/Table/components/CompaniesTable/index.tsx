import { LoaderTable } from './components/LoaderTable';
import { TableHeader } from './components/TableHeader';
import { CompaniesList } from './components/CompaniesList';
import { TCompany, TCompanyServer } from 'src/types/companies';
import cls from './style.module.scss';

type CompaniesTableProps = {
  companies: TCompany[];
  isLoadingManyDeletes: boolean;
  isLoadingAddCompanies: boolean;
  onEditClick: (company: TCompanyServer) => void;
  isSelectedAllCompanies: boolean;
  toggleSelectedAllCompanies: () => void;
  onToggleSelectCompany: (id: number) => void;
  onDeleteCompany: (id: number) => void;
};

export const CompaniesTable = ({
  companies,
  isLoadingManyDeletes,
  isLoadingAddCompanies,
  onEditClick,
  toggleSelectedAllCompanies,
  isSelectedAllCompanies,
  onToggleSelectCompany,
  onDeleteCompany
}: CompaniesTableProps) => (
  <table className={cls.tableCompanies}>
    <TableHeader
      toggleSelectedAllCompanies={toggleSelectedAllCompanies}
      isSelectedAllCompanies={isSelectedAllCompanies }
    />
    <tbody>
      <CompaniesList
        companies={companies}
        onEditClick={onEditClick}
        isLoadingManyDeletes={isLoadingManyDeletes}
        onDeleteCompany={onDeleteCompany}
        onToggleSelectCompany={onToggleSelectCompany}
      />
      {isLoadingAddCompanies && <LoaderTable />}
    </tbody>
  </table>
);

