import React from 'react';

const Home: React.FC = () => {
  return (
    <>
    <div>
      <div className='homediv'>
        <div className='homepallo'></div>
        <h1 className='home-text'>Threadle</h1>
      </div>
    </div>

    <div className='artists-box'>
      <div className='artist-profile'>
        <h3 className='artist-week'>Artist of the week</h3>
        <img src='..\public\artist.png' alt='Profile Photo' className='profile-photo' />
        <h1 className='artist-name'>Artist Name</h1>
        <p className='artist-text'>Some text about the artist. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
      <div className='artist-photo'>
        <img src='artist-photo.jpg' alt='Artist Photo' className='photo' />
      </div>
    </div>
    </>
  );
};

export default Home;
