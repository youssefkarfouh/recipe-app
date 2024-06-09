import { Button } from 'antd';
import { ReactNode } from 'react';


interface ButtonProps {
  children: ReactNode,
  btnType?: "button" | "submit" | "reset" | undefined,
  disabled?: boolean,
  loading: boolean
}
function ButtonDynamic({ children, btnType = "button", loading, disabled }: ButtonProps) {
  return (
    <Button type="primary"
      loading={loading}
      htmlType={btnType}
      disabled={disabled}
      className='bg-main hover:bg-black block w-full rounded-md  px-4 py-2 text-white transition-all'>
      {children}
    </Button>
  )
}

export default ButtonDynamic