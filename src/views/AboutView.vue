<template>
    <div class="container mt-3">
        <div class="container about" v-if="place">
            <h1>
                <a :href="place.website">{{ place.name }}</a>
            </h1>
            <div
                id="carouselExampleControls"
                class="carousel slide"
                data-bs-ride="carousel"
                style="max-width: 936px"
            >
                <div class="carousel-inner">
                    <div
                        v-for="(image, index) in place.images"
                        :key="index"
                        :class="
                            index === 0
                                ? 'carousel-item active'
                                : 'carousel-item'
                        "
                    >
                        <img
                            :src="image.src"
                            alt=""
                            class="d-block w-100"
                            style="
                                height: 522px;
                                object-fit: cover;
                                object-position: 50% 50%;
                            "
                        />
                    </div>
                </div>
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                >
                    <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                >
                    <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <p>{{ place.address }}</p>
            <div class="d-flex">
                <p v-if="place.hasPower"><BIconPlug /></p>
                <p v-if="place.hasWifi"><BIconWifi /></p>
            </div>
            <ul>
                <li v-for="day in place.businessHours" :key="day">
                    {{ day }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { BIconPlug, BIconWifi } from "bootstrap-icons-vue";
import Place from "@/types/place";
import Image from "@/types/image";

export default {
    setup() {
        const route = useRoute();

        const state: { place: Place } = reactive({
            place: {} as Place,
        });
        fetch(
            `https://digital-nomads-api.herokuapp.com/place/${route.params.slug}/`
        )
            .then((res) => res.json())
            .then((data) => {
                state.place = data;
                state.place.images = JSON.parse(data.images).map(
                    (image: Image) => {
                        return image.src;
                    }
                );
                state.place.businessHours = JSON.parse(data.businessHours);
            });
        return { ...toRefs(state) };
    },

    components: {
        BIconPlug,
        BIconWifi,
    },
};
</script>
