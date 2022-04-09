import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './Stepper.module.sass';
import StepperItem from './StepperItem/StepperItem';

export type StepId = string | number | undefined | null;

export interface Step {
  text: string;
  id: string | number;
  isAvailable: boolean;
}

interface StepperProps extends React.ComponentPropsWithoutRef<'div'> {
  steps: Step[];
  activeStep: Step;
  onStepChange?: (step: StepId) => void;
}

const Stepper: FC<StepperProps> = ({
  steps,
  onStepChange = () => {},
  activeStep,
  className,
}) => {
  const isStepCompleted = (step: Step) => {
    return (
      steps.findIndex((s) => s.id === step.id) <
      steps.findIndex((s) => s.id === activeStep.id)
    );
  };

  return (
    <div className={classNames(styles.stepper, className)}>
      <div className='container'>
        <div className={styles.stepper__list}>
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={step}
              activeStep={activeStep}
              isLast={steps.length - 1 === index ? true : false}
              isStepCompleted={isStepCompleted(step)}
              onStepChange={onStepChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
