import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerParams {
  name: string;
  isInvalid: boolean;
  minDate?: Date;
  maxDate?: Date;
}

function className(isInvalid: boolean) {
  let className = 'form-control w-25';
  if (isInvalid) {
    className += ' is-invalid';
  }
  return className;
}

export default function DateTimePickerField(props: DateTimePickerParams) {
  const { isInvalid } = props;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      className={className(isInvalid)}
      showTimeSelect
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      isClearable={false}
      dateFormat='d. MMMM, hh:mm'
    />
  );
}
