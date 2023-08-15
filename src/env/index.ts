import 'dotenv/config'
import z from 'zod'

const envBodySchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod']),
  PORT: z.coerce.number().default(8080)
})

const _env = envBodySchema.safeParse(process.env)

if(_env.success === false){
  console.log('Enverimont invalid !')

  throw new Error("Enverimont invalid!! \n" + _env.error.format())
}

export const env =  _env.data