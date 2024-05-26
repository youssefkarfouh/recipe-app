import { Button } from 'antd';
import { ReactNode } from 'react';


interface ButtonProps{
  children : ReactNode , 
  btnType : "button" | "submit" | "reset" | undefined
}
function ButtonDynamic({children , btnType}:ButtonProps) {
  return (
    <Button type="primary" htmlType={btnType} className='bg-main hover:bg-black block w-full rounded-md  px-4 py-2 text-white transition-all'>
       {children}
      </Button>
  )
}

export default ButtonDynamic