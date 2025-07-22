
type InputTypes = "text" | "email" | "password" | "number" | "tel";

interface InputProps {
    label: string;
    placeholder?: string;
    type: InputTypes;
    name: string;
    value: string | number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    length?: number;
    error? : boolean;
    errorMessage?: string;
    styleClass?: string;
    pattern?: string;
}

const  Input = ({ label,placeholder, type, name, value, onChange,length, error,errorMessage,styleClass,pattern} : InputProps) => {
    
    return (
        <div className="input-group w-full h-full flex flex-col my-2">
            <label className="input-group_label text-sm font-medium" htmlFor={name}>{label}</label>
            <input
            className={`input-group_input_field_${name} min-w-8 min-h-8 border-2 border-gray-200 rounded-md outline-none indent-2 caret-indigo-600 placeholder:text-sm ${styleClass}`}
            type={type} name={name} value={value}
            maxLength={length}
            max={50}
            min={1}
            minLength={1}
            placeholder={placeholder} onChange={onChange}
            pattern={pattern}
            />
            {error && <p className="input-group_error_message text-xs font-semibold text-red-400 ">{errorMessage}</p>}
        </div>
    );
}

export default Input;