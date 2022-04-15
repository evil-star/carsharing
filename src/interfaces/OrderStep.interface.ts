import { OrderFormData } from '../pages/Order/Order';

export interface OrderLocationStepProps {
  values: OrderFormData;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}
