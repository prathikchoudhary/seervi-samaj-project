import { Controller, useFormContext } from 'react-hook-form';
import { Select as AntdSelect } from 'antd';

const { Option } = AntdSelect;

function Select({ name, label, option = [], error }) {
  const { control } = useFormContext();

  return (
    <div className="w-full">
      {label && (
        <label className={`block mb-1 font-medium ${error ? "text-red-500" : "text-gray-700"}`}>
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field }) => (
          <AntdSelect
            {...field}
            onChange={(value) => field.onChange(value)}
            status={error ? "error" : ""}
            className="w-full"
          >
            {option.map((opt) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </AntdSelect>
        )}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message || error}</p>}
    </div>
  );
}

export default Select;
