import React from 'react';
import classNames from 'classnames';
import {
  ClearIndicatorProps,
  default as ReactSelect,
  GroupBase,
  Props,
} from 'react-select';
import styles from './Select.module.sass';
import { ReactComponent as CrossIcon } from '../../../assets/images/icons/cross.svg';

interface CustomSelectProps {
  sideLabel?: string | JSX.Element;
  selectClassName?: string;
}

export interface Option {
  label: string | number;
  value: string | number;
}

const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  sideLabel,
  selectClassName,
  isClearable = true,
  ...rest
}: Props<Option, IsMulti, Group> & CustomSelectProps) => {
  const ClearIndicator = ({
    clearValue,
  }: ClearIndicatorProps<Option, IsMulti, Group>) => (
    <div onClick={clearValue} className={styles.select__clear}>
      <CrossIcon />
    </div>
  );

  return (
    <div className={styles.select_wrapper}>
      {sideLabel && (
        <div className={styles.select__side_label}>{sideLabel}</div>
      )}

      <ReactSelect
        {...rest}
        isClearable
        loadingMessage={() => 'Загрузка...'}
        noOptionsMessage={() => 'Не найдено'}
        components={{ DropdownIndicator: null, ClearIndicator }}
        className={classNames(styles.select, selectClassName)}
        classNamePrefix={styles.select}
      />
    </div>
  );
};

export default Select;
