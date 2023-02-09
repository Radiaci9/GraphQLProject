import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import { GET_BOOK_QUERY } from '../queries/queries';

const BookDetails = ({bookId}) => {
  const {loading, data} = useQuery(GET_BOOK_QUERY, {variables: {id: bookId}});

  const bookDetails = useMemo(() => {
    if(loading) return 'Loading...';
    if (!data) return <div>No book selected...</div>;

    const book = data.book;

    return(
        <div>
            <h2>Book name: { book.name }</h2>
            <p>Genre: { book.genre }</p>
            <p>Author name: { book.author.name }</p>
            <p>All books by this author:</p>
            <ul className="other-books">
                { book.author.books.map(item => {
                    return <li key={item.id}>{ item.name }</li>
                })}
            </ul>
        </div>
    );
  }, [loading, data]);

  return(
    <div id="book-details">
      {bookDetails}
    </div>
  );
}

export default BookDetails;
