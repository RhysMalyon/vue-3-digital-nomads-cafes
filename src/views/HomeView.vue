<template>
    <GMapMap
        :center="mapCenter"
        :zoom="mapZoom"
        map-type-id="terrain"
        style="width: 100vw; height: calc(100vh - 56px)"
        ref="myMap"
    >
        <GMapCluster
            :minimumClusterSize="20"
            :zoomOnClick="true"
            :styles="clusterImages"
        >
            <GMapMarker
                v-for="place in filteredPlaces"
                :key="place.placeId"
                :position="place.location"
                :clickable="true"
                @click="openMarker(place.placeId)"
                @closeclick="openMarker(null)"
            >
                <GMapInfoWindow
                    :closeclick="true"
                    @closeclick="openMarker(null)"
                    :opened="openedMarkerID === place.placeId"
                >
                    <div style="width: 200px">
                        <h5>
                            <router-link :to="`/about/${place.placeId}`">
                                {{ place.name }}
                            </router-link>
                        </h5>
                        <p>{{ place.address }}</p>
                    </div>
                </GMapInfoWindow>
            </GMapMarker>
        </GMapCluster>
    </GMapMap>
    <div class="container my-3">
        <div class="home">
            <div class="input-group mb-3">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Enter store name"
                    v-model="placeName"
                />
            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                <div v-for="place in filteredPlaces" :key="place.placeId">
                    <place-card :place="place" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive, toRefs, computed, ref } from "vue";
import Place from "@/types/place";
import clusterImages from "@/assets/clusterImages";
import PlaceCard from "@/components/PlaceCard.vue";

export default {
    setup() {
        const state: {
            places: Place[];
            filteredPlaces: Place[];
            placeName: string;
            mapCenter: {
                lat: number;
                lng: number;
            };
            mapZoom: number;
            openedMarkerID: string | null;
        } = reactive({
            places: [],
            filteredPlaces: computed(() => updatePlaceList()),
            placeName: "",
            mapCenter: computed(() => findMapCenter()),
            mapZoom: 7,
            openedMarkerID: null,
        });

        const myMap = ref(null);

        fetch("https://digital-nomads-api.herokuapp.com/place/")
            .then((res) => res.json())
            .then((data) => (state.places = data))
            .then(() =>
                state.places.forEach((place: Place) => {
                    place.location = {
                        lat: place.latitude,
                        lng: place.longitude,
                    };
                })
            );
        return {
            ...toRefs(state),
            myMap,
            openMarker,
            clusterImages,
        };

        function openMarker(id: null | string) {
            state.openedMarkerID = id;
        }

        function updatePlaceList() {
            if (!state.placeName) {
                return state.places;
            }

            return state.places.filter((place: Place) => {
                return place.name
                    .toLowerCase()
                    .includes(state.placeName.toLowerCase());
            });
        }

        function findMapCenter() {
            if (state.filteredPlaces.length === 0) {
                return { lat: 35.6762, lng: 139.6503 };
            } else if (state.filteredPlaces.length === 1) {
                state.mapZoom = 15;
                return {
                    lat: state.filteredPlaces[0].latitude,
                    lng: state.filteredPlaces[0].longitude,
                };
            } else {
                let avgLat = 0;
                let avgLng = 0;

                state.filteredPlaces.forEach((place) => {
                    avgLat += place.latitude;
                    avgLng += place.longitude;
                });

                state.mapZoom = 10;

                return {
                    lat: avgLat / state.filteredPlaces.length,
                    lng: avgLng / state.filteredPlaces.length,
                };
            }
        }
    },

    components: {
        PlaceCard,
    },
};
</script>
