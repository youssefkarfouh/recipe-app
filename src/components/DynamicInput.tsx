import { Input } from "antd";


interface InputProps {
  type: string,
  placeholder: string
}
function DynamicInput({ type, placeholder }: InputProps) {
  return (

    <>

      {type === "text" && (
        <Input placeholder={placeholder} />
      )}
      {type === "password" && (
        <Input.Password placeholder={placeholder} />
      )}
    </>

  );
}

export default DynamicInput;
