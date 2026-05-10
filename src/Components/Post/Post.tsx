import css from './Post.module.css';
import { post } from '../../Redux/pokeNews/pokeNewsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import { AppDispatch } from '../../Redux/store';
import { deletePost } from '../../Redux/pokeNews/pokeNewsOperations';
import { LuTrash2 } from 'react-icons/lu';

type postPropType = { post: post };

export const Post = ({ post }: postPropType) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const username = user.username;
  const canDelete = username === 'yellowduck' || username === post.author;

  const handleDelete = (postId: string | number) => {
    if (window.confirm('Delete this post?')) {
      dispatch(deletePost(postId));
    }
  };

  const initial = (post.author ?? '?').charAt(0).toUpperCase();

  return (
    <article className={css.card}>
      <header className={css.head}>
        <div className={css.author}>
          <span className={css.avatar}>{initial}</span>
          <div>
            <strong>{post.author}</strong>
            <span className={css.date}>{post.date}</span>
          </div>
        </div>
        {canDelete && (
          <button
            type="button"
            className={css.delete}
            onClick={() => handleDelete(post.id)}
            aria-label="Delete post"
          >
            <LuTrash2 size={16} />
          </button>
        )}
      </header>

      {post.title && <h3 className={css.title}>{post.title}</h3>}

      {post.imgLink && (
        <div className={css.imgBox}>
          <img className={css.image} src={post.imgLink} alt={post.title || 'post'} loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />
        </div>
      )}

      <p className={css.description}>{post.message}</p>
    </article>
  );
};
