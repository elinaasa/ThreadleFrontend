import MediaRow from '../components/MediaRow';
import {PostItem} from '../types/DBtypes';

const Home = () => {
  const mediaArray: PostItem[] = [
    {
      post_id: 8,
      user_id: 5,
      filename: 'https://place-hold.it/1200x800.jpg&text=Pic1&fontsize=120',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb2&fontsize=20',
      filesize: 170469,
      media_type: 'image/jpeg',
      title: 'Picture 1',
      description: 'This is a placeholder picture.',
      created_at: '2024-01-07T20:49:34.000Z',
    },
    {
      post_id: 9,
      user_id: 7,
      filename: 'https://place-hold.it/800x600.jpg&text=Pic2&fontsize=72',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb3&fontsize=20',
      filesize: 1002912,
      media_type: 'image/jpeg',
      title: 'Pic 2',
      description: '',
      created_at: '2024-01-07T21:32:27.000Z',
    },
    {
      post_id: 17,
      user_id: 2,
      filename:
        'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb1&fontsize=20',
      filesize: 1236616,
      media_type: 'video/mp4',
      title: 'Bunny',
      description: 'Butterflies fly around the bunny.',
      created_at: '2024-01-07T20:48:13.000Z',
    },
  ];
  //console.log(mediaArray);

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
              Some text about the artist. Lorem Ipsum is simply dummy text of
              the printing and typesetting industry.
            </p>
            </div>
          </div>
          <div className="inner-div">
            <img className='artist-img artist-img-3' src="artist_3.jpg" />
        </div>
        </div>
        </div>
        <table>
          <tbody>
            {mediaArray.map((item) => (
              <MediaRow key={item.post_id} mediaItem={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
