export const CodeBlock = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <pre className="text-slack-text-primary border-slack-stroke-decorative bg-slack-codeblock-bg my-1 rounded-sm border p-2 text-xs whitespace-pre-wrap">
      {children}
    </pre>
  )
}
