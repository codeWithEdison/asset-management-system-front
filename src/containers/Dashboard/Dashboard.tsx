import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Auth, FC_SetError, FC_SetSuccess } from "../../actions";
import { MdOutlineDashboard } from "react-icons/md";
import Dropdown from "../../components/Fragments/DropDown";
import CategoriesData from "../../utils/CategoriesData";
import { TbDatabase } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";


import BuildingsChart from "../AssetDistribution/Monitoring/ChartData/BuildingChart";
import AssetStatusChart from "./AssetStatusDonut";
import RequestChart from "./RequestBar";

interface AppProps {
  auth: Auth;
  FC_SetSuccess: (msg: string) => void;
  FC_SetError: (msg: string) => void;
}

interface AppState {
  loading: boolean;
  success: string;
  error: string;
}

const Dashboard: React.FC<AppProps> = ({ auth, FC_SetSuccess, FC_SetError }) => {
  const [state, setState] = useState<AppState>({
    loading: false,
    success: "",
    error: "",
  });

  useEffect(() => {
    // Equivalent to componentDidMount
    // You can place your componentDidMount logic here
  }, []);

  const options = CategoriesData;
  const chartData = [40, 30, 30];
  const RequestData = {
    categories: ['Muhabura Block', 'Agaciro Block', 'AGH block', ],
    series: [
      {
        name: 'Pending FOr Rquest',
        data: [44, 55, 41],
      },
      {
        name: 'Waiting For Pick',
        data: [53, 32, 33],
      }
    ],
  };

  return (
    <div className="mr-4 animate__animated  animate__fadeInTopLeft animate__faster ">
      <div className=" flex flex-col bg-white rounded-lg p-3 pb-0 ">
      <div className="  flex flex-row justify-between">
      <div className="flex flex-col  gap-2 mb-2">

        <div className="flex flex-row items-center gap-1">
          <MdOutlineDashboard className="text-3xl text-my-blue" />
          <div className="px-2 rounded-md bg-primary-700 text-black w-max text-xl font-bold">
            Dashboard
          </div>
        </div>
          <Dropdown  options={options} />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-row bg-blue-white px-4 py-2 rounded-lg h-fit items-center gap-2 w-40"> 
        <TbDatabase className="text-5xl font-bold text-my-blue"/>
        <div className="flex flex-col gap-0">
        <h5>Stock</h5>
        <h3 className="text-xl font-bold">3860</h3>
        </div>
        </div>
        <div className="flex flex-row bg-[#dcf1e6] px-4 py-2 rounded-lg h-fit items-center gap-2 w-40">  
        <FiShare2 className="text-5xl font-bold text-confirm"/>
        <div className="flex flex-col gap-0">
        <h5>Distributed</h5>
        <h3 className="text-xl font-bold">3200</h3>
        </div>
         </div>
      </div>
      </div>

      <div className=" ml-32 mt-2 flex flex-row gap-10 text-xl">
        <button>Stock</button>
        <button className="font-bold border-b-2  border-my-blue p-2">Distribution </button>
      </div>
      </div>

      <div className=" rounded-lg  py-4  flex flex-row gap-6  animate__animated animate__fadeInTopLeft  ">
        <div className="flex flex-col gap-4 w-1/4">
           <div className="rounded-lg p-0  w-full bg-white flex justify-center items-center  flex-col h-[320px]">
            <h3 className="text-xl ">Distribution Summary</h3>
            <AssetStatusChart data={chartData} />
          </div>
        <div className="flex justify-center items-center bg-white rounded-lg p-4 flex-col h-[320px]">
        <h3 className="text-xl"> Pending Request Summary</h3>
        <div className="flex ">
        <RequestChart categories={RequestData.categories} series={RequestData.series} />
           </div>
        </div>
        </div>
        <div className="flex bg-white w-3/4 justify-center items-center rounded-lg">
         
          <BuildingsChart/>
        </div>

      </div>
    </div>
  );
};

const mapStateToProps = ({
  auth,
}: StoreState): {
  auth: Auth;
} => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, {
  FC_SetSuccess,
  FC_SetError,
})(Dashboard);
