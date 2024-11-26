import { DEFAULT_COMPANIES_LIMIT } from 'src/constants/companies';

export const LoaderTable = () => (
  <>
    {Array.from({ length: DEFAULT_COMPANIES_LIMIT }).map((_, index) => (
      <tr key={index}>
        <td>
          *
        </td>
        <td>
          ***********
        </td>
        <td >
          *****
        </td>
        <td>
          <button disabled>Удалить</button>
          <button disabled>Редактировать</button>
        </td>
      </tr>
    ))}
  </>
);
