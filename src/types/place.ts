import Image from './image'

export default interface Place {
    _id: string,
    placeId: string,
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    location: {
        lat: number,
        lng: number
    },
    hasWifi: boolean,
    hasPower: boolean,
    images: Image[],
    businessHours: string[],
    rating: number,
    website: string,
    phoneNumber: string,
    ratingsTotal: number,
    businessStatus: string
}