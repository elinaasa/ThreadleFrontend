import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import {useMedia, useTags} from '../hooks/apiHooks';
import {MediaItemWithOwner} from '../types/DBtypes';
import {useNavigate, useParams} from 'react-router-dom';

const TagSearch = () => {
  const {getMediaByTag} = useTags();
  const {getMediaById} = useMedia();
  const [media, setMedia] = useState<MediaItemWithOwner[] | null>([]);
  const navigate = useNavigate();

  // get the tag from navigate params
  const {tag} = useParams();

  const fetchData = async () => {
    if (!tag) {
      navigate('/Search');
      return;
    }
    const tags = await getMediaByTag(tag);
    if (tags && tags.length > 0) {
      const media = tags.map(async (tag) => {
        const media = await getMediaById(tag.post_id);
        return media;
      });
      const resolvedMedia = await Promise.all(media);
      const invertedMedia = resolvedMedia.reverse();
      setMedia(invertedMedia);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="home">
        <div className="homediv">
          <div className="homepallo"></div>
          <h1 className="home-text">Threadle</h1>
        </div>
        <div>
          <button onClick={() => navigate('/Search')}>Back to search</button>
          <h1>Searching tag: {tag}</h1>
        </div>
        <table>
          <tbody>
            {media &&
              media.map((item) => <MediaRow key={item.post_id} item={item} />)}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TagSearch;
