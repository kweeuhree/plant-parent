//dynamic segment
'use client'
//import categories -------------------------------------------------
import Link from 'next/link'


// declare the function, destructure and define type
const page = ({ params }: { params: { name: string } }) => {
  return (
    <div>{params.name}</div>
  )
}

export default page;