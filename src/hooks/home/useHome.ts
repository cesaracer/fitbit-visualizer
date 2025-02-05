import { useMemo, useState } from "react";
import axios from "axios";

function useHome() {
  const [activity, setActivity] = useState(null);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const activities = useMemo(() => {
    //GET DATA FROM FITBIT
    let dateMap = {};
    // const res = await axios.get("");
    // const resData = res.data?.activities;
    const resData = test.activities;

    resData.forEach((dataItem) => {
      const date = new Date(dataItem.originalStartTime);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const key = `${year}-${month}-${day}`;

      const activityDate = {
        steps: dataItem.steps,
        calories: dataItem.calories,
        activityName: dataItem.activityName,
        date: key,
        source: dataItem.source,
      };

      dateMap[key] = activityDate;
    });

    return dateMap;
  }, []);

  async function handleRetrieveData() {
    const res = await axios.get("");
    return res.data;
  }

  function handleRefreshToken() {
    //
  }

  function viewDetails() {
    //
  }

  function toggleModal() {
    //
  }

  return {
    actions: {
      toggleModal,
      viewDetails,
    },
    state: {
      activities,
      activity,
      isModalActive,
    },
  };
}

export { useHome };

const test = {
  pagination: {
    afterDate: "2024-12-31",
    limit: 1,
    next: "https://api.fitbit.com/1/user/-/activities/list.json?offset=1&limit=1&sort=desc&afterDate=2024-12-31",
    offset: 0,
    previous: "",
    sort: "desc",
  },
  activities: [
    {
      logId: 2907044112471568224,
      activityTypeId: 90013,
      activityName: "Walk",
      calories: 158,
      distance: 1.51788,
      steps: 2272,
      speed: 3.024,
      pace: 1190.4761904761906,
      averageHeartRate: 79,
      duration: 1810000,
      activeDuration: 1807000,
      activityLevel: [
        { minutes: 0, name: "sedentary" },
        { minutes: 16, name: "lightly" },
        { minutes: 6, name: "fairly" },
        { minutes: 8, name: "very" },
      ],
      distanceUnit: "Kilometer",
      source: {
        type: "tracker",
        name: "Google Pixel Watch 2",
        id: "F59FD4504541",
        url: "https://www.fitbit.com/",
        trackerFeatures: [
          "DISTANCE",
          "STEPS",
          "GPS",
          "PACE",
          "ELEVATION",
          "CALORIES",
          "HEARTRATE",
          "VO2_MAX",
        ],
      },
      logType: "tracker",
      manualValuesSpecified: {
        calories: false,
        distance: false,
        steps: false,
      },
      intervalWorkoutData: { intervalSummaries: [], numRepeats: 0 },
      heartRateZones: [
        {
          minutes: 30,
          caloriesOut: 158.359502,
          name: "Out of Range",
          min: 30,
          max: 220,
        },
        {
          minutes: 0,
          caloriesOut: 0.0,
          name: "Fat Burn",
          min: 30,
          max: 220,
        },
        {
          minutes: 0,
          caloriesOut: 0.0,
          name: "Cardio",
          min: 30,
          max: 220,
        },
        {
          minutes: 0,
          caloriesOut: 0.0,
          name: "Peak",
          min: 30,
          max: 220,
        },
      ],
      activeZoneMinutes: {
        totalMinutes: 0,
        minutesInHeartRateZones: [
          {
            minutes: 0,
            zoneName: "Out of Range",
            order: 0,
            type: "OUT_OF_ZONE",
            minuteMultiplier: 0,
          },
          {
            minutes: 0,
            zoneName: "Fat Burn",
            order: 1,
            type: "FAT_BURN",
            minuteMultiplier: 1,
          },
          {
            minutes: 0,
            zoneName: "Cardio",
            order: 2,
            type: "CARDIO",
            minuteMultiplier: 2,
          },
          {
            minutes: 0,
            zoneName: "Peak",
            order: 3,
            type: "PEAK",
            minuteMultiplier: 2,
          },
        ],
      },
      inProgress: false,
      caloriesLink:
        "https://api.fitbit.com/1/user/-/activities/calories/date/2025-02-03/2025-02-03/1min/time/11:57/12:28.json",
      heartRateLink:
        "https://api.fitbit.com/1/user/-/activities/heart/date/2025-02-03/2025-02-03/1sec/time/11:57:55/12:28:05.json",
      tcxLink:
        "https://api.fitbit.com/1/user/-/activities/2907044112471568224.tcx",
      lastModified: "2025-02-03T19:28:27.656Z",
      startTime: "2025-02-03T11:57:55.000-07:00",
      originalStartTime: "2025-02-03T11:57:55.000-07:00",
      originalDuration: 1810000,
      elevationGain: 7.01,
      hasActiveZoneMinutes: true,
      hasGps: true,
    },
  ],
};
