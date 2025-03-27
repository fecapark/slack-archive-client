export const CodeBlock = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <pre className="my-1 rounded-sm border border-[rgba(29,28,29,0.13)] bg-[rgba(29,28,29,0.04)] p-2 text-xs text-[rgb(29,28,29)]">
      {children}
    </pre>
  )
}
