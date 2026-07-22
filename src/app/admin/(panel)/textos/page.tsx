import { createClient } from '@/lib/supabase/server'
import type { ConfigRow } from '@/types/db'
import { TituloPagina } from '../../_components/ui'
import TextosForm from './TextosForm'

export default async function TextosAdminPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('config').select('*')

  const valores = Object.fromEntries(
    ((data ?? []) as ConfigRow[]).map((row) => [row.clave, row.valor])
  )

  return (
    <div>
      <TituloPagina titulo="Textos del sitio" />
      <TextosForm valores={valores} />
    </div>
  )
}
