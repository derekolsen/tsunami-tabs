<script>
import Popper from "vue3-popper";

export default {
  components: {
    Popper,
  },
  props: {
    line: Array,
  },
  mounted() {
    // Debounce retrieving tab width

    function throttle(f, delay) {
      let timer = 0
      return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => f.apply(this, args), delay)
      }
    }

    const resizeObserver = new ResizeObserver(throttle((entries) => {
      const emW = this.$refs.em.getBoundingClientRect().width
      const tabW = this.$refs.tabLine.getBoundingClientRect().width
      console.log(`${tabW} / ${emW} = ` + Math.floor(tabW / emW))
    }, 250))

    resizeObserver.observe(this.$refs.tabLine)
  },
};
</script>

<!-- <template>
  <span style="color: blue;"><slot></slot></span><span v-for="segment in line">{{ "&emsp;".repeat(segment.whitespace) }}<span v-if="segment.chord" class="chord"><Popper placement="top" arrow>{{segment.data}}<template v-slot:content><div class="chord-carousel"><div class="chord-cntr"><img class="chord-img" src="https://tombatossals.github.io/react-chords/media/guitar/chords/Eb/major/1.svg" height="180" width="180"></div><div class="chord-cntr"><img class="chord-img" src="https://tombatossals.github.io/react-chords/media/guitar/chords/Eb/major/2.svg" height="180" width="180"></div><div class="chord-cntr"><img class="chord-img" src="https://tombatossals.github.io/react-chords/media/guitar/chords/Eb/major/3.svg" height="180" width="180"></div></div></template></Popper></span><span v-else>{{segment.data}}</span></span><br>
</template>
-->

<!-- https://stackoverflow.com/questions/63023382/wrapping-multiple-lines-as-a-single-unit -->

<!-- <template>
  <div class="group">
  </div>
</template> -->

<template>
  <div ref="mydiv">

    <span ref="em">█</span>
    <div class="group" :style="'--groupOffset: ' + 0 + 'em'">
      <span ref="tabLine" class="line">
        line 1 Lorem ipsum dolor sit amet, consectatur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </span>
      <span class="line"
        >line 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </span>
      <span class="line" :style="'--lineOffset: ' + 1.5 + 'em'"
        >line 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </span>
    </div>
    <div class="group" :style="'--groupOffset: ' + 28 + 'em'"> <!-- this should be calculated, possibly passed in from parent component -->
      <span class="line line1">
        line 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </span>
      <span class="line" :style="'--lineOffset: ' + 1.5 + 'em'"
        >line 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </span>
    </div>
  </div>
</template>


<style>
.container {
  position: static;
}

.group {
  position: relative;
  word-break: break-all;
  transform: translateY(var(--groupOffset));
}

.line {
  position: absolute;
  transform: translateY(var(--lineOffset)); /* 1.5em for second line */
  line-height: 4em;
}
</style>