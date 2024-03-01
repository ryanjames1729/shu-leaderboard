'use client'
import { GraphQLClient } from 'graphql-request'
import Image from "next/image";
import Footer from "./components/Footer";

import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js"
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.defaults.color = "rgba(255,255,255,0.3)";
Chart.defaults.font.size = 16;

async function getHouses() {
  const GRAPHCMS_URL_ENDPOINT = 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clsz49doe000008laga4i162u/master'
  const graphcms = new GraphQLClient(GRAPHCMS_URL_ENDPOINT)

  const { houseEntries }: { houseEntries: Array<{ houseName: string, housePoints: number }> } = await graphcms.request(
    `
    query HouseEntries {
      houseEntries {
        houseName
        housePoints
      }
    }
    `
  )

  return houseEntries
}

export default async function Home() {

  const houseData: Array<{ houseName: string, housePoints: number }> = await getHouses();

  const houseName1 = houseData[0].houseName;
  const housePoints1 = houseData[0].housePoints;
  const houseName2 = houseData[1].houseName;
  const housePoints2 = houseData[1].housePoints;

  return (
    <>
    <main className="font-primary bg-gradient-to-r from-primary via-fuchsia-500 to-secondary text-slate-700 flex min-h-screen flex-col items-center justify-between lg:p-24 py-24">
      <div className="relative flex place-items-center flex-col -mt-12 w-96 lg:w-auto">
      <h1 className={`mb-3 lg:text-6xl text-2xl text-center`}>Carolina Day School</h1>
      </div>

      <div className="h-full w-full mx-auto py-2 ">
        <div className="mx-auto py-2 flex flex-col place-items-center relative lg:h-96 lg:w-96 h-48 w-48">
        <Image
          src="/SHU-logo.png"
          alt="SHU Logo"
          fill={true}
        />
        </div>
        <div className="mx-auto mt-4 flex flex-col place-items-center lg:w-7/12 lg:h-96 w-72 h-96 bg-slate-600 rounded-lg shadow-[0_0_20px_5px_#d41c46]">
        <div id="houses" className="w-full h-full">
            <Bar
              data={{
                labels: [houseName2, houseName1],
                datasets: [
                  {
                    label: "SHU Points",
                    data: [housePoints2, housePoints1],
                    backgroundColor: ["rgba(0,0,255,0.3)", "rgba(255,0,0,0.3)"],
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
      </div>
      

      
     

      
      


      
    </main>
    <Footer />
    </>
  );
}
