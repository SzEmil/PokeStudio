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

  const handleOnClickDeletePost = () => {
    dispatch(deletePost(post.id));
  };
  return (
    <div className={css.card}>
      <p>{post.author}</p>
      <h2 className={css.title}>{post.title}</h2>
      <img className={css.image} src={post.imgLink} alt="pic" />

      <p className={css.description}>{post.message}</p>
      {username === 'yellowduck' ? (
        <button
          className={css.button}
          onClick={() => handleOnClickDeletePost()}
        >
          Delete post
        </button>
      ) : null}
    </div>
  );
};
