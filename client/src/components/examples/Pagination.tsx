import Pagination from '../Pagination'

export default function PaginationExample() {
  return (
    <Pagination
      currentPage={2}
      totalPages={5}
      onPageChange={(page) => console.log('Page changed:', page)}
    />
  )
}
