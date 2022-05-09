<template>
    <div class="container mt-3">
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
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <router-link :to="`/about/${place.placeId}`">
                                        {{ place.name }}
                                    </router-link>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";

export default {
    name: "HomeView",
    setup() {
        const state = reactive({
            places: [],
            filteredPlaces: computed(() => updatePlaceList()),
            placeName: "",
        });

        fetch("https://digital-nomads-api.herokuapp.com/place/")
            .then((res) => res.json())
            .then((data) => (state.places = data));
        return { ...toRefs(state) };

        function updatePlaceList() {
            if (!state.placeName) {
                return state.places;
            }

            return state.places.filter((place) => {
                return place.name.toLowerCase().includes(state.placeName);
            });
        }
    },
};
</script>
