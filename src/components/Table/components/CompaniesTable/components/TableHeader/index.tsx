import { memo } from 'react';
import { Checkbox } from 'src/components/shared/CustomCheckbox';

type TProps = {
    isSelectedAllCompanies: boolean;
    toggleSelectedAllCompanies: () => void;
}

export const TableHeader = memo(({
  isSelectedAllCompanies,
  toggleSelectedAllCompanies
}: TProps) =>  (
  <thead>
    <tr>
      <th>
        <Checkbox isChecked={isSelectedAllCompanies} onChange={toggleSelectedAllCompanies} />
      </th>
      <th>Название компании</th>
      <th>Адрес компании</th>
      <th>Действия</th>
    </tr>
  </thead>
));
