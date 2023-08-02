<template>
    <div class="container">
        <Breadcrumb :items="['学习视频', '交接班']" />
        <div class="modal-body xl-flex xl-center xl-column">
            <video controls  x5-playsinline webkit-playsinline="true" playsinline="true" autoplay>
                <source src="https://0076-1251411604.cos.ap-guangzhou.myqcloud.com/jiaojieban.mp4" type="video/mp4">
            </video>
        </div>
    </div>
</template>
<style scoped>
.modal-body {
    width: 100%;
    height: calc(100vh - 130px);
}

video {
    width: 100%;
    height: 100%;
    object-fit: fill;
}
</style>