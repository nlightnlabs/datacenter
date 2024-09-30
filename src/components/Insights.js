import React, {useState, useEffect} from 'react'
import ParetoChart from './ParetoChart'
import DoughnutChart from './DoughnutChart'

import costData from './cost.json'

const Insights = () => {

  const [chartWidth, setChartWidth] = useState("500px")
  const [chartHeight, setChartHeight] = useState("300px")

  return (
    <div className="flex flex-col fade-in w-full">

        <div className="flex w-[80%] h-[50px] text-[24px] font-bold ms-[10%]">Insights</div>
        
        <div className="flex w-[80%] h-[400px] mx-auto justify-between flex-wrap ms-[10%] overflow-y-scroll">
            <div className="flex w-full">

              <div className="flex flex-col border-1 rounded shadow-md w-[300px] m-3">
                  <div className="flex w-full h-100 justify-center items-center">
                    <DoughnutChart
                      labels = {['West', 'East', 'North', 'South']}
                      values = {[50, 20, 30, 40]}
                    />
                  <div className="absolute justify-center flex flex-col">
                    <div className="flex w-full justify-center font-bold text-[32px]">$140M</div>
                    <div className="flex w-full justify-center text-[14px]">Total Annual Cost</div>
                  </div>
                  </div>
              </div>

              <div className="flex flex-col border-1 rounded shadow-md w-full m-3">
                  <div className="flex text-[20px] h-[40px] justify-center items-center font-bold">Cost By Month</div>
                  <div className="flex w-full h-100 justify-center items-center">
                    <ParetoChart
                      label = "Total Data Center Cost Trend"
                      labels = {['Oct-23', 'Nov-23', 'Dec-23', 'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'July-24', 'Aug-24', 'Sep-24']}
                      values = {[20, 24, 22, 27, 25, 30, 32, 36, 38, 39, 42, 43]}
                      barColor = "rgba(0,150,255,0.5)"
                      yAxisTitle = "Cost (Million USD)"
                      xAxisTitle = ""
                    />
                  </div>
                </div>
            </div>
        </div>

        <div className="flex w-[80%] h-[400px] mx-auto justify-between flex-wrap ms-[10%]">
            <div className="flex w-full">

              <div className="flex flex-col border-1 rounded shadow-md w-[300px] m-3">
                  <div className="flex w-full h-100 justify-center items-center">
                    <DoughnutChart
                      labels = {['Downtime', 'Uptime']}
                      values = {[15, 85]}
                    />
                  <div className="absolute justify-center flex flex-col">
                    <div className="flex w-full justify-center font-bold text-[32px]">95%</div>
                    <div className="flex w-full justify-center text-[14px]">Average Uptime</div>
                  </div>
                  </div>
              </div>

              <div className="flex flex-col border-1 rounded shadow-md w-full m-3">
                  <div className="flex text-[20px] h-[40px] justify-center items-center font-bold">Average Uptime</div>
                  <div className="flex w-full h-100 justify-center items-center">
                    <ParetoChart
                      label = "Average Uptime"
                      labels = {['Oct-23', 'Nov-23', 'Dec-23', 'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'July-24', 'Aug-24', 'Sep-24']}
                      values = {[86, 87, 88, 92, 95, 96, 99, 99, 98, 97, 98, 99]}
                      barColor = "rgba(0,200,180,0.5)"
                      yAxisTitle = "Percent"
                      xAxisTitle = ""
                    />
                  </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Insights
