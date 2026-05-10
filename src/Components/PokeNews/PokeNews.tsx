import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { nanoid } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import { Post } from '../Post/Post';
import { Button } from '../UI/Button';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';
import { addPost, fetchPosts, loadMorePosts } from '../../Redux/pokeNews/pokeNewsOperations';
import { post } from '../../Redux/pokeNews/pokeNewsSlice';
import {
  selectPokeNewsPosts,
  selectPokeNewsLoading,
} from '../../Redux/pokeNews/pokeNewsSelectors';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import { isContentClean } from '../../ts/badWordsFIlter';
import { AppDispatch } from '../../Redux/store';
import css from './PokeNews.module.css';
import { LuRefreshCw, LuSend, LuPenLine } from 'react-icons/lu';

const PokeNews = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const posts = useSelector(selectPokeNewsPosts);
  const postsLoading = useSelector(selectPokeNewsLoading);
  const [postsNumber, setPostsNumber] = useState(20);
  const [composing, setComposing] = useState(false);

  useEffect(() => {
    if (posts.length !== 0) return;
    dispatch(fetchPosts());
  }, [dispatch, posts.length]);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const titleInput = form.elements.namedItem('title') as HTMLInputElement | null;
    const messageTextarea = form.elements.namedItem('msg') as HTMLTextAreaElement | null;
    const imgLinkInput = form.elements.namedItem('img') as HTMLInputElement | null;

    if (!messageTextarea?.value?.trim()) {
      Notiflix.Notify.warning('Add a message before publishing.');
      return;
    }

    if (!isContentClean(messageTextarea.value)) {
      Notiflix.Notify.failure('Bad language detected — please rephrase.');
      return;
    }

    const d = new Date();
    const stamp = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')} ${
      d.getDate()
    }.${d.getMonth() + 1}.${d.getFullYear()}`;

    const credentials: post = {
      author: user.username,
      title: titleInput?.value || 'Untitled',
      message: messageTextarea.value,
      imgLink: imgLinkInput?.value || '',
      id: nanoid(),
      date: stamp,
    };
    dispatch(addPost(credentials));
    form.reset();
    setComposing(false);
  };

  return (
    <div className={css.feed}>
      <header className={css.head}>
        <div>
          <span className={css.eyebrow}>Trainer Feed</span>
          <h2>Pokémon news & community</h2>
        </div>
        <div className={css.actions}>
          <Button
            variant="ghost"
            size="sm"
            iconLeft={<LuRefreshCw />}
            onClick={() => dispatch(fetchPosts())}
          >
            Refresh
          </Button>
          <Button
            variant={composing ? 'danger' : 'primary'}
            size="sm"
            iconLeft={<LuPenLine />}
            onClick={() => setComposing(p => !p)}
            disabled={!user.username}
          >
            {composing ? 'Cancel' : 'New post'}
          </Button>
        </div>
      </header>

      {composing && (
        <motion.form
          className={css.form}
          onSubmit={handleOnSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input className={css.input} name="title" placeholder="Title" required />
          <input className={css.input} name="img" placeholder="Image link (optional)" />
          <textarea className={css.textarea} name="msg" placeholder="Share something with the community" required />
          <Button type="submit" variant="primary" iconLeft={<LuSend />}>
            Publish
          </Button>
        </motion.form>
      )}

      <ul className={css.list}>
        {postsLoading ? (
          <PokeballLoader label="Loading posts" />
        ) : posts.length === 0 ? (
          <p className={css.empty}>No posts yet — be the first to share!</p>
        ) : (
          posts.map(post => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))
        )}
      </ul>

      {posts.length > 0 && (
        <div className={css.loadMore}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              dispatch(loadMorePosts(postsNumber));
              setPostsNumber(p => p + 10);
            }}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default PokeNews;
