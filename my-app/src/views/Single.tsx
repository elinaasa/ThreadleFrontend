import {
  NavigateFunction,
  useLocation,
  useNavigate,
  Link,
} from 'react-router-dom';
import {MediaItemWithOwner, TagResult} from '../types/DBtypes';
import {useEffect, useState} from 'react';
import {useTags} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';
import {formatDistanceToNow} from 'date-fns';

const Single = () => {
  const {state} = useLocation();
  const {user} = useUserContext();
  const navigate: NavigateFunction = useNavigate();
  //console.log('single state', state);
  const item: MediaItemWithOwner = state;
  const {getTagsByPostId} = useTags();
  const [tags, setTags] = useState<TagResult[] | null>([]);

  const fetchTags = async (post_id: number) => {
    const tags = await getTagsByPostId(post_id);
    setTags(tags);
  };

  const openProfile = async (id: number) => {
    if (!user) return;
    if (user.user_id !== id) {
      navigate('/profile/' + id);
    } else {
      navigate('profile');
    }
  };

  useEffect(() => {
    fetchTags(item.post_id);
  }, []);

  return (
    <>
      <div className="single-container">
        <h2 onClick={() => openProfile(item.user_id)}>{item.username} </h2>
        {item.media_type.includes('video') ? (
          <video controls src={item.filename}></video>
        ) : (
          <img className="single-img" src={item.filename} alt={item.title} />
        )}
        <div className="single-info-container">
          <h3>{item.title}</h3>
          <p>{item.description}</p>

          <p>{formatDistanceToNow(item.created_at)} ago</p>
          <div>
            <p className="tags">
              {tags?.map((tag) => (
                <Link to={'/tagSearch/' + tag.tag_name}>{tag.tag_name}</Link>
              ))}
            </p>
          </div>
          <button
            className="back-button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={'../keyboard-enter-return.svg'} alt="search" />
            go back
          </button>
        </div>
      </div>
    </>
  );
};

export default Single;
