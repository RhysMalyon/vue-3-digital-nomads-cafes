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
            :styles="[
                {
                    textColor: 'black',
                    url: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m1.png',
                    height: 52,
                    width: 53,
                },
                {
                    textColor: 'black',
                    url: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m2.png',
                    height: 55,
                    width: 56,
                },
                {
                    textColor: 'black',
                    url: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m3.png',
                    height: 65,
                    width: 66,
                },
                {
                    textColor: 'black',
                    url: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m4.png',
                    height: 77,
                    width: 78,
                },
                {
                    textColor: 'black',
                    url: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m5.png',
                    height: 89,
                    width: 90,
                },
            ]"
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
                    <div style="width: 200px;">
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
                    <div class="col h-100">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <router-link
                                        :to="`/about/${place.placeId}`"
                                    >
                                        {{ place.name }}
                                    </router-link>
                                </h5>
                                <div class="d-flex mt-3">
                                    <p v-if="place.hasPower" class="m-0">
                                        <BIconPlug />
                                    </p>
                                    <p v-if="place.hasWifi" class="m-0">
                                        <BIconWifi />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, computed, ref } from "vue";
import { BIconPlug, BIconWifi } from "bootstrap-icons-vue";

export default {
    setup() {
        const state = reactive({
            places: [],
            filteredPlaces: computed(() => updatePlaceList()),
            placeName: "",
            mapCenter: computed(() => findMapCenter()),
            mapZoom: 7,
        });

        const myMap = ref(null);

        fetch("https://digital-nomads-api.herokuapp.com/place/")
            .then((res) => res.json())
            .then((data) => (state.places = data))
            .then(() =>
                state.places.forEach((place) => {
                    place.location = {
                        lat: place.latitude,
                        lng: place.longitude,
                    };
                })
            );
        return {
            ...toRefs(state),
            myMap,
        };

        function updatePlaceList() {
            if (!state.placeName) {
                return state.places;
            }

            return state.places.filter((place) => {
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

    data() {
        return {
            openedMarkerID: null,
        };
    },

    methods: {
        openMarker(id) {
            this.openedMarkerID = id;
        },
    },

    components: {
        BIconPlug,
        BIconWifi,
    },
};
</script>
