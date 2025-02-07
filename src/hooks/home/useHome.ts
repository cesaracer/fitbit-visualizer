import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function useHome() {
  const [activity, setActivity] = useState(null);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const handleRetrieveData = useCallback(async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URI}/activity/`,
      {
        headers: {
          "x-api-key": `${import.meta.env.VITE_API_KEY}`,
        },
      }
    );

    return res.data.body;
  }, []);

  const handleRetrieveDataByDate = useCallback(async (date: string) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URI}/activity/date&date=${date}`,
      {
        headers: {
          "x-api-key": `${import.meta.env.VITE_API_KEY}`,
        },
      }
    );

    return res.data.body;
  }, []);

  const { isError, isPending, isFetched, data } = useQuery({
    queryKey: ["fitbit-data"],
    queryFn: async () => {
      const res = await handleRetrieveData();

      return res;
    },
  });

  const activities = useMemo(() => {
    if (isFetched) {
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

      return durationData;
    }
  }, [data, isFetched]);

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
