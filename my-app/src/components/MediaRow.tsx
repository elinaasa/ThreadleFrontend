import {MediaItem} from "../types/DBtypes";

const MediaRow = (props: {mediaItem: MediaItem}) => {
  const item = props.mediaItem;
  return (
    <tr className="media-row">
      <td>{item.user_id}</td>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
    </tr>
  );
};

export default MediaRow;
