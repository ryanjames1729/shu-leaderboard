'use client'

import Image from "next/image";
import Footer from "./components/Footer";

import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js"
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.defaults.color = "rgba(255,255,255,0.3)";
Chart.defaults.font.size = 16;


export default function Home() {
  return (
    <>
    <main className="font-primary bg-gradient-to-r from-primary via-fuchsia-500 to-secondary text-slate-700 flex min-h-screen flex-col items-center justify-between lg:p-24 py-24">
      <div className="relative flex place-items-center flex-col -mt-12 w-96 lg:w-auto">
      <h1 className={`mb-3 lg:text-6xl text-2xl text-center`}>Carolina Day School</h1>
      <h2 className={`mb-3 lg:text-8xl text-4xl font-semibold text-center`}>Stephens Hall United</h2>
      </div>

      <div className="lg:w-7/12 lg:h-96 w-72 h-96 bg-slate-600 rounded-lg shadow-[0_0_20px_5px_#d41c46]">
      <div id="houses" className="w-full h-full">
          <Bar
            data={{
              labels: ['East', 'West'],
              datasets: [
                {
                  label: "US House Points",
                  data: [100, 200],
                  backgroundColor: ["rgba(0,255,0,0.3)", "rgba(255,0,0,0.3)"],
                  borderColor: "red",
                  borderWidth: 2,
                  hoverBorderWidth: 3,
                  hoverBackgroundColor: "rgba(255,255,255,0.3)",
                },
              ]
            }}
            // height={450}
            // width={750}
            options={{
              maintainAspectRatio: false,
              responsive: true,
            }}
          
          />
        </div>
        </div>

      
     

      
      


      
    </main>
    <Footer />
    </>
  );
}
