import { getAllEpisodes } from "@/data/getData"
import { groupBy } from '@/utils/utils'
import styles from './page.module.css'
import EpisodesList from "@/components/EpisodesList/EpisodesList"

export default async function EpisodesBySeason() {
  const allEpisodes = await getAllEpisodes()

  // add new fields seasion and num_episode to each episode
  for (let ele of allEpisodes) {
    ele['season'] = ele.episode.match(/(?<=S)\d+(?=E)/)[0]
    ele['num_episode'] = ele.episode.match(/(?<=E)\d+/)[0]
  }

  // group episodes by season
  const episodesGroupedBySeason = groupBy(allEpisodes, 'season')
  const seasons = Object.keys(episodesGroupedBySeason)
  const episodesBySeason = Object.values(episodesGroupedBySeason)

  return (
    <div className={styles.content}>
      <h2 className="title_page">Episodes by Season</h2>

      <ul className={styles.list_seasons}>
        {
          seasons.map((elem, idx) => {
            return <EpisodesList
              key={elem}
              elem={elem}
              episodesBySeason={episodesBySeason}
              idx={idx}
            />
          })
        }
      </ul>
    </div>
  )
}