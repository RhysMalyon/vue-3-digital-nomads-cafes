<template>
    <div class="col">
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">
                    <a :href="`about/${place.placeId}`">{{ place.name }}</a>
                </h5>
            </div>
        </div>
    </div>
</template>
