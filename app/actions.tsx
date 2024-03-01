'use server'

import { gql, GraphQLClient } from 'graphql-request'
import { redirect } from 'next/navigation'

export async function getPoints() {
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

export async function updatePoints(bluePoints: string, redPoints: string) {
    const housePoints = (await getPoints()).map(entry => entry.housePoints);

    housePoints[1] += bluePoints ? parseInt(bluePoints) : 0;
    housePoints[0] += redPoints ? parseInt(redPoints) : 0;

    const bluePointsPost = housePoints[1];
    const redPointsPost = housePoints[0];

    const GRAPHCMS_URL_ENDPOINT = 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clsz49doe000008laga4i162u/master'
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDg3MjA4MzIsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEtc2hhcmVkLXVzZWExLTAyLmh5Z3JhcGguY29tL3YyL2Nsc3o0OWRvZTAwMDAwOGxhZ2E0aTE2MnUvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtdXMtZWFzdC0xLXNoYXJlZC11c2VhMS0wMi5oeWdyYXBoLmNvbS8iLCJzdWIiOiIwZmFjZDg2MS00YWZkLTQyN2ItYTdkYS1jNmM3YjU4MjhmY2QiLCJqdGkiOiJjbHM1MHNsZnowNGswMDFqeTZvamRmcWRwIn0.gknPf_vaBhUBvfhfi4IIl4TJgT3X09hhdMu4PQvTmvZx3jIM9EqY1RzMkkB_AZc6kVcshn03XaARBHFCpSaO5sieVOz527pMdrBR9ZA8abHQ2644_O1ZLzLSyPrXVeAHWXJ0AW5qCPLtCYpMh-N3ZhMTkcY9Z_RcCMHPj18OwDnG7lsAeaoX8Rwhr3DeAL2bVo4aoo_9UDM7AZ5boyNvmlhhdCA1az4HcG8loa3U8FhxCJeYfW_Rskjex9WM0liZt74-W9d4mVDdmobN8CDIH2S04DXvkDbpqreMvdTIViWlu-yuH2WvLOmCMBzl3F-EozO6hhA5qu9kooF_CjepSx3TMG_4Un6-LA58WtCwQXUpnerSeaBqze0OEqxmtSzcwXh2DCtoiohGXGw9v2a2haolYR4XLP6MfjOggDigaihjuIgzoyI_6vLrKlJrH-ojZUfJd1JRfCObeganVjMujVpXlegS46BH9a7Q2c6y8lYFEVRrlDD1WJ7HbMYBW2YrhBWUdXxsT6Diwh-vwIx_ikjH2zaVSh-3snLuiu4uoZbi8izliS_Q4QgKCz7B2F3SIJ6kAgr5lVJhZIl7hXYRoUkPYYSHwzqLcKQzVKrjI9vgeVj4RgTuRF4q1O1Ss30VgLO_4SCWgRyB75aHnk4Vv5ZS0bXMvvGPDa6EcBx1sMM'

    const graphQLClient = new GraphQLClient(GRAPHCMS_URL_ENDPOINT, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    })

    const query = gql`
        mutation($bluePointsPost: Float!, $redPointsPost: Float!) {
            updateHouseEntry(
                data: {houseName: "Blue", housePoints: $bluePointsPost}
                where: {houseName: "Blue"}
            ) {
                id
            }
            updateHouseEntry(
                data: {houseName: "Red", housePoints: $redPointsPost}
                where: {houseName: "Red"}
            ) {
                id
            }
            publishHouseEntry(where: {houseName: "Blue"}) {
                id
            }
            publishHouseEntry(where: {houseName: "Red"}) {
                id
            }
        }
    `
    try {
        const { result }: any = await graphQLClient.request(query, {bluePointsPost, redPointsPost})
        console.log('result', result)
        return result
    }
    catch (error) {
        console.error('error', error)
    }
    finally {
        redirect('/')
    }

    return {bluePointsPost, redPointsPost}



}