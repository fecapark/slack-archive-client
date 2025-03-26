const datasetPrefix = 'data-'

export const parseDataset = (props: React.HTMLAttributes<HTMLElement>) => {
  const dataset: Record<string, boolean | string> = {}
  for (const key in props) {
    if (key.startsWith(datasetPrefix)) {
      dataset[key.replace(datasetPrefix, '')] = props[key as keyof typeof props]
    }
  }
  return dataset
}
