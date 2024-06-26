import {Link, useNavigate, useParams} from 'react-router-dom';
import {useMedia, useTheme, useUser} from '../hooks/apiHooks';
import {useChatContext, useUserContext} from '../hooks/ContextHooks';
import {useEffect, useState} from 'react';
import {
  CustomizeCredentials,
  MediaItemWithOwner,
  UserWithNoPassword,
} from '../types/DBtypes';

const Profile = (params: {
  lockControls: boolean | undefined;
  previewTheme?: CustomizeCredentials;
}) => {
  const {lockControls, previewTheme} = params;
  const {user} = useUserContext();
  const {getUserTheme} = useTheme();
  const {getUserById} = useUser();
  const {getMyMedia, getHighlightById, addHighlight} = useMedia();
  const [myMedia, setMyMedia] = useState<MediaItemWithOwner[] | null>([]);
  const [highlight, setHighlight] = useState<MediaItemWithOwner | null>(null);
  const [profileViewMode, setProfileViewMode] = useState<boolean>(false); // Disable profile controls on profile view mode only
  const [theme, setTheme] = useState<CustomizeCredentials | null>(null); // Disable profile controls on profile view mode only
  const [fetchUser, setFetchUser] = useState<UserWithNoPassword | null>(null); // If other users profile
  const {profileId} = useParams();
  const navigate = useNavigate();
  const {handleSetChatId, handleCreateChatConversation} = useChatContext();

  const fetchData = async () => {
    if (!user) return;
    const user_id = user.user_id;
    const media = await getMyMedia(profileId ? Number(profileId) : user_id);
    if (media) {
      setMyMedia(media);
    }

    // Get users highlight
    const highlight = await getHighlightById(
      profileId ? Number(profileId) : user_id,
    );

    if (highlight) {
      setHighlight(highlight);
    }
  };
  const fetchTheme = async () => {
    if (!user) return;
    const theme = await getUserTheme(
      profileId ? Number(profileId) : user?.user_id,
    );

    const themeToCredentials = {
      colors: theme.color1,
      fonts: theme.font1,
    };
    setTheme(themeToCredentials);
  };

  const fetchUserData = async () => {
    if (!profileId || !user) return;
    if (Number(profileId) !== user.user_id) {
      const otherUser = await getUserById(Number(profileId));
      setFetchUser(otherUser);
    }
  };

  const openChat = async () => {
    const token = localStorage.getItem('token');
    if (!token || !profileId) return;
    const chatCreationResponse = await handleCreateChatConversation(
      token,
      Number(profileId),
      null,
    );
    console.log('chatCreationResponse', chatCreationResponse);
    if (chatCreationResponse && 'chat_id' in chatCreationResponse) {
      handleSetChatId(chatCreationResponse.chat_id);
    } else {
      const chatCreationResponse = await handleCreateChatConversation(
        token,
        Number(profileId),
        null,
      );
      if (chatCreationResponse && 'chat_id' in chatCreationResponse) {
        handleSetChatId(chatCreationResponse.chat_id);
      }
    }
    navigate(`/messages`);
  };

  const highlightMedia = async (item: MediaItemWithOwner) => {
    console.log('highlightMedia');
    const token = localStorage.getItem('token');
    if (!token) return;
    const highlightResponse = await addHighlight(item.post_id, token);
    if (highlightResponse) {
      setHighlight(item);
    }
  };

  useEffect(() => {
    // On mount check if profile is on view mode
    if (lockControls === true) {
      setProfileViewMode(true);
    } else {
      fetchData();
      setProfileViewMode(false);
    }

    // On mount check if there are preview theme
    if (!previewTheme) {
      fetchTheme();
    }

    // If other user profile fetch his user data
    if (profileId) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (previewTheme) {
      setTheme(previewTheme);
    }
  }, [previewTheme]);

  useEffect(() => {
    console.log('ProfileView', profileViewMode);
  }, [profileViewMode]);
  return (
    <div
      className={
        profileViewMode
          ? 'theme-container' +
            ` theme-bg-${theme?.colors} theme-font-${theme?.fonts}`
          : 'theme-container' +
            ` theme-bg-${theme?.colors} theme-font-${theme?.fonts}`
      }
    >
      <header className={`${profileViewMode === false && 'p-header'}`}>
        {!fetchUser && profileViewMode === false && (
          <div className="p-settings">
            <li className="edit-icons">
              {profileViewMode === false ? (
                <Link className="folder-a" to="/folder">
                  <img
                    className="bookmark-svg"
                    src={'../bookmark.svg'}
                    alt="folder"
                  />
                </Link>
              ) : (
                <img
                  className="bookmark-svg"
                  src={'../bookmark.svg'}
                  alt="folder"
                />
              )}
            </li>
            <li className="edit-icons">
              {profileViewMode === false ? (
                <Link to="/upload">
                  <img src={'../plus.svg'} alt="settings" />
                </Link>
              ) : (
                <img src={'../plus.svg'} alt="settings" />
              )}
            </li>
            <li className="edit-icons">
              {profileViewMode === false ? (
                <Link to="/customize">
                  <img src={'../edit.svg'} alt="settings" />
                </Link>
              ) : (
                <img src={'../edit.svg'} alt="settings" />
              )}
            </li>
          </div>
        )}
      </header>

      <div className="p-div">
        <div>
          <div className="profile-pic-container">
            {!fetchUser ? (
              <img
                className="p-img"
                src={user?.pfp_url || '../artist.png'}
                alt="artist"
              />
            ) : (
              <img
                className="p-img"
                src={fetchUser?.pfp_url || '../artist.png'}
                alt="artist"
              />
            )}
            <div className="p-edit profile-edit">
              {/* {profileViewMode === false ? (
                <Link to="/customize">
                  <img src={'../edit.svg'} alt="settings" />
                </Link>
              ) : (
                <img src={'../edit.svg'} alt="settings" />
              )} */}
            </div>
          </div>

          <img src="" alt="" />
          <div className="username-row">
            <h1 className="p-h1">
              {fetchUser ? fetchUser.username : user?.username}
            </h1>
            {fetchUser && <p className="follow-btn">Follow</p>}
            {fetchUser && (
              <div onClick={openChat} className="p-chat-icon">
                <img className="menu-img" src={'../chat.svg'} alt="chat" />
              </div>
            )}
          </div>
          <div className="user-additional-info">
            <p
              className={
                profileViewMode === true
                  ? `activity activity-${theme?.user_activity === 'Do not disturb' ? 'Do-not-disturb' : theme?.user_activity}`
                  : `activity activity-${fetchUser ? fetchUser.user_activity : user?.user_activity === 'Do not disturb' ? 'Do-not-disturb' : user?.user_activity}`
              }
            >
              {profileViewMode === false
                ? fetchUser
                  ? fetchUser.user_activity
                  : user?.user_activity
                : theme?.user_activity}
            </p>
            <p
              className={
                profileViewMode === true
                  ? `level level-${theme?.user_level_id == 3 ? 'Seller' : 'Buyer'}`
                  : `level level-${fetchUser ? fetchUser.level_name : user?.level_name}`
              }
            >
              {profileViewMode === false
                ? fetchUser
                  ? fetchUser.level_name
                  : user?.level_name
                : theme?.user_level_id == 3
                  ? 'Seller'
                  : 'Buyer'}
            </p>
          </div>
        </div>
        <p className="p-text">
          {profileViewMode === false
            ? fetchUser
              ? fetchUser.description
              : user?.description
            : theme?.description}
        </p>
      </div>

      {profileViewMode === false && highlight !== null ? (
        <div className="p-box">
          <div className="highlight-container">
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
        <div className={`p-box`}>
          <div className="highlight-container">
            <div className="inner-div">
              <img
                className="highlight-img"
                src="https://placehold.co/100x100"
                alt="highlight-image"
              />
            </div>
            <div className="p-profile">
              <h3 className="highlight-text">No highlight yet</h3>
              <p className="highlight-text">
                This user does not have highlight linked on his profile
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="media-container">
        <div className="grid-container">
          {!profileViewMode && myMedia && myMedia.length > 0
            ? myMedia.map((item) => (
                <div style={{position: 'relative'}}>
                  {!fetchUser && (
                    <div className="p-images-star">
                      <img
                        onClick={() => highlightMedia(item)}
                        className="p-images-star"
                        src="./star.svg"
                        alt="highlight"
                      />
                    </div>
                  )}
                  <Link
                    className="p-image-container"
                    key={item.post_id}
                    to="/single"
                    state={item}
                  >
                    <img
                      className="p-images"
                      src={item.thumbnail}
                      alt={item.title}
                    />
                  </Link>
                </div>
              ))
            : profileViewMode === true && (
                <>
                  <img
                    key="media1"
                    className="p-images"
                    src="https://placehold.co/600x400"
                    alt="profile-media1"
                  />
                  <img
                    key="media2"
                    className="p-images"
                    src="https://placehold.co/600x400"
                    alt="profile-media2"
                  />
                  <img
                    key="media3"
                    className="p-images"
                    src="https://placehold.co/600x400"
                    alt="profile-media3"
                  />
                </>
              )}

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
    </div>
  );
};

export default Profile;
