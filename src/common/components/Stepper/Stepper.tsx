import React, { FC } from 'react';
import styles from './Stepper.module.sass';
import { ReactComponent as Arrow2RightIcon } from '../../../assets/images/icons/arrow2-right.svg';
import classNames from 'classnames';

export type StepId = string | number | undefined | null;

export interface Step {
  text: string;
  id: string | number;
  isAvailable: boolean;
}

interface StepperProps {
  steps: Step[];
  activeStep: Step;
  onStepChange?: (step: StepId) => void;
}

const Stepper: FC<StepperProps> = ({
  steps,
  onStepChange = () => {},
  activeStep,
}) => {
  const isStepCompleted = (step: Step) => {
    return (
      steps.findIndex((s) => s.id === step.id) <
      steps.findIndex((s) => s.id === activeStep.id)
    );
  };

  return (
    <div className={styles.stepper}>
      <div className='container'>
        <div className={styles.stepper__list}>
          {steps.map((step, index) => (
            <div className={styles.stepper__item} key={step.id}>
              <div
                className={classNames(styles.stepper__link, {
                  [styles['stepper__link--active']]: activeStep.id === step.id,
                  [styles['stepper__link--completed']]: isStepCompleted(step),
                  [styles['stepper__link--available']]: step.isAvailable,
                })}
                onClick={() =>
                  step.isAvailable ? onStepChange(step.id) : null
                }
              >
                {step.text}
              </div>
              {steps.length - 1 === index ? null : (
                <Arrow2RightIcon className={styles.stepper__item_icon} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Stepper;
