import { memo } from 'react';
import { Checkbox } from 'src/components/shared/CustomCheckbox';
import cls from './style.module.scss';
import { TCompanyServer } from 'src/types/companies';
import classNames from 'classnames';

type TProps = {
  id: number;
  isSelected: boolean;
  isDisabled: boolean;
  name: string;
  address: string;
  onEditClick: (company: TCompanyServer) => void;
  onToggleSelectCompany: (id: number) => void;
  onDeleteCompany: (id: number) => void;
}

export const CompanyTable = memo(({
  id,
  isSelected,
  name,
  address,
  isDisabled,
  onEditClick,
  onDeleteCompany,
  onToggleSelectCompany
}: TProps) => {
  const handleChangeSelect = () => {
    onToggleSelectCompany(id);
  };

  const handleDelete = () => {
    onDeleteCompany(id);
  };

  const handleEdit = () => {
    onEditClick({ id, name, address });
  };

  return (
    <tr
      className={classNames(cls.company, {
        [cls.selected]: isSelected
      })}
    >
      <td>
        <Checkbox
          isChecked={isSelected}
          onChange={handleChangeSelect}
          disabled={isDisabled}
        />
      </td>
      <td title={name}>
        {name}
      </td>
      <td title={address}>
        {address}
      </td>
      <td title={address}>
        <button
          disabled={isDisabled}
          onClick={handleDelete}
          className={cls.deleteButton}
        >
          Удалить
        </button>
        <button
          className={cls.editButton}
          onClick={handleEdit}
        >
          Редактировать
        </button>
      </td>
    </tr>
  );
});
