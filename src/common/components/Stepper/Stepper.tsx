import React, { FC } from 'react';
import styles from './Stepper.module.sass';
import { ReactComponent as Arrow2RightIcon } from '../../../assets/images/icons/arrow2-right.svg';
import classNames from 'classnames';

type StepId = string | number | undefined | null;

export interface Step {
  text: string;
  id: StepId;
}

interface StepperProps extends React.ComponentPropsWithoutRef<'div'> {
  steps: Step[];
  activeStep: Step;
  onStepChange?: (step: Step) => void;
}

const Breadcrumbs: FC<StepperProps> = ({
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
          {steps.map((s, index) => (
            <div className={styles.stepper__item}>
              <div
                className={classNames(styles.stepper__link, {
                  [styles['stepper__link--active']]: activeStep.id === s.id,
                  [styles['stepper__link--completed']]: isStepCompleted(s),
                })}
                onClick={() => (isStepCompleted(s) ? onStepChange(s) : null)}
              >
                {s.text}
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
export default Breadcrumbs;
