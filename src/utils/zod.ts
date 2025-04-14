import { ZodError } from 'zod'

export const isZodError = (e: any): e is ZodError => e instanceof ZodError && e.name === 'ZodError'

export const getZodErrorMessage = (error: ZodError) => {
  return error.issues[0]?.message
}
