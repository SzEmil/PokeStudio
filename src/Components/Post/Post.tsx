import css from './Post.module.css';
import { post } from '../../Redux/pokeNews/pokeNewsSlice';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { deletePost } from '../../Redux/pokeNews/pokeNewsOperations';

type postPropType = {
  post: post;
};
export const Post = ({ post }: postPropType) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const username = user.username;

  const handleOnClickDeletePost = (postId: string | number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(postId));
    }
  };
  return (
    <div className={css.card}>
      <div className={css.postInfo}>
        <p className={css.author}>{post.author}</p>
        <p className={css.author}>{post.date}</p>
      </div>
      <h2 className={css.title}>{post.title}</h2>
      <div className={css.imgBox}>
        <img className={css.image} src={post.imgLink} alt="pic" />
        <p className={css.source}>src: {post.imgLink}</p>
      </div>

      <p className={css.description}>{post.message}</p>
      {username === 'yellowduck' || username === post.author ? (
        <button
          className={css.button}
          onClick={() => handleOnClickDeletePost(post.id)}
        >
          Delete post
        </button>
      ) : null}
    </div>
  );
};
