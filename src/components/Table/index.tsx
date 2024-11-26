import { getLastCursorSelector, getCompaniesSelector, getIsLoadingMultipleDeletesSelector, getIsSelectedAllCompaniesSelector, getisLoadingAddCompanies } from 'src/store/companies/selectors';
import { memo, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from 'src/hooks/redux';
import { useAppSelector } from 'src/hooks/redux';
import { companiesApi } from 'src/api/requests/companies/api';
import { DEFAULT_COMPANIES_LIMIT } from 'src/constants/companies';
import { toggleSelectAllCompanies, toggleSelectCompany } from 'src/store/companies/index';
import { Spin } from '../shared/Spin';
import { CompaniesTable } from './components/CompaniesTable';
import { TCompanyServer } from 'src/types/companies';
import cls from './style.module.scss';
import { addDeleteIds } from 'src/store/modalDelete';
import { CompaniesEmpty } from './components/CompaniesTable/components/CompaniesEmpty';

type TCompaniesTableProps = {
  onEditClick: (company: TCompanyServer) => void;
};

export const Table = memo(({ onEditClick }: TCompaniesTableProps) => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector(getCompaniesSelector);
  const lastCursorCompanies = useAppSelector(getLastCursorSelector);
  const isSelectedAllCompanies = useAppSelector(getIsSelectedAllCompaniesSelector);
  const isLoadingAddCompanies = useAppSelector(getisLoadingAddCompanies);
  const isLoadingManyDeletes = useAppSelector(getIsLoadingMultipleDeletesSelector);
  const [fetchCompanies, { isLoading }] = companiesApi.useLazyGetCompaniesQuery();
  const containerRef = useRef<HTMLDivElement>(null);

  const onScrollContainer = () => {
    const container = containerRef?.current;

    if (!container || isLoading || lastCursorCompanies === -1) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchCompanies({
        limit: DEFAULT_COMPANIES_LIMIT,
        lastCursor: lastCursorCompanies
      });
    }
  };

  const toggleSelectedAllCompanies = useCallback(() => {
    dispatch(toggleSelectAllCompanies());
  }, [dispatch]);

  const onToggleSelectCompany = useCallback((id: number) => {
    dispatch(toggleSelectCompany(id));
  }, [dispatch]);

  const onDeleteCompany = useCallback((id: number) => {
    dispatch(addDeleteIds([id]));
  }, [dispatch]);

  useEffect(() => {
    fetchCompanies({
      limit: DEFAULT_COMPANIES_LIMIT,
      lastCursor: lastCursorCompanies
    });
  }, []);

  if (isLoading) {
    return <Spin />;
  }

  if(!companies.length) {
    return <CompaniesEmpty />;
  }

  return (
    <div
      className={cls.tableCompaniesContainer}
      onScroll={onScrollContainer}
      ref={containerRef}
    >
      <CompaniesTable
        companies={companies}
        isLoadingManyDeletes={isLoadingManyDeletes}
        isLoadingAddCompanies={isLoadingAddCompanies}
        onEditClick={onEditClick}
        toggleSelectedAllCompanies={toggleSelectedAllCompanies}
        isSelectedAllCompanies={isSelectedAllCompanies}
        onDeleteCompany={onDeleteCompany}
        onToggleSelectCompany={onToggleSelectCompany}
      />
    </div>
  );
});
