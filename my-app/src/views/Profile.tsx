import {Link, useNavigate} from 'react-router-dom';
import {useMedia} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect, useState} from 'react';
import {MediaItemWithOwner} from '../types/DBtypes';

const Profile = () => {
  const {user} = useUserContext();
  const {getMyMedia, getHighlightById} = useMedia();
  const [myMedia, setMyMedia] = useState<MediaItemWithOwner[] | null>([]);
  const [highlight, setHighlight] = useState<MediaItemWithOwner | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    if (!user) return;
    const user_id = user.user_id;
    const media = await getMyMedia(user_id);
    if (media) {
      setMyMedia(media);
    }

    // Get users highlight
    const highlight = await getHighlightById(user_id);

    if (highlight) {
      setHighlight(highlight);
    }
  };
  useEffect(() => {
    console.log('highlight123', highlight);
  }, [highlight]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    fetchData();
  }, []);
  return (
    <>
      <header className="p-header">
        <div className="p-settings">
          <ul className="p-settings"></ul>
          <li className="nav-li nav-icons">
            <Link to="/folder">
              <img src={'../folder.svg'} alt="folder" />
            </Link>
          </li>
          <li className="nav-li nav-icons">
            <Link to="/settings">
              <img src={'../settings p.svg'} alt="settings" />
            </Link>
          </li>
          <ul />
        </div>

        <div className="p-div">
          <div>
            <img className="p-img" src="../artist.png" alt="artist" />
            <Link to="/edit">
              <img className="p-edit" src="../edit.svg" alt="edit" />
            </Link>

            <img src="" alt="" />
            <h1 className="p-h1">{user?.username}</h1>
            <p className="p-text">{user?.description}</p>
          </div>

          {highlight !== null ? (
            <div className="p-box">
              <div className="container">
                <div className="inner-div">
                  <img
                    className="highlight-img"
                    src={highlight.thumbnail}
                    alt={highlight.title}
                  />
                </div>
                <div className="p-profile">
                  <h3 className="highlight-text">{highlight.title}</h3>
                  <p className="highlight-text">{highlight.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3>Add highlight by pressing star on post below</h3>
            </div>
          )}

          <div className="grid-container">
            {myMedia &&
              myMedia.map((item) => (
                <img
                  key={item.post_id}
                  className="p-images"
                  src={item.thumbnail}
                  alt={item.title}
                />
              ))}
            {/* <img className="p-images" src="../artist_3.jpg" alt="image1" />
            <img className="p-images" src="../artist_2.jpg" alt="image2" />
            <img className="p-images"src="../artist_1.jpg" alt="image3" />
            <img className="p-images" src="../artist_3.jpg" alt="image1" />
            <img className="p-images" src="../artist_2.jpg" alt="image2" />
            <img className="p-images"src="../artist_1.jpg" alt="image3" />
            <img className="p-images" src="../artist_3.jpg" alt="image1" />
            <img className="p-images" src="../artist_2.jpg" alt="image2" />
            <img className="p-images"src="../artist_1.jpg" alt="image3" /> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Profile;
