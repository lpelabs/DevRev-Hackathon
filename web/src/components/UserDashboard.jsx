import React, { useState } from "react";
import { isError, useQuery } from "react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Example from "./3DCharts";
import Dashboard from "./Dashboard";

export default function UserDashboard() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clientFromQuery = queryParams.get("client_name");

  const openChangeHandler = (props) => {
    setOpen(props);
  };

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

  const queryKey = ["user", clientFromQuery];
  const {
    isLoading,
    error,
    data: pdictions,
    isFetching,
    refetch,
  } = useQuery(queryKey, fetchData, {
    refetchOnWindowFocus: false,
    enabled: true,
    onError: (error) => {
      if (Array.isArray(error?.response?.data.detail)) {
        setMessage(`${error.response.data.detail[0].msg}, Try again`);
        openChangeHandler(true);
      } else if (error?.response?.data.detail) {
        setMessage(`${error.response.data.detail}, Try again`);
        openChangeHandler(true);
      } else {
        setMessage(`${error.message}, Try again`);
        openChangeHandler(true);
      }
    },
    retry: 1,
  });

  console.log(pdictions?.data["twitter"][
    "work_on_weakness"
  ])

  return (
    <>
      <main className="flex bg-[# F7F7FF]">
        <div className="pt-2 w-full">
          <Label
            className="flex flex-col text-md font-bold text-[36px] p-10 mx-auto justify-center items-center text-[#1E1E24]"
            htmlFor="BU_Id"
          >
            Insights for {clientFromQuery} based on VoC data
          </Label>
          <Dashboard />

          <div className="flex flex-wrap items-center gap-3 mt-10 text-[#1E1E24]">
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {pdictions && (
              <div className="w-[90vw] m-auto">
                {!('error' in pdictions.data["google_play"]) && (
                  <div className="w-full bg-[#F6F5F3] p-6 rounded-xl mb-5">
                    <Label
                      className="flex flex-col text-md font-bold text-[40px] p-5 underline"
                      htmlFor="BU_Id"
                    >
                      Insights based on VoC data for {clientFromQuery} on Google play 
                    </Label>

                    <Label
                      className="flex flex-col text-md font-bold text-[24px] my-5 mb-3 text-[#111D4A]"
                      htmlFor="BU_Id"
                    >
                      1. Work On Threats
                    </Label>
                    <ul className="bg-[#EEECE8] p-3 rounded-xl">
                      {pdictions?.data["google_play"]["work_on_threats"]?.map((data, index) => {
                        return (
                          <li key={index} className="mb-2 pl-5">
                            {data}
                          </li>
                        )
                      })}
                    </ul>
                    <Label
                      className="flex flex-col text-md font-bold text-[24px] my-5 mb-3 text-[#111D4A]"
                      htmlFor="BU_Id"
                    >
                      2. Work On Weakness
                    </Label>
                    <ul className="bg-[#EEECE8] p-3 rounded-xl">
                      {pdictions?.data["google_play"]["work_on_weakness"]?.map((data, index) => {
                        return (
                          <li key={index} className="mb-2 pl-5">
                            {data}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
                {!('error' in pdictions.data["twitter"]) && (
                  <div className="w-full bg-[#F6F5F3] p-6 rounded-xl mb-5">
                    <Label
                      className="flex flex-col text-md font-bold text-[32px] underline"
                      htmlFor="BU_Id"
                    >
                      Insights based on VoC data for {clientFromQuery} on Twitter
                    </Label>

                    <Label
                      className="flex flex-col text-md font-bold text-[24px] my-5 mb-3 text-[#111D4A]"
                      htmlFor="BU_Id"
                    >
                      1. Work On Threats
                    </Label>
                    <ul className="bg-[#EEECE8] p-3 rounded-xl">
                      {pdictions?.data["twitter"]["work_on_threats"]?.map((data, index) => {
                        return (
                          <li key={index} className="mb-2 pl-5">
                            {data}
                          </li>
                        )
                      })}
                    </ul>
                    <Label
                      className="flex flex-col text-md font-bold text-[24px] my-5 mb-3 text-[#111D4A]"
                      htmlFor="BU_Id"
                    >
                      2. Work On Weakness
                    </Label>
                    <ul className="bg-[#EEECE8] p-3 rounded-xl">
                      {pdictions?.data["twitter"]["work_on_weakness"]?.map((data, index) => {
                        return (
                          <li key={index} className="mb-2 pl-5">
                            {data}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
                {!('error' in pdictions.data["reddit"]) && (
                  <div className="w-full bg-[#F6F5F3] p-6 rounded-xl ">
                    <Label
                      className="flex flex-col text-md font-bold text-[32px] underline"
                      htmlFor="BU_Id"
                    >
                      Insights based on VoC data for {clientFromQuery} on Reddit
                    </Label>

                    <Label
                      className="flex flex-col text-md font-bold text-[24px] my-5 mb-3 text-[#111D4A]"
                      htmlFor="BU_Id"
                    >
                      1. Work On Threats
                    </Label>
                    <ul className="bg-[#EEECE8] p-3 rounded-xl">
                      {pdictions?.data["reddit"]["work_on_threats"]?.map((data, index) => {
                        return (
                          <li key={index} className="mb-2 pl-5">
                            {data}
                          </li>
                        )
                      })}
                    </ul>
                    <Label
                      className="flex flex-col text-md font-bold text-[24px] my-5 mb-3 text-[#111D4A]"
                      htmlFor="BU_Id"
                    >
                      2. Work On Weakness
                    </Label>
                    <ul className="bg-[#EEECE8] p-3 rounded-xl">
                      {pdictions?.data["reddit"]["work_on_weakness"]?.map((data, index) => {
                        return (
                          <li key={index} className="mb-2 pl-5">
                            {data}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
                <Example data={pdictions.data} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
