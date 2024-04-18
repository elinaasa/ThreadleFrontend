import {useEffect} from 'react';
// import {useTags} from '../hooks/apiHooks';
// import {TagResult} from '../types/DBtypes';
import {useNavigate} from 'react-router-dom';

const tags = [
  // If changed change in Upload.tsx
  'Beadwork',
  'Crocheting',
  'Knitting',
  'Macrame',
  'Quilting',
  'Sewing',
  'Spinning',
  'Weaving',
  'Woodworking',
  'Metalworking',
  'Pottery',
  'Glassblowing',
  'Jewelry',
];

const Search = () => {
  // const {getTags} = useTags();
  // const [tags, setTags] = useState<string[] | null>(DefaultHandicraftTags);
  const navigate = useNavigate();

  // const fetchTags = async () => {
  //   // const tags = await getTags();
  //   setTags(tags);
  // };

  const handleTagSearch = async (tag: string) => {
    navigate(`/tagSearch/${tag}`);
  };

  useEffect(() => {
    // fetchTags();
  }, []);

  return (
    <div className="p-header">
      <h1>Search</h1>
      <ul>
        {tags &&
          tags.map((tag, index) => {
            return (
              <li key={tag + '-' + index}>
                <button onClick={() => handleTagSearch(tag)}>
                  <label>{tag}</label>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Search;
