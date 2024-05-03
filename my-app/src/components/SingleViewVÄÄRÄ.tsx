import {formatDistanceToNow} from 'date-fns';
import {PostItem} from '../types/DBtypes';

const SingleView = (props: {
  item: PostItem;
  setSelectedItem: (item: PostItem | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  return (
    <dialog open>
      <h3>{item.title}</h3> :
      <img src={item.filename} alt={item.title} />
      <p>{item.description}</p>
      <p>{formatDistanceToNow(item.created_at)}</p>
      <td className="tags">
        {tags?.map((tag) => (
          <Link to={'/tagSearch/' + tag.tag_name}>{tag.tag_name}</Link>
        ))}
      </td>
      <button
        onClick={() => {
          setSelectedItem(undefined);
        }}
      >
        close
      </button>
    </dialog>
  );
};
export default SingleView;
