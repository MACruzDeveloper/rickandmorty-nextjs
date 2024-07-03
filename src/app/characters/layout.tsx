'use client'

import { ReactNode } from 'react'

export default function CharactersLayout({ children }: { readonly children: ReactNode }) {

  return (
    <section>
      {children}
    </section>
  )
}