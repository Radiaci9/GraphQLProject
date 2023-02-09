import React, { useMemo, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_BOOK_MUTATION, GET_AUTHORS_QUERY, GET_BOOKS_QUERY } from '../queries/queries';

const AddBook = () => {
  const { loading, data } = useQuery(GET_AUTHORS_QUERY);
  const [addBook] = useMutation(ADD_BOOK_MUTATION, {
    refetchQueries: [
      // {query: GET_BOOKS_QUERY},
      'GetBooks',
    ]
  });
  const nameRef = useRef();
  const genreRef = useRef();
  const authorIdRef = useRef();

  const authors = useMemo(() => {
    if (loading) return <option disabled>Loading authors</option>;

    return data.authors.map(author => (
      <option key={author.id} value={author.id}>{ author.name }</option>
    ));
  }, [loading, data])

  const submitForm = async (e) => {
    e.preventDefault()
    const name = nameRef.current.value;
    const genre = genreRef.current.value;
    const authorId = authorIdRef.current.value;

    if (!name || !genre || !authorId) return;
    
    await addBook({
      variables: {
        name,
        genre,
        authorId
      },
      // refetchQueries: [
      //   // {query: GET_BOOKS_QUERY},
      //   // 'GetBooks',
      // ]
    });
  }

  return(
    <form id="add-book" onSubmit={submitForm} >
        <div className="field">
            <label>Book name:</label>
            <input ref={nameRef} type="text" />
        </div>
        <div className="field">
            <label>Genre:</label>
            <input ref={genreRef} id="genre" type="text" />
        </div>
        <div className="field">
            <label>Author:</label>
            <select ref={authorIdRef} id="author">
                <option value=''>Select author</option>
                {authors}
            </select>
        </div>
        <button>+</button>
    </form>
  );
}

export default AddBook;
