<template>
    <div class="container mt-3">
        <div class="about" v-if="place">
            <h1><a :href="place.website">{{ place.name }}</a></h1>
            <p>{{ place.address }}</p>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

export default {
    setup() {
        const route = useRoute();

        const place = reactive({
            place: null,
        });
        fetch(
            `https://digital-nomads-api.herokuapp.com/place/${route.params.slug}/`
        )
            .then((res) => res.json())
            .then((data) => {
                place.place = data;
            });
		console.log(place)
        return { ...toRefs(place) };
    },
};
</script>
