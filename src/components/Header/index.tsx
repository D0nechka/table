import { Actions } from './components/Actions';
import cls from './style.module.scss';

export const Header = () => (
  <div className={cls.header}>
    <h2>Компании</h2>
    <Actions/>
  </div>
);
