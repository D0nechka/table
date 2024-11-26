import { getCompaniesSelector } from 'src/store/companies/selectors';
import { useAppSelector } from 'src/hooks/redux';
import { useDispatch } from 'react-redux';
import { openAddCompanyModal } from 'src/store/companies/index';
import { addDeleteIds } from 'src/store/modalDelete';
import cls from './style.module.scss';

export const Actions = () => {
  const dispatch = useDispatch();
  const selectedCompanies = useAppSelector(getCompaniesSelector).filter(({ isSelected }) => isSelected);

  const onDeleteCompanies = () => {
    dispatch(addDeleteIds(selectedCompanies.map(({ id }) => id)));
  };

  const isHasSelectedCompanies = selectedCompanies.length > 0;
  const handleOpenModal = () => dispatch(openAddCompanyModal());

  return (
    <div className={cls.actions}>
      <button
        className={cls.deleteButton}
        disabled={!isHasSelectedCompanies}
        onClick={onDeleteCompanies}
      >
        Удалить ({selectedCompanies.length})
      </button>
      <button
        className={cls.createButton}
        onClick={handleOpenModal}
      >
        Создать
      </button>
    </div>
  );
};

