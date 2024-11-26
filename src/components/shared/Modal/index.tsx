import { MouseEvent, ReactNode } from 'react';
import cls from './style.module.scss';

type TProps = {
  isOpened: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export const Modal = ({ children, onClose, isOpened }: TProps) => {
  const handleClickOverlay = () => {
    onClose();
  };

  const handleClickWrapper = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if(!isOpened) {
    return null;
  }

  return (
    <div className={cls.modal} onClick={handleClickOverlay}>
      <div className={cls.modalWrapper} onClick={handleClickWrapper}>
        {children}
      </div>
    </div>
  );
};
