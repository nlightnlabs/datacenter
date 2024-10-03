import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ParetoChart from './ParetoChart'
import DoughnutChart from './DoughnutChart'
import StackedBarChart from './StackedBarChart'


const Insights = () => {

  const darkMode = useSelector(state => state.environment.darkMode);

  const [chartWidth, setChartWidth] = useState("500px")
  const [chartHeight, setChartHeight] = useState("300px")

  return (
    <div className="h-[80%] fade-in w-full overflow-y-scroll">

    <div className="ms-5 mt-3 mb-3 flex text-[24px] w-1/2 transition duration-500">
      <div className={`${darkMode? "darkMode-text":"black"} ms-[10%]`}>Insights</div> 
    </div>
        
        {/* Cost Chart */}
        <div className="flex w-[80%] h-[300px] mx-auto justify-between overflow-hidden mb-3">
            
            <div className="flex w-full">

              <div className={`relative flex flex-col rounded shadow-md w-1/4 min-w-[250px]
                 ${darkMode? "darkMode-text": "lightMode-text"} 
                 ${darkMode? "darkMode-border" : "lightMode-border"}
                 ${darkMode? "darkMode-bg" : "lightMode-bg"}
                 `}
                 >
                  <div className="flex w-full h-100 justify-center items-center">
                    <DoughnutChart
                      labels = {['West', 'East', 'North', 'South']}
                      values = {[50, 20, 30, 40]}
                      darkMode = {darkMode}
                    />
                  <div className="absolute top-[50%] justify-center flex flex-col">
                    <div className={`flex w-full justify-center font-bold text-[28px] ${darkMode? "darkMode-text" : "text-black"}`}>$140M</div>
                    <div className={`flex w-full justify-center text-[12px] ${darkMode? "darkMode-text" : "lightmode-text"}`}>Total Annual Cost</div>
                  </div>
                  </div>
              </div>

              <div className={`flex flex-col rounded shadow-md w-3/4 min-w-[500px] h-100 ms-3
                  ${darkMode? "darkMode-text": "lightMode-text"} 
                  ${darkMode? "darkMode-border" : "lightMode-border"}
                  ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className="flex text-[20px] h-[40px] justify-center items-center font-bold">Cost By Month</div>
                  <div className="flex h-5/6 ps-3 pe-3 w-full">
                    <ParetoChart
                      label = "Total Data Center Cost Trend"
                      labels = {['Oct-23', 'Nov-23', 'Dec-23', 'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'July-24', 'Aug-24', 'Sep-24']}
                      values = {[20, 24, 22, 27, 25, 30, 32, 36, 38, 39, 42, 43]}
                      barColor = "rgba(0,150,255,0.5)"
                      yAxisTitle = "Cost (Million USD)"
                      xAxisTitle = ""
                      darkMode = {darkMode}
                    />
                  </div>
              </div>
            </div>
        </div>


        {/* Cycle Count */}
        <div className="flex w-[80%] h-[300px] mx-auto justify-between ms-[10%] overflow-hidden mb-3">
            <div className="flex w-full">

              <div className={`relative flex flex-col rounded shadow-md w-1/4 min-w-[250px]
                 ${darkMode? "darkMode-text": "lightMode-text"} 
                 ${darkMode? "darkMode-border" : "lightMode-border"}
                 ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className={`flex w-full  h-100 justify-center items-center`}>
                    <DoughnutChart
                      labels = {['Blind', 'Dynamic']}
                      values = {[30,70]}
                      series1Color = 'rgba(200, 200, 200, 0.6)'
                      series2Color = 'rgba(50, 200, 100, 0.6)'
                      darkMode = {darkMode}
                    />
                  <div className="absolute top-[45%] justify-center flex flex-col">
                    <div className={`flex w-full justify-center font-bold text-[32px] ${darkMode? "darkMode-text" : "text-black"}`}>20%</div>
                    <div className={`flex w-full justify-center text-[12px] ${darkMode? "darkMode-text" : "lightmode-text"}`}>Overall Cycle Count</div>
                  </div>
                  </div>
              </div>

              <div className={`flex flex-col rounded shadow-md w-3/4 min-w-[400px] h-100 ms-3
                 ${darkMode? "darkMode-text": "lightMode-text"} 
                 ${darkMode? "darkMode-border" : "lightMode-border"}
                 ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className="flex text-[20px] h-[40px] justify-center items-center font-bold">Cycle Count By Asset Type</div>
                  <div className="flex w-full h-5/6 ps-3 pe-3">
                    <StackedBarChart
                      label = "Cycle Count"
                      labels = {['Servers', 'Network', 'Storage', 'Power & Cooling', 'Parts']}
                      datasets = {[
                        {
                          label: 'Dynamic',
                          values: [70, 65, 75, 80, 72],
                          backgroundColor: 'rgba(50, 200, 100, 0.6)',
                        },
                        {
                          label: 'Blind',
                          values: [30, 35, 25, 20, 28],
                          backgroundColor: 'rgba(200, 200, 200, 0.6)',
                        },
                      ]}
                      barColor = "rgba(0,200,180,0.5)"
                      yAxisTitle = "Percent"
                      xAxisTitle = ""
                      darkMode = {darkMode}
                    />
                  </div>
              </div>
            
              <div className={`flex flex-col rounded shadow-md w-3/4 min-w-[500px] h-100 ms-3
                 ${darkMode? "darkMode-text": "lightMode-text"} 
                 ${darkMode? "darkMode-border" : "lightMode-border"}
                 ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className="flex text-[20px] h-[40px] justify-center items-center font-bold">Cycle Count By Month</div>
                  <div className="flex h-5/6 ps-3 pe-3 w-full">
                    <ParetoChart
                      label = "Total Data Center Cost Trend"
                      labels = {['Oct-23', 'Nov-23', 'Dec-23', 'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'July-24', 'Aug-24', 'Sep-24']}
                      values = {[20, 30, 28, 15, 20, 24, 18, 26, 25, 28, 22, 20]}
                      barColor = "rgba(0,150,255,0.5)"
                      yAxisTitle = "Percent"
                      xAxisTitle = ""
                      darkMode = {darkMode}
                    />
                  </div>
              </div>
            
            </div>

        </div>

        
        {/* Power Consumptions */}
        <div className="flex w-[80%] h-[300px] mx-auto justify-between ms-[10%] overflow-hidden mb-3">
            <div className="flex w-1/2">
              <div className={`relative flex flex-col rounded shadow-md w-1/4 min-w-[200px]
                 ${darkMode? "darkMode-text": "lightMode-text"} 
                 ${darkMode? "darkMode-border" : "lightMode-border"}
                 ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className={`flex w-full h-100 justify-center items-center`}>
                    <DoughnutChart
                      labels = {['California', 'Ohio', 'Virgina', 'Oregon']}
                      values = {[1.0, 0.6, 0.5, 0.4]}
                      darkMode = {darkMode}
                      fontSize = {12}
                    />
                  <div className="absolute top-[55%] justify-center flex flex-col">
                    <div className={`flex w-full justify-center font-bold text-[28px] ${darkMode? "darkMode-text" : "text-black"}`}>2.5M</div>
                    <div className={`flex w-full justify-center text-[12px] ${darkMode? "darkMode-text" : "lightmode-text"}`}>Kilowatt-Hours</div>
                  </div>
                  </div>
              </div>

              <div className={`flex flex-col rounded shadow-md w-3/4 min-w-[300px] h-100 ms-3
                 ${darkMode? "darkMode-text": "lightMode-text"}
                  ${darkMode? "darkMode-border" : "lightMode-border"}
                  ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className="flex text-[20px] h-[40px] justify-center items-center font-bold">Monthly Power Consumption</div>
                  <div className="flex w-full h-5/6 ps-3 pe-3">
                    <ParetoChart
                      label = "kwH"
                      labels = {['Oct-23', 'Nov-23', 'Dec-23', 'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'July-24', 'Aug-24', 'Sep-24']}
                      values = {[200, 180, 175, 175, 180, 190, 200, 220, 235, 245, 250, 245]}
                      barColor = "rgba(0,200,180,0.5)"
                      yAxisTitle = "Thousand kWh"
                      xAxisTitle = ""
                      darkMode = {darkMode}
                    />
                  </div>
                </div>
            </div>
            

            <div className="flex w-1/2 ms-3">
              <div className={`relative flex flex-col rounded shadow-md w-1/4 min-w-[200px]
                 ${darkMode? "darkMode-text": "lightMode-text"}
                  ${darkMode? "darkMode-border" : "lightMode-border"}
                  ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className="flex w-full h-100 justify-center items-center">
                    <DoughnutChart
                      labels = {['California', 'Ohio', 'Virgina', 'Oregon']}
                      values = {[4, 3, 2, 3]}
                      darkMode = {darkMode}
                      fontSize = {12}
                    />
                  <div className={`absolute top-[55%] justify-center flex flex-col`}>
                    <div className={`flex w-full justify-center font-bold text-[28px] ${darkMode? "darkMode-text" : "text-black"}`}>1.05</div>
                    <div className={`flex w-full justify-center text-[12px] ${darkMode? "darkMode-text" : "lightmode-text"}`}>Metric Tons CO2</div>
                  </div>
                  </div>
              </div>

              <div className={`flex flex-col rounded shadow-md w-3/4 min-w-[300px] h-100 ms-3
                 ${darkMode? "darkMode-text": "lightMode-text"} 
                 ${darkMode? "darkMode-border" : "lightMode-border"}
                 ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className="flex text-[20px] h-[40px] justify-center items-center font-bold">Carbon Emissions</div>
                  <div className="flex w-full h-5/6 ps-3 pe-3">
                    <ParetoChart
                      label = "kwH"
                      labels = {['Oct-23', 'Nov-23', 'Dec-23', 'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'July-24', 'Aug-24', 'Sep-24']}
                      values = {[84, 75.6, 73.5, 73.5, 75.6, 79.8, 84, 92.4, 98.7, 102.9, 105, 102.9]}
                      barColor = "rgba(0,200,180,0.5)"
                      yAxisTitle = "Metric Tons CO2"
                      xAxisTitle = ""
                      darkMode = {darkMode}
                    />
                  </div>
                </div>
            </div>
          

        </div>


         {/* Uptime */}
         <div className="flex w-[80%] h-[300px] mx-auto justify-between ms-[10%] overflow-hidden mb-3">
            <div className="flex w-full">
              <div className={`relative flex flex-col rounded shadow-md w-1/4 min-w-[250px]
                 ${darkMode? "darkMode-text": "lightMode-text"} 
                 ${darkMode? "darkMode-border" : "lightMode-border"}
                 ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className={`flex w-full h-100 justify-center items-center`}>
                    <DoughnutChart
                      labels = {['Downtime', 'Uptime']}
                      values = {[15, 85]}
                      darkMode = {darkMode}
                    />
                  <div className="absolute justify-center flex flex-col">
                    <div className={`flex w-full justify-center font-bold text-[32px] ${darkMode? "darkMode-text" : "text-black"}`}>95%</div>
                    <div className={`flex w-full justify-center text-[14px] ${darkMode? "darkMode-text" : "lightmode-text"}`}>Average Uptime</div>
                  </div>
                  </div>
              </div>
              <div className={`flex flex-col rounded shadow-md w-3/4 min-w-[300px] h-100 ms-3
                 ${darkMode? "darkMode-text": "lightMode-text"} 
                 ${darkMode? "darkMode-border" : "lightMode-border"}
                 ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className="flex text-[20px] h-[40px] justify-center items-center font-bold">Monthly Average Uptime</div>
                  <div className="flex w-full h-5/6 ps-3 pe-3">
                    <ParetoChart
                      label = "Average Uptime"
                      labels = {['Oct-23', 'Nov-23', 'Dec-23', 'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'July-24', 'Aug-24', 'Sep-24']}
                      values = {[86, 87, 88, 92, 95, 96, 99, 99, 98, 97, 98, 99]}
                      barColor = "rgba(0,200,180,0.5)"
                      yAxisTitle = "Percent"
                      xAxisTitle = ""
                      darkMode = {darkMode}
                    />
                  </div>
              </div>
            </div>
        </div>


        {/* Response Time */}
        <div className="flex w-[80%] h-[300px] mx-auto justify-between ms-[10%] overflow-hidden mb-3">
            <div className="flex w-full">
              <div className={`relative flex flex-col rounded shadow-md w-1/4 min-w-[250px]
                 ${darkMode? "darkMode-text": "lightMode-text"}
                  ${darkMode? "darkMode-border" : "lightMode-border"}
                  ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className="flex w-full h-100 justify-center items-center">
                    <DoughnutChart
                      labels = {['Downtime', 'Uptime']}
                      values = {[15, 85]}
                      darkMode = {darkMode}
                    />
                  <div className="absolute justify-center flex flex-col">
                    <div className={`flex w-full justify-center font-bold text-[32px] ${darkMode? "darkMode-text" : "text-black"}`}>25</div>
                    <div className={`flex w-full justify-center text-[14px] ${darkMode? "darkMode-text" : "lightmode-text"}`}>Milliseconds</div>
                  </div>
                  </div>
              </div>
              <div className={`flex flex-col rounded shadow-md w-3/4 min-w-[300px] h-100 ms-3
                 ${darkMode? "darkMode-text": "lightMode-text"} 
                 ${darkMode? "darkMode-border" : "lightMode-border"}
                 ${darkMode? "darkMode-bg" : "lightMode-bg"}
                `}>
                  <div className="flex text-[20px] h-[40px] justify-center items-center font-bold">Monthly Average Respose Time</div>
                  <div className="flex w-full h-5/6 ps-3 pe-3">
                    <ParetoChart
                      label = "Average Uptime"
                      labels = {['Oct-23', 'Nov-23', 'Dec-23', 'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'July-24', 'Aug-24', 'Sep-24']}
                      values = {[25.7, 32,4, 28.9, 22.1, 20.1, 25.3, 26.4, 18.9, 24.3, 29.2, 25.3, 24.9]}
                      barColor = "rgba(0,200,180,0.5)"
                      yAxisTitle = "Percent"
                      xAxisTitle = ""
                      darkMode = {darkMode}
                    />
                  </div>
              </div>
            </div>
        </div>



        




    

    </div>
  )
}

export default Insights
