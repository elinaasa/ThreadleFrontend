/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useReducer} from 'react';
import {useSaves} from '../hooks/apiHooks';
import {MediaItemWithOwner, Save} from '../types/DBtypes';

type SaveState = {
  count: number;
  userSave: Save | null;
};

type SaveAction = {
  type: 'setSaveCount' | 'save';
  count?: number;
  save?: Save | null;
};

const saveInitialState: SaveState = {
  count: 0,
  userSave: null,
};

const saveReducer = (state: SaveState, action: SaveAction): SaveState => {
  switch (action.type) {
    case 'setSaveCount':
      return {...state, count: action.count ?? 0};
    case 'save':
      if (action.save !== undefined) {
        return {...state, userSave: action.save};
      }
      return state; // no change if action.save is undefined
  }
  return state; // Return the unchanged state if the action type is not recognized
};

const Saves = ({item}: {item: MediaItemWithOwner}) => {
  const [saveState, saveDispatch] = useReducer(saveReducer, saveInitialState);
  const {getUserSave, getSaves, postSave, deleteSave} = useSaves();

  // get user save
  const getUserSaves = async () => {
    const token = localStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    try {
      const userSave = await getUserSave(token, item.post_id);
      saveDispatch({type: 'save', save: userSave});
    } catch (e) {
      saveDispatch({type: 'save', save: null});
      // FAKE save object for testing only
      //saveDispatch({type: 'save', save: {save_id: 3, media_id: 5, user_id: 3, created_at: new Date()}});
      console.log('get user save error', (e as Error).message);
    }
  };

  // get save count
  const getSaveCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!item || !token) {
        return;
      }
      const countResponse = await getSaves(token, item.post_id);
      saveDispatch({type: 'setSaveCount', count: countResponse.count});
    } catch (e) {
      saveDispatch({type: 'setSaveCount', count: 0});
      console.log('get user save error', (e as Error).message);
    }
  };

  useEffect(() => {
    getUserSaves();
    getSaveCount();
  }, [item]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!item || !token) {
        return;
      }
      // If user has saved the media, delete the save. Otherwise, post the save.
      if (saveState.userSave) {
        // delete the save and dispatch the new save count to the state.
        await deleteSave(token, saveState.userSave.post_id);
        // Dispatching is already done in the getsaves and getsaveCount functions.
        // other way, is to do update locally after succesfull api call
        // for deleting it's ok because there is no need to get any data from the api
        saveDispatch({type: 'setSaveCount', count: saveState.count - 1});
        saveDispatch({type: 'save', save: null});
      } else {
        // post the save and dispatch the new save count to the state. Dispatching is already done in the getsaves and getsaveCount functions.
        await postSave(token, item.post_id);
        getUserSaves();
        getSaveCount();
      }
    } catch (e) {
      console.log('save error', (e as Error).message);
    }
  };

  console.log(saveState);

  return (
    <div className="save-container">
      <label className="save-count">{saveState.count}</label>
      <div className="" onClick={handleSave}>
        {saveState.userSave ? (
          <img
            className="media-info-save-img"
            src="../bookmark-fill.svg"
            alt="save"
          />
        ) : (
          <img
            className="media-info-save-img"
            src="../bookmark.svg"
            alt="save"
          />
        )}
      </div>
    </div>
  );
};

export default Saves;
