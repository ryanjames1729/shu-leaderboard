'use server'
import { getPoints, updatePoints } from "../../app/actions";

export default async function ShowPoints() {
    const houseData: Array<{ houseName: string, housePoints: number }> = await getPoints();

    const houseName1 = houseData[0].houseName;
    const housePoints1 = houseData[0].housePoints;
    const houseName2 = houseData[1].houseName;
    const housePoints2 = houseData[1].housePoints;

    return ( 
        <div className="mb-5 grid grid-cols-2">
            <p className="text-xl lg:text-3xl">{houseName2}: {housePoints2}</p>
            <p className="text-xl lg:text-3xl">{houseName1}: {housePoints1}</p>
        </div>
)}