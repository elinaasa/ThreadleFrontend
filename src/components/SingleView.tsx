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
      <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
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
