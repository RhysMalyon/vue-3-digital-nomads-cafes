<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand" href="#">
                <BIconHouseFill />
            </router-link>
        </div>
    </nav>
    <router-view />
</template>

<script>
import { BIconHouseFill } from 'bootstrap-icons-vue'

export default {
    components: {
        BIconHouseFill,
    }
}
</script>
