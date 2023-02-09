import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS_QUERY } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const { loading, data } = useQuery(GET_BOOKS_QUERY);
  const [currentBookId, setCurrentBookId] = useState(null);

  const bookList = useMemo(() => {
    if (loading) return <div>Loading books...</div>

    return data?.books?.map(book => (
          <li key={ book.id } onClick={() => setCurrentBookId(book.id)}>{ book.name }</li>
      ))
  }, [loading, data])

  return(
    <div>
      <ul id="book-list">
        {bookList}
      </ul>
      {currentBookId && <BookDetails bookId={currentBookId} />}
    </div>
  );
}

export default BookList;
