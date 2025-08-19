import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = "",
    options = [],
    ...props
}, ref){

    // id is provided to link label and input

    const id = useId();
    
     return (
    <div className="w-full mb-2 md:mb-4">
      {label && (
        <label
          className="block mb-2 text-sm font-medium"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      {type === "select" ? (
        <select
          className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 md:p-2 lg:p-2.5 ${className}`}
          {...props}
          ref={ref}
          id={id}
        >
          <option value="">-- Select --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "radio" ? (
        <div className="flex gap-4">
          {options.map((opt) => (
            <label key={opt.value} className="flex items-center gap-1">
              <input
                type="radio"
                value={opt.value}
                {...props}
                ref={ref}
              />
              {opt.label}
            </label>
          ))}
        </div>
      ) : (
        <input
          type={type}
          className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 md:p-2 lg:p-2.5 ${className}`}
          {...props}
          ref={ref}
          id={id}
        />
      )}
    </div>
  );
})

export default Input;