import {Link, useNavigate} from 'react-router-dom';
import {MediaItemWithOwner, TagResult} from '../types/DBtypes';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect, useState} from 'react';
import {useTags} from '../hooks/apiHooks';
import {formatDistanceToNow} from 'date-fns';

const MediaRow = (props: {item: MediaItemWithOwner}) => {
  const {item} = props;
  const {user} = useUserContext();
  console.log('user', user);
  const {getTagsByPostId} = useTags();
  const [tags, setTags] = useState<TagResult[] | null>([]);
  const navigate = useNavigate();

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
    <tr className="media-row">
      <td className="media-info">
        <td className="username" onClick={() => openProfile(item.user_id)}>
          {item.username}
        </td>
        <td className="media-buttons">
          {user &&
            (user.user_id === item.user_id || user.level_name === 'Admin') && (
              <>
                <button onClick={() => console.log('modify', item)}>
                  Modify
                </button>
                <button onClick={() => console.log('delete', item)}>
                  Delete
                </button>
              </>
            )}
        </td>
      </td>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <Link to="/single" state={item}>
        {item.title}
      </Link>
      <td>{item.description}</td>
      <td>{formatDistanceToNow(item.created_at)}</td>
      <td className="tags">
        {tags?.map((tag) => (
          <Link to={'/tagSearch/' + tag.tag_name}>{tag.tag_name}</Link>
        ))}
      </td>
    </tr>
  );
};

export default MediaRow;
