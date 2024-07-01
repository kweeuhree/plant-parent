//dynamic segment

// declare the function, destructure and define type
const page = ({ params }: { params: { name: string } }) => {
  return (
    <div>{params.name}</div>
  )
}

export default page;