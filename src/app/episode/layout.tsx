import { ReactNode } from 'react'

export default function EpisodeLayout({
  children
}: {
  readonly children: ReactNode
}) {

  return (
    <section>
      {children}
    </section>
  )
}