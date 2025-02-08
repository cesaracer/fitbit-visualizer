import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

function useHome() {
  const [activityData, setActivityData] = useState(null);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  function handleDataParse(data) {
    console.log(data);
    const fitbitData = data;

    const durationData = [];

    fitbitData?.forEach((fitbitDataItem) => {
      const activityName = fitbitDataItem.activityName;
      const duration = fitbitDataItem.duration / 1000 / 60;
      const id = durationData.length;

      const activityIndex = durationData.findIndex(
        (x) => x.label === activityName
      );
      if (activityIndex !== -1) {
        const activityItem = durationData[activityIndex];
        activityItem.value = activityItem.value + duration;
        durationData[activityIndex] = activityItem;
      } else {
        const activityItem = { id, value: duration, label: activityName };
        durationData.push(activityItem);
      }
    });

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
    mutationFn: async (date) => {
      const month = date.$M + 1 < 10 ? `0${date.$M + 1}` : `${date.$M + 1}`;
      const day = date.$D < 10 ? `0${date.$D}` : `${date.$D}`;
      const dateStr = `${date.$y}-${month}-${day}`;

      console.log(dateStr);

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URI}/date?date=${dateStr}`,
        {
          headers: {
            "x-api-key": `${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      return res.data.activities;
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

  function viewDetails() {
    //
  }

  function toggleModal() {
    //
  }

  useEffect(() => {
    handleRetrieveData();
  }, []);

  return {
    actions: {
      toggleModal,
      viewDetails,
      searchByDate: dateMutation.mutate,
      isSearchPending: dateMutation.isPending,
    },
    state: {
      activities: activityData,
      isModalActive,
    },
  };
}

export { useHome };
