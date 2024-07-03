import styles from './pagination.module.css'

type paramsPagination = {
  currentPage: number
  totalPages: number
  totalItems: number
  paginate: (i: number) => void
}

const Pagination = ({ currentPage, totalPages, totalItems, paginate }: paramsPagination) => {
  // convert number of total pages to array
  let pageNums = []
  for (let i = 1; i <= totalPages; i++) {
    pageNums.push(i)
  }

  return <div className={styles.pagination}>
    <ul>
      {
        pageNums.map(num => (
          <li key={`pag-${num}`}>
            <button 
              className={`${styles.btn} ${currentPage === num && `${styles.active}`}`} 
              onClick={() => paginate(num)}>
                {num}
            </button>
          </li>
        ))
      }
    </ul>

    <p className={styles.total}>
      <strong>{totalItems}</strong> Results
    </p>
  </div>
}

export default Pagination