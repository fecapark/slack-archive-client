export const MdLink = ({ children, href }: React.PropsWithChildren<{ href: string }>) => {
  return (
    <a
      className="text-[rgb(18,100,163)] hover:underline"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}
