const config = {
  '**/*.{js,jsx,ts,tsx}': (stagedFiles) => {
    const filteredStagedFiles = stagedFiles
      .filter((file) => {
        const isGenerated = file.includes('__generated__') || file.includes('.gen.')
        return !isGenerated
      })
      .join(' ')

    return filteredStagedFiles
      ? [`eslint --fix ${filteredStagedFiles}`, `prettier --write ${filteredStagedFiles}`]
      : []
  },
}

export default config
