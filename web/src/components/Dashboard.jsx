import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { COUNTRY_LABEL, CONTINENT_LABEL } from "../constant";
import { isError, useQuery } from "react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Dashboard() {

  const [locationData, setLocationData] = useState([])

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clientFromQuery = queryParams.get("client_name");

  const fetchData = async () => {
    const response = await axios.get(
      `https://devrev-hackathon-production.up.railway.app/get_json?client_name=${clientFromQuery}`,
      {
        client_name: clientFromQuery,
      },
    );

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  };

  const queryKey = ["continent", "sentiment"];
  const {
    isLoading,
    error,
    data: predictions,
    isFetching,
    refetch,
  } = useQuery(queryKey, fetchData, {
    refetchOnWindowFocus: false,
    enabled: true,
    retry: 1,
  });

  const value = predictions?.data?.twitter;

  console.log(value)

  const geo_cluster_dict = predictions?.data?.twitter?.geo_cluster_dict

  useEffect(() => {
    if (geo_cluster_dict) {
      const countryArray = Object.entries(geo_cluster_dict).map(([cluster, popularity]) => {
        if (cluster === "-1") {
          return null; // Skip this entry
        }
        const countryNames = COUNTRY_LABEL[cluster]
        let list = []
        for (const countryName of countryNames) {
          list.push([countryName, popularity])
        }
        return list
      }).filter(Boolean);

      countryArray.unshift([["Country", "Sentiment"]]);

      setLocationData(countryArray.flat())
    }
  }, [geo_cluster_dict])


  return (
    <div className="w-4/5 rounded-lg m-auto shadow-md p-4 bg-white">
      {predictions?.data?.twitter?.geo_cluster_dict
        ? <div>
          <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = locationData[selection[0].row + 1];
                  console.log("Selected : " + region);
                },
              },
            ]}
            chartType="GeoChart"
            width="100%"
            height="400px"
            data={locationData}
          />
          <p className="text-center text-[#5C5547] font-semibold mt-2 text-lg">distribution of customer accorss continents</p>
        </div>
        : null}
    </div>

  );
}
