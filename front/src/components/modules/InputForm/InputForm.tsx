import { FC } from "react";
import Icon from "../Icon/Icon";
import ErrorInput from "../ErrorInput/ErrorInput";

type InputFormProps = {
  inputClassName?: string;
  type: string;
  name: string;
  error?: string;
  accept?: string;
  disabled?: boolean;
  value?: string | number;
  txtLable?: string;
  nameIcon?: string;
  placeholder?: string;
} & (
  | {
      type?: "text" | "file" | "number" | "email" | "search" | "password";
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    }
  | {
      type: "textarea";
      onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
      onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    }
);

const InputForm: FC<InputFormProps> = (props) => {
  let elementType: React.ReactNode;
  if (props.type === "textarea") {
    elementType = (
      <textarea
        {...props}
        rows={10}
        cols={10}
        value={props.value}
        style={{ resize: "none", height: "100%" }}
        className={`size-full bg-transparent `}
      />
    );
  } else {
    elementType = (
      <input
        placeholder={props.placeholder}
        accept={props.accept}
        name={props.name}
        id={props.name}
        type={props.type}
        disabled={props.disabled}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        className={`size-full bg-transparent ${
          props.type === "number" && "text-ltr"
        }`}
        autoComplete="off"
      />
    );
  }

  return (
    <div className="space-y-2">
      {props.txtLable && (
        <label
          htmlFor={props.name}
          className="font-DanaDemiBold text-zinc-700 dark:text-white"
        >
          {props.txtLable}
        </label>
      )}
      <div className="space-y-2">
        <div
          className={`flex justify-between items-center h-14 p-2 text-base/[20px] text-zinc-700 dark:text-white bg-gray-100 dark:bg-zinc-700 dark:placeholder:text-gray-100 rounded-xl focus-within:border focus-within:border-bg-slate-500 dark:focus-within:border-bg-slate-400 ${
            props.inputClassName || ""
          }`}
        >
          {elementType}
          {props.nameIcon && (
            <Icon
              nameIcon={props.nameIcon}
              className="shrink-0 basis-[10%] text-slate-500 dark:text-slate-400"
            />
          )}
        </div>
        {props.error && <ErrorInput title={props.error} />}
      </div>
    </div>
  );
};

export default InputForm;
