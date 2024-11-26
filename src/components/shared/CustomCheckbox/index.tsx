import { memo } from 'react';
import cls from'./style.module.scss';

type CheckboxProps = {
    isChecked: boolean,
    disabled?: boolean,
    onChange: () => void
}

export const Checkbox = memo(({ isChecked, disabled, onChange }: CheckboxProps) => {
  const checkboxClassName = `${cls.сustomCheckbox} ${disabled ? cls.disabled : ''}`;

  return(
    <label className={checkboxClassName}>
      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={cls.checkmark}></span>
    </label>
  );
});
