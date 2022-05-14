<script>

</script>
<template>
  <div class="nav-item tool">
      <span class="nav-link tool-name">Transpose</span>
      <button type="button" class="btn btn-outline-light ms-2"><i class="bi bi-caret-down-fill"></i></button>
      <span id="transposition">-1</span>
      <button type="button" class="btn btn-outline-light me-3"><i class="bi bi-caret-up-fill"></i></button>
  </div>
  <div class="m-1"></div>
  <div class="nav-item tool">
    <span class="nav-link tool-name">Autoscroll</span>
    <button type="button" class="btn btn-outline-light ms-2"><i class="bi bi-play-fill"></i></button>
    <input type="range" name="scrollSpeed" id="scrollSpeed" class="me-3">
  </div>
</template>

<style>
.tool {
  background: #262c32;
  border: 1px solid #161c21;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: .25rem;
}

.tool-name {
  color: white !important;
  padding-top: .4rem !important;
  padding-bottom: .4rem !important;
}

div.tool-icon {
  width: 32px;
  height: 32px;
  line-height: 0;
}

#toolbar i.bi {
  align-self: center;
  font-size: 32px;
}

#toolbar i.bi.fill {
  position: absolute;
  translate: -36px;
  background: white;
  opacity: 0;
}

#toolbar i.bi.fill:hover {
  opacity: 1;
}

#transposition {
  margin-left: 12px;
  margin-right: 12px;
  text-align: center;
  width: 24px;
  color: white;
}

#scrollSpeed {
  margin-left: 1.5rem;
}

.tool > .btn {
  font-size: 1rem;
  line-height: 0;
}
</style>