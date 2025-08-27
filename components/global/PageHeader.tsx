
const PageHeader = ({ title }: { title: string }) => {
  return (
    <h1 className="text-xl font-bold">{title ?? "Page Title"}</h1>
  )
}

export default PageHeader