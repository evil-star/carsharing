import React, { FC } from 'react';
import { ReactComponent as Arrow2RightIcon } from '../../../../assets/images/icons/arrow2-right.svg';
import classNames from 'classnames';
import { Step, StepId } from '../Stepper';
import styles from './StepperItem.module.sass';

interface StepperItem {
  step: Step;
  activeStep: Step;
  isLast?: boolean;
  isStepCompleted?: boolean;
  onStepChange?: (step: StepId) => void;
}

const StepperItem: FC<StepperItem> = ({
  step,
  activeStep,
  isLast = false,
  isStepCompleted = false,
  onStepChange = () => {},
}) => {
  const stepperLinkClassNames = classNames(styles.stepper__link, {
    [styles['stepper__link--active']]: activeStep.id === step.id,
    [styles['stepper__link--completed']]: isStepCompleted,
    [styles['stepper__link--available']]: step.isAvailable,
  });

  return (
    <div className={styles.stepper__item} key={step.id}>
      <div
        className={stepperLinkClassNames}
        onClick={() => (step.isAvailable ? onStepChange(step.id) : null)}
      >
        {step.text}
      </div>
      {isLast ? null : (
        <Arrow2RightIcon className={styles.stepper__item_icon} />
      )}
    </div>
  );
};

export default StepperItem;
