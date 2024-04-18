import {NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import {MediaItemWithOwner, TagResult} from '../types/DBtypes';
import {useEffect, useState} from 'react';
import {useTags} from '../hooks/apiHooks';

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  //console.log('single state', state);
  const item: MediaItemWithOwner = state;
  const {getTagsByPostId} = useTags();
  const [tags, setTags] = useState<TagResult[] | null>([]);

  const fetchTags = async (post_id: number) => {
    const tags = await getTagsByPostId(post_id);
    setTags(tags);
  };
  useEffect(() => {
    fetchTags(item.post_id);
  }, []);

  return (
    <>
      <h3>{item.title}</h3>
      {item.media_type.includes('video') ? (
        <video controls src={item.filename}></video>
      ) : (
        <img src={item.filename} alt={item.title} />
      )}
      <p>{item.description}</p>
      <p>
        Uploaded at: {new Date(item.created_at).toLocaleString('fi-FI')}, by:{' '}
        {item.username}{' '}
      </p>
      <p>{item.filesize}</p>
      <p>{item.media_type}</p>
      <div>
        <p>Tags:</p>
        {tags?.map((tag, index) => (
          <span key={tag.tag_id} className="tag">
            {index < tags.length - 1 ? tag.tag_name + ', ' : tag.tag_name}
          </span>
        ))}
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        go back
      </button>
    </>
  );
};

export default Single;
