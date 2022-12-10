import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerParams {
  startName: string;
  endName: string;
}

export default function DateRangePickerField(props: DateRangePickerParams) {
  const { startName, endName } = props;
  const { setFieldValue } = useFormikContext();
  const [startField] = useField(startName);
  const [endField] = useField(endName);

  return (
    <DatePicker
      selectsRange={true}
      startDate={startField.value}
      endDate={endField.value}
      onChange={(update) => {
        const [startValue, endValue] = update;
        setFieldValue(startName, startValue);
        setFieldValue(endName, endValue);
      }}
      isClearable={true}
    />
  );
}
