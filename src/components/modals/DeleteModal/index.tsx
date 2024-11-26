import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { Modal } from '../../shared/Modal';
import { clearDeleteIds } from 'src/store/modalDelete/index';
import { companiesApi } from 'src/api/requests/companies/api';
import { getDeleteIdsSelector } from 'src/store/modalDelete/selectors';
import cls from './style.module.scss';
import { DEFAULT_COMPANIES_LIMIT } from 'src/constants/companies';
import { setSelectAllCompanies } from 'src/store/companies';

export const ModalDelete = () => {
  const dispatch = useAppDispatch();
  const deleteIds = useAppSelector(getDeleteIdsSelector);
  const [fetchDelete, { isLoading }] = companiesApi.useDeleteCompaniesMutation();
  const [fetchCompanies] = companiesApi.useLazyGetCompaniesQuery();

  const onCloseModal = () => {
    dispatch(clearDeleteIds());
  };

  const onDeleteCompanies = () => {
    fetchDelete({
      ids: deleteIds
    }).then(() => {
      fetchCompanies({
        limit: DEFAULT_COMPANIES_LIMIT,
        lastCursor: 0
      });
      dispatch(setSelectAllCompanies(false));
      onCloseModal();
    });
  };

  const isOpened = deleteIds.length > 0;

  return (
    <Modal onClose={onCloseModal} isOpened={isOpened}>
      <div className={cls.modalDelete}>
        <span className={cls.title}>Вы уверены что хотите удалить компании?</span>
        <div className={cls.actions}>
          <button
            disabled={isLoading}
            className={cls.delete}
            onClick={onDeleteCompanies}
          >
            Удалить
          </button>
          <button onClick={onCloseModal} className={cls.cancel}>Отмена</button>
        </div>
      </div>
    </Modal>
  );
};
