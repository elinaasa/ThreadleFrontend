import {Link, useNavigate} from 'react-router-dom';
import {MediaItemWithOwner, TagResult} from '../types/DBtypes';
import {useChatContext, useUserContext} from '../hooks/ContextHooks';
import {useEffect, useState} from 'react';
import {useTags, useUser} from '../hooks/apiHooks';
import {formatDistanceToNow} from 'date-fns';

const MediaRow = (props: {item: MediaItemWithOwner}) => {
  const {item} = props;
  const {user} = useUserContext();
  console.log('user', user);
  const {getTagsByPostId} = useTags();
  const [tags, setTags] = useState<TagResult[] | null>([]);
  const navigate = useNavigate();
  const {handleCreateChatConversation, handleSetChatId} = useChatContext();
  const [userPfp, setUserPfp] = useState<string | null>('');
  const {getUserById} = useUser();

  const fetchTags = async (post_id: number) => {
    const tags = await getTagsByPostId(post_id);
    setTags(tags);
  };
  const fetchUserPfp = async () => {
    const user = await getUserById(item.user_id);
    if (user) {
      setUserPfp(user.pfp_url);
    }
  };

  const openProfile = async (id: number) => {
    if (!user) return;
    if (user.user_id !== id) {
      navigate('/profile/' + id);
    } else {
      navigate('profile');
    }
  };
  const openChat = async () => {
    const token = localStorage.getItem('token');
    if (!token || !item.user_id) return;
    const chatCreationResponse = await handleCreateChatConversation(
      token,
      item.user_id,
      item.post_id,
    );
    console.log('chatCreationResponse', chatCreationResponse);
    if (chatCreationResponse && 'chat_id' in chatCreationResponse) {
      handleSetChatId(chatCreationResponse.chat_id);
    } else {
      const chatCreationResponse = await handleCreateChatConversation(
        token,
        item.user_id,
        item.post_id,
      );
      if (chatCreationResponse && 'chat_id' in chatCreationResponse) {
        handleSetChatId(chatCreationResponse.chat_id);
      }
    }
    navigate(`/messages`);
  };

  useEffect(() => {
    fetchTags(item.post_id);
    fetchUserPfp();
    // get user pfp
  }, []);
  return (
    <tr className="media-row">
      <td className="media-info">
        <td>
          <img
            className="media-row-img"
            src={userPfp || './artist.png'}
            alt={item.title}
          />
        </td>
        <td className="username" onClick={() => openProfile(item.user_id)}>
          {item.username}
        </td>
        {/* <td className="media-buttons">
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
        </td> */}
      </td>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      {item.user_id !== user?.user_id && (
        <td className="media-contact-td" onClick={openChat}>
          <div className="media-contact-container">
            <img src="../chat.svg" alt="chatIcon" />
            <p>Ask about Item</p>
          </div>
        </td>
      )}
      <Link className="media-row-title" to="/single" state={item}>
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
