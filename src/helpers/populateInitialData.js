// @flow
import {AsyncStorage} from 'react-native';

import {BOOKMARKED_SCHEDULE_KEY} from '../constants/asyncStorageKey';

import exhibitorListJSON from '../fixtures/Exhibitor-fixture.js';

import convertArrayToMap from '../helpers/convertArrayToMap';

import type {Dispatch} from '../types';

export default async function populateInitialData(dispatch: Dispatch) {
  const requestSpeakers = await fetch('https://hackday-geekcamp-id.herokuapp.com/api/speakers.json');
  const requestSchedules = await fetch('https://hackday-geekcamp-id.herokuapp.com/api/schedules.json');
  const { speakers } = await requestSpeakers.json();
  const { schedules } = await requestSchedules.json();

  let bookmarkedScheduleListString = await AsyncStorage.getItem(
    BOOKMARKED_SCHEDULE_KEY,
  );
  let bookmarkedScheduleList =
    (bookmarkedScheduleListString && bookmarkedScheduleListString.split(',')) ||
    [];
  dispatch({
    type: 'INITIAL_DATA_RECEIVED',
    initialData: {
      presenterList: convertArrayToMap(speakers),
      scheduleList: convertArrayToMap(schedules),
      bookmarkedScheduleList,
      exhibitorList: convertArrayToMap(exhibitorListJSON),
    },
  });
}
