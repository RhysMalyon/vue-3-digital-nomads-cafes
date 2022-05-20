<template>
    <div class="col h-100">
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">
                    <router-link :to="`/about/${place.placeId}`">
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
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import Place from "@/types/place";
import { BIconPlug, BIconWifi } from "bootstrap-icons-vue";

export default defineComponent({
    props: {
        place: {
            required: true,
            type: Object as PropType<Place>,
        },
    },

    setup(props) {
        const state: { place: Place } = reactive({
            place: props.place as Place,
        });

        return {
            ...toRefs(state),
        };
    },

    components: {
        BIconPlug,
        BIconWifi,
    },
});
</script>
