import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeAddCompanyModal } from 'src/store/companies/index';
import { companiesApi } from 'src/api/requests/companies/api';
import { validateCreateForm } from './utils/validate';
import { DEFAULT_COMPANIES_LIMIT } from 'src/constants/companies';
import { useAppSelector } from 'src/hooks/redux';
import { getAddCompanyModalOpen } from 'src/store/companies/selectors';
import { Modal } from '../../shared/Modal';
import cls from './style.module.scss';
import { TCompanyValidate } from 'src/types/companies';

export const ModalCreate = () => {
  const dispatch = useDispatch();
  const isOpened = useAppSelector(getAddCompanyModalOpen);
  const [formData, setFormData] = useState<TCompanyValidate>({
    name: '',
    address: ''
  });
  const [fetchCreate, { isLoading }] = companiesApi.useCreateCompanyMutation();
  const [fetchCompanies] = companiesApi.useLazyGetCompaniesQuery();

  const handleCreate = () => {
    fetchCreate(formData).then(() => {
      dispatch(closeAddCompanyModal());
      fetchCompanies({
        limit: DEFAULT_COMPANIES_LIMIT,
        lastCursor: 0
      });
    });
  };

  const handleClose = () => {
    dispatch(closeAddCompanyModal());
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const isValidate = validateCreateForm(formData);

  return (
    <Modal isOpened={isOpened} onClose={handleClose}>
      <div className={cls.modalContent}>
        <h2>Добавить компанию</h2>
        <input
          type="text"
          name="name"
          placeholder="Название компании"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Адрес компании"
          value={formData.address}
          onChange={handleChange}
        />
        <div className={cls.modalButtons}>
          <button onClick={handleCreate} disabled={isLoading || !isValidate}>
            Добавить
          </button>
          <button onClick={handleClose}>Отмена</button>
        </div>
      </div>
    </Modal>
  );
};
