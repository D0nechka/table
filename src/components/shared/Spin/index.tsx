import cls from './style.module.scss';

export const Spin = () =>  (
  <div className={cls.loaderWrapper}>
    <div className={cls.loader}></div>
  </div>
);
