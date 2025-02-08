import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  CalendarItem,
  FitbitActivity,
  FitbitActivitySingle,
  FitbitChartItem,
} from "../../types/types";

function useHome() {
  const [activityData, setActivityData] = useState<FitbitChartItem[] | null>(
    null
  );

  function handleDataParse(data: FitbitActivity[]) {
    const fitbitData = data;

    const durationData: FitbitChartItem[] = [];

    fitbitData?.forEach((fitbitDataItem: FitbitActivity) => {
      const activityName = fitbitDataItem.activityName;
      const duration = Math.trunc(fitbitDataItem.duration / 1000 / 60);
      const id = durationData.length;

      const activityIndex = durationData.findIndex(
        (x) => x.label === activityName
      );
      if (activityIndex !== -1) {
        const activityItem = durationData[activityIndex];
        activityItem.value = activityItem.value + duration;
        activityItem.frequency = activityItem.frequency + 1;

        durationData[activityIndex] = activityItem;
      } else {
        const activityItem = {
          id,
          value: duration,
          label: activityName,
          frequency: 1,
        };
        durationData.push(activityItem);
      }
    });

    durationData.sort((a, b) => b.value - a.value);

    setActivityData(durationData);
  }

  const handleRetrieveData = useCallback(async () => {
    let data = [];
    let res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URI}/activity/`,
      {
        headers: {
          "x-api-key": `${import.meta.env.VITE_API_KEY}`,
        },
      }
    );

    if (res.data.statusCode === 500) {
      handleRefreshToken();
      let retry = 0;
      while (retry < 3) {
        res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URI}/activity/`,
          {
            headers: {
              "x-api-key": `${import.meta.env.VITE_API_KEY}`,
            },
          }
        );

        if (res.data.statusCode !== 500) {
          data = res.data.body.activities;
          break;
        }

        retry++;
      }
    } else {
      data = res.data.body.activities;
    }

    handleDataParse(data);
  }, []);

  const dateMutation = useMutation({
    mutationKey: ["fitbit-date-data"],
    mutationFn: async (date: CalendarItem) => {
      const month = date.$M + 1 < 10 ? `0${date.$M + 1}` : `${date.$M + 1}`;
      const day = date.$D < 10 ? `0${date.$D}` : `${date.$D}`;
      const dateStr = `${date.$y}-${month}-${day}`;

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URI}/date?date=${dateStr}`,
        {
          headers: {
            "x-api-key": `${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      const activityList = res.data.activities;
      activityList.sort(
        (a: FitbitActivitySingle, b: FitbitActivitySingle) =>
          b.duration - a.duration
      );

      return activityList;
    },
  });

  async function handleRefreshToken() {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URI}/credentials`,
      {},
      {
        headers: {
          "x-api-key": `${import.meta.env.VITE_API_KEY}`,
        },
      }
    );
  }

  useEffect(() => {
    handleRetrieveData();
  }, []);

  return {
    actions: {
      searchByDate: dateMutation.mutate,
      isSearchPending: dateMutation.isPending,
    },
    state: {
      activities: activityData,
      dateData: dateMutation,
    },
  };
}

export { useHome };
