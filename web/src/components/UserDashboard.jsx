import React, { useState } from "react";
import { isError, useQuery } from "react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Example from "./3DCharts";

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
      `http://localhost:8000/get_json?client_name=${clientFromQuery}`,
      {
        client_name: clientFromQuery,
      },
    );

    // const response = await axios.get(`http://127.0.0.1:8000/get_json?client_name=${clientFromQuery}`)

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  };

  const queryKey = ["user", clientFromQuery];
  const {
    isLoading,
    error,
    data: predictions,
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

  const value = predictions?.data[`${clientFromQuery}`];

  return (
    <>
      <main className="flex">
        <div className="pt-2 w-full">
          <Label
            className="flex flex-col text-md font-bold text-[50px] p-10 mx-auto justify-center items-center"
            htmlFor="BU_Id"
          >
            Insights for {clientFromQuery}
          </Label>

          <div className="flex flex-wrap items-center gap-3 pl-10 mt-10 w-[80vw]">
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {predictions && (
              <div>
                <Label
                  className="flex flex-col text-md font-bold text-[40px] p-5 underline"
                  htmlFor="BU_Id"
                >
                  Google Play Insights for {clientFromQuery}
                </Label>

                <Label
                  className="flex flex-col text-md font-bold text-[30px] p-5 "
                  htmlFor="BU_Id"
                >
                  1. Work On Threats
                </Label>
                {/* <pre>
                  {JSON.stringify(
                    predictions.data[`${clientFromQuery}`]["google_play"][
                      "work_on_threats"
                    ][0],
                    null,
                    2,
                  )}
                </pre> */}
                {/* <pre>
                  {JSON.stringify(
                    predictions.data[`${clientFromQuery}`]["google_play"][
                      "work_on_threats"
                    ][1],
                    null,
                    2,
                  )}
                </pre> */}

                <Label
                  className="flex flex-col text-md font-bold text-[30px] p-5 "
                  htmlFor="BU_Id"
                >
                  2. Work On Weakness
                </Label>
                {/* <pre>
                  {JSON.stringify(
                    predictions.data[`${clientFromQuery}`]["google_play"][
                      "work_on_weakness"
                    ][0],
                    null,
                    2,
                  )}
                </pre> */}
                {/* <pre>
                  {JSON.stringify(
                    predictions.data[`${clientFromQuery}`]["google_play"][
                      "work_on_weakness"
                    ][1],
                    null,
                    2,
                  )}
                </pre> */}

                <Label
                  className="flex flex-col text-md font-bold text-[40px] p-5 underline"
                  htmlFor="BU_Id"
                >
                  Twitter Insights for {clientFromQuery}
                </Label>

                <Label
                  className="flex flex-col text-md font-bold text-[30px] p-5 "
                  htmlFor="BU_Id"
                >
                  1. Work On Threats
                </Label>
                <pre>
                  {JSON.stringify(
                    predictions.data["twitter"][
                      "work_on_threats"
                    ][0],
                    null,
                    2,
                  )}
                </pre>
                <pre>
                  {JSON.stringify(
                    predictions.data["twitter"][
                      "work_on_threats"
                    ][1],
                    null,
                    2,
                  )}
                </pre>

                <Label
                  className="flex flex-col text-md font-bold text-[30px] p-5 "
                  htmlFor="BU_Id"
                >
                  2. Work On Weakness
                </Label>
                <pre>
                  {JSON.stringify(
                    predictions.data["twitter"][
                      "work_on_weakness"
                    ][0],
                    null,
                    2,
                  )}
                </pre>
                <pre>
                  {JSON.stringify(
                    predictions.data["twitter"][
                      "work_on_weakness"
                    ][1],
                    null,
                    2,
                  )}
                </pre>

                <Label
                  className="flex flex-col text-md font-bold text-[40px] p-5 underline"
                  htmlFor="BU_Id"
                >
                  Reddit Insights for {clientFromQuery}
                </Label>

                <Label
                  className="flex flex-col text-md font-bold text-[30px] p-5 "
                  htmlFor="BU_Id"
                >
                  1. Work On Threats
                </Label>
                <pre>
                  {JSON.stringify(
                    predictions.data["reddit"][
                      "work_on_threats"
                    ][0],
                    null,
                    2,
                  )}
                </pre>
                <pre>
                  {JSON.stringify(
                    predictions.data["reddit"][
                      "work_on_threats"
                    ][1],
                    null,
                    2,
                  )}
                </pre>

                <Label
                  className="flex flex-col text-md font-bold text-[30px] p-5 "
                  htmlFor="BU_Id"
                >
                  2. Work On Weakness
                </Label>
                <pre>
                  {JSON.stringify(
                    predictions.data["reddit"][
                      "work_on_weakness"
                    ][0],
                    null,
                    2,
                  )}
                </pre>
                <pre>
                  {JSON.stringify(
                    predictions.data["reddit"][
                      "work_on_weakness"
                    ][1],
                    null,
                    2,
                  )}
                </pre>
                <pre>
                  {JSON.stringify(
                    predictions.data["reddit"][
                      "work_on_weakness"
                    ][2],
                    null,
                    2,
                  )}
                </pre>

                <Example data={predictions.data} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
