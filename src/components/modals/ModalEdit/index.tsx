import { ChangeEvent, useLayoutEffect, useState } from 'react';
import { Modal } from '../../shared/Modal';
import { companiesApi } from 'src/api/requests/companies/api';
import { DEFAULT_COMPANIES_LIMIT } from 'src/constants/companies';
import cls from './style.module.scss';
import { validate } from './utils/validate';
import { TCompanyServer, TCompanyValidate } from 'src/types/companies';

type EditCompanyModalProps = {
  isOpened: boolean;
  selectedCompany: TCompanyServer;
  onClose: () => void;
};

export const EditCompanyModal = ({
  isOpened,
  selectedCompany,
  onClose
}: EditCompanyModalProps) => {
  const [editCompany, { isLoading }] = companiesApi.useEditCompanyMutation();
  const [fetchCompanies] = companiesApi.useLazyGetCompaniesQuery();
  const [formData, setFormData] = useState<TCompanyValidate>({
    name: '',
    address: ''
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if (selectedCompany) {
      editCompany({
        id: selectedCompany.id,
        ...formData
      }).then(() => {
        fetchCompanies({
          limit: DEFAULT_COMPANIES_LIMIT,
          lastCursor: 0
        });
        onClose();
      });
    }
  };

  useLayoutEffect(() => {
    setFormData(selectedCompany);
  }, [selectedCompany]);

  const isDisabled = validate(selectedCompany, formData) || isLoading;

  return (
    <Modal isOpened={isOpened} onClose={handleClose}>
      <div className={cls.modalContent}>
        <h2>Редактировать компанию</h2>
        <input
          type="text"
          name="name"
          placeholder="Название компании"
          value={formData.name}
          onChange={handleChange}
          className={cls.input}
        />
        <input
          type="text"
          name="address"
          placeholder="Адрес компании"
          value={formData.address}
          onChange={handleChange}
          className={cls.input}
        />
        <div className={cls.buttons}>
          <button onClick={handleSave} disabled={isDisabled}>
            Сохранить
          </button>
          <button onClick={handleClose}>Отмена</button>
        </div>
      </div>
    </Modal>
  );
};
