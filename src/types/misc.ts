export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

const empty = {} as const // eslint-disable-line
export type OptionalPropsWhenEmptyObject<S> = typeof empty extends S ? [p?: S] : [p: S]
