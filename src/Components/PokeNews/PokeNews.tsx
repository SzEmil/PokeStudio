import css from './PokeNews.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { addPost } from '../../Redux/pokeNews/pokeNewsOperations';
import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import { post } from '../../Redux/pokeNews/pokeNewsSlice';
import { selectPokeNewsPosts } from '../../Redux/pokeNews/pokeNewsSelectors';
import { selectPokeNewsLoading } from '../../Redux/pokeNews/pokeNewsSelectors';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';
import { Post } from '../Post/Post';
import { useEffect } from 'react';
import { fetchPosts } from '../../Redux/pokeNews/pokeNewsOperations';
import { isContentClean } from '../../ts/badWordsFIlter';
import Notiflix from 'notiflix';
import { GrFormRefresh } from 'react-icons/gr';
import { useState } from 'react';
import { loadMorePosts } from '../../Redux/pokeNews/pokeNewsOperations';
// const [isOverviewOpen, setIsOverviewOpen] = useState(false);
const PokeNews = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const userName = user.username;
  const posts = useSelector(selectPokeNewsPosts);

  const postsLoading = useSelector(selectPokeNewsLoading);

  const [postsNumber, setPostsNumber] = useState(20);
  useEffect(() => {
    if (posts.length !== 0) return;
    console.log('fetching posts');
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const titleInput = form.elements.namedItem(
      'title'
    ) as HTMLInputElement | null;
    const messageTextarea = form.elements.namedItem(
      'msg'
    ) as HTMLTextAreaElement | null;
    const imgLinkInput = form.elements.namedItem(
      'img'
    ) as HTMLInputElement | null;

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Dodajemy 1, ponieważ indeks miesiąca zaczyna się od 0 (styczeń to 0, luty to 1 itd.)
    const day = currentDate.getDate();

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    if (isContentClean(messageTextarea!.value)) {
      const credentials: post = {
        author: userName,
        title: titleInput?.value || '',
        message: messageTextarea?.value || '',
        imgLink: imgLinkInput?.value || '',
        id: nanoid(),
        date: `${hours}:${minutes} ${day}.${month}.${year}`,
      };
      dispatch(addPost(credentials));
      form.reset();
    } else {
      return Notiflix.Notify.failure('You cant use bad words!!');
    }
  };

  const handleOnClickRefreshTable = () => {
    dispatch(fetchPosts());
  };

  const handleOnClickLoadMorePosts = () => {
    dispatch(loadMorePosts(postsNumber));
    setPostsNumber(prevVal => prevVal + 10);
  };
  return (
    <div className={css.table}>
      <h2>Add post</h2>

      <form className={css.form} onSubmit={handleOnSubmit}>
        <input
          name="title"
          className={css.input}
          type="text"
          placeholder="Title"
        />
        <input
          name="img"
          className={css.input}
          type="text"
          placeholder="Link to picture"
        />
        <textarea name="msg" className={css.textarea} placeholder="Message" />
        <button className={css.button} type="submit">
          Submit
        </button>
      </form>
      <button
        onClick={() => handleOnClickRefreshTable()}
        className={css.refreshBtn}
      >
        <GrFormRefresh size={'24px'} />
      </button>
      <ul className={css.list}>
        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : postsLoading ? (
          <PokeballLoader />
        ) : (
          posts.map(post => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))
        )}
      </ul>
      <button
        onClick={() => handleOnClickLoadMorePosts()}
        className={css.button}
      >
        Load more
      </button>
    </div>
  );
};

export default PokeNews;
