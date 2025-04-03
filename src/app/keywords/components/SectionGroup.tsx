interface SectionGroupProps {
  title: string
}

export const SectionGroup = ({ children, title }: React.PropsWithChildren<SectionGroupProps>) => {
  return (
    <div className="flex flex-col items-center gap-16">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  )
}
