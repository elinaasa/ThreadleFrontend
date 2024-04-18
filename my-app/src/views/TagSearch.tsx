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
        <div className="artists-box">
          <div className="container">
            <div className="inner-div-left">
              <div className="artist-profile">
                <h3 className="artist-week">Artist of the week</h3>
                <img
                  src="\artist.png"
                  alt="Profile Photo"
                  className="profile-photo"
                />
                <h1 className="artist-name">Artist Name</h1>
                <p className="artist-text">
                  Some text about the artist. Lorem Ipsum is simply dummy text
                  of the printing and typesetting industry.
                </p>
              </div>
            </div>
            <div className="inner-div">
              <img className="artist-img artist-img-3" src="artist_3.jpg" />
            </div>
          </div>
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
