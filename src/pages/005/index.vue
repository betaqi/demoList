<script setup>

</script>

<template>
  <div relative h-screen w-screen flex items-center justify-center style="background-color: #2b3a42">
    <div class="box box-outer">
      <div class="item top" />
      <div class="item bottom" />
      <div class="item front" />
      <div class="item back" />
      <div class="item left" />
      <div class="item right" />
    </div>
    <div class="box box-inner">
      <div class="item top" />
      <div class="item bottom" />
      <div class="item front">
        web
      </div>
      <div class="item back" />
      <div class="item left" />
      <div class="item right">
        pack
      </div>
    </div>
  </div>
</template>

<style scoped>
    body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
.box {
  width: 100px;
  height: 100px;
}

.box-outer {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform-style: preserve-3d;
  transform: scale3d(1, 1, 1) rotateX(-33.5deg) rotateY(45deg);
  animation: outerLoop 6s ease-in-out infinite;
}

.box-outer > .item {
  background-color: rgba(141, 214, 249, 0.5);
  border: 1px solid #fff;
}

.box-inner > .item {
  background-color: #175d96;
  border: 1px solid #fff;
}

.box-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  transform: scale(0.5) rotateX(-33.5deg) rotateY(45deg);
  animation: innerLoop 6s ease-in-out infinite;
}

.item {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.6;
  text-align: center;
  color: white;
  font-size: 40px;
  line-height: 100px;
  font-weight: 700;
}

.top {
  transform: rotateX(90deg) translateZ(50px);
}

.bottom {
  transform: rotateX(-90deg) translateZ(50px);
}

.front {
  transform: translateZ(50px);
}

.back {
  transform: translateZ(-50px);
}

.left {
  transform: rotateY(-90deg) translateZ(50px);
}

.right {
  transform: rotateY(90deg) translateZ(50px);
}

@keyframes innerLoop {
  0% {
    transform: scale(0.5) rotateX(-33.5deg) rotateY(45deg);
  }

  50%,
  100% {
    transform: scale(0.5) rotateX(-33.5deg) rotateY(-315deg);
  }
}

@keyframes outerLoop {
  0% {
    transform: rotateX(-33.5deg) rotateY(45deg);
  }

  50%,
  100% {
    transform: rotateX(-33.5deg) rotateY(405deg);
  }
}
</style>
