import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBtypes';
import {useUserContext} from '../hooks/ContextHooks';

const MediaRow = (props: {item: MediaItemWithOwner}) => {
  const {item} = props;
  const {user} = useUserContext();
  console.log('user', user);
  return (
    <tr className="media-row">
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>{item.username}</td>
      <td>
        <Link to="/single" state={item}>
          View
        </Link>

        {user &&
          (user.user_id === item.user_id || user.level_name === 'Admin') && (
            <>
              <button
                className="bg-slate-700 p-2 hover:bg-slate-950"
                onClick={() => console.log('modify', item)}
              >
                Modify
              </button>
              <button
                className="bg-slate-700 p-2 hover:bg-slate-950"
                onClick={() => console.log('delete', item)}
              >
                Delete
              </button>
            </>
          )}
      </td>
    </tr>
  );
};

export default MediaRow;
