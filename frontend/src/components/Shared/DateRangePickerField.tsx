import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerParams {
  startName: string;
  endName: string;
  isInvalid: boolean;
}

function className(isInvalid: boolean) {
  let className = 'form-control w-25';
  if (isInvalid) {
    className += ' is-invalid';
  }
  return className;
}

export default function DateRangePickerField(props: DateRangePickerParams) {
  const { startName, endName, isInvalid } = props;
  const { setFieldValue } = useFormikContext();
  const [startField] = useField(startName);
  const [endField] = useField(endName);

  return (
    <DatePicker
      selectsRange={true}
      id={startField.name}
      name={startField.name}
      startDate={startField.value}
      endDate={endField.value}
      className={className(isInvalid)}
      onChange={(update) => {
        const [startValue, endValue] = update;
        setFieldValue(startName, startValue);
        setFieldValue(endName, endValue);
      }}
      isClearable={false}
    />
  );
}
