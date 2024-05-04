import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import {useMedia, useUser} from '../hooks/apiHooks';
import {MediaItemWithOwner} from '../types/DBtypes';

const Home = () => {
  const {getMedia, getMediaById} = useMedia();
  const {getUserById} = useUser();
  const [media, setMedia] = useState<MediaItemWithOwner[] | null>([]);
  const [artistOfWeek, setArtistOfWeek] = useState<MediaItemWithOwner | null>(
    null,
  );
  const [artistOfWeekUserPfp, setArtistOfWeekUserPfp] = useState<string>('');

  // ARTIST OF THE WEEK POST_ID SELECTION
  const artistOfWeekPostId = 6;

  const fetchData = async () => {
    const media = await getMedia();
    if (media) {
      const invertedMedia = media.reverse();
      setMedia(invertedMedia);
    }

    const artistOfWeek = await getMediaById(artistOfWeekPostId);
    if (artistOfWeek) {
      setArtistOfWeek(artistOfWeek);
    }
    const artistOfWeekUserPfp = (await getUserById(artistOfWeek.user_id))
      .pfp_url;
    if (artistOfWeekUserPfp) {
      setArtistOfWeekUserPfp(artistOfWeekUserPfp);
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
        {artistOfWeek ? (
          <div className="artists-box">
            <div className="container">
              <div className="inner-div-left">
                <div className="artist-profile">
                  <h3 className="artist-week">Artist of the week</h3>
                  <img
                    src={
                      artistOfWeekUserPfp
                        ? artistOfWeekUserPfp
                        : '/' + 'artist.png'
                    }
                    alt="Profile Photo"
                    className="profile-photo"
                  />
                  <h1 className="artist-name">{artistOfWeek.username}</h1>
                  <p className="artist-text">
                    {artistOfWeek.description
                      ? artistOfWeek.description
                      : 'Some text about the artist. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
                  </p>
                </div>
              </div>
              <div className="inner-div">
                <img
                  className="artist-img artist-img-3"
                  src={
                    artistOfWeek.thumbnail
                      ? artistOfWeek.thumbnail
                      : '/' + 'artist.png'
                  }
                />
              </div>
            </div>
          </div>
        ) : (
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
        )}

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

export default Home;
