import Link from 'next/link'
import { FC } from 'react'
import { LiaAppleAltSolid } from 'react-icons/lia'

type LogoProps = {
  showTitle:boolean,
  className?:string,
  classNameTitle?:string,
}

const Logo:FC<LogoProps> = ({showTitle,className,classNameTitle}) => {
  return (
    <Link href="/" className={`flex items-center font-MorabbaMedium text-orange-300 ${className || ''}`}>
    <LiaAppleAltSolid className="size-14 shrink-0" />
    {showTitle && <span className={`text-2xl ${classNameTitle || ''}`}> میوه فروش</span>}
    
  </Link>
  )
}

export default Logo
