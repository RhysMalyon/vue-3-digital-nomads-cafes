<template>
    <div class="col h-100">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">
                    <a :href="`about/${place.placeId}`">{{ place.name }}</a>
                </h5>
            </div>
        </div>
    </div>
</template>
