import {useEffect, useState} from 'react';
import {useSaves} from '../hooks/apiHooks';
import {PostItem} from '../types/DBtypes';
import {Link} from 'react-router-dom';

const Folder = () => {
  const {getUserSavedPosts} = useSaves();

  const [savedPosts, setSavedPosts] = useState<PostItem[]>([]);

  const fetchSavedPosts = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const savedPosts = await getUserSavedPosts(token);
      if (savedPosts && savedPosts.length > 0) {
        setSavedPosts(savedPosts);
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
            {savedPosts && savedPosts.length > 0 ? (
              savedPosts.map((item) => (
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
