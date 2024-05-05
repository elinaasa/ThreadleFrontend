import {useEffect, useState} from 'react';
import {useSaves, useUser} from '../hooks/apiHooks';
import {MediaItemWithOwner, UserWithNoPassword} from '../types/DBtypes';
import {Link} from 'react-router-dom';

const Folder = () => {
  const {getUserSavedPosts} = useSaves();
  const {getUserById} = useUser();

  const [saved, setSaved] = useState<MediaItemWithOwner[]>([]);

  const fetchSavedPosts = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const savedPosts = await getUserSavedPosts(token);
      if (savedPosts && savedPosts.length > 0) {
        // setSavedPosts(savedPosts);
        // get user info for each post
        const users = await Promise.all(
          savedPosts.map((post) => getUserById(post.user_id)),
        );

        // convert postItem to MediaItemWithOwner
        const savedWithUser: MediaItemWithOwner[] = savedPosts.map(
          (post, index) => {
            const user: UserWithNoPassword = users[index];
            return {
              ...post,
              username: user.username,
            };
          },
        );
        setSaved(savedWithUser);
      }
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);
  return (
    <div className="p-header">
      <h1 className="folder-title">Saves</h1>
      <div>
        <div className="media-container">
          <div className="grid-container">
            {saved && saved.length > 0 ? (
              saved.map((item) => (
                <Link key={item.post_id} to="/single" state={item}>
                  <img
                    className="p-images"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </Link>
              ))
            ) : (
              <>
                <p className="no-saves-text">Save posts to view them here</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Folder;
