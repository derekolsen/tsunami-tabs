<script>
import TabSegment from "./TabSegment.vue";

export default {
  components: {
    TabSegment,
  },
  data() {
    return {
      tab: {},
      tabObj: [],
      chordRegex:
        /[A-G]#?b?m?5?7?(?:dim)?(?:dim7)?(?:aug)?(?:sus2)?(?:sus4)?(?:maj7)?(?:m7)?(?:7sus4)?(?=\s|$)/g,
      examplePlaintext:
`b = pitch bend
/ = slide
h = harmonic

[Intro/verse 1]

E|-------------------|-----------------|
B|-------5-----------|-------5---------|
G|-------------------|-----------------|  x6
D|-4b-4b-----5-------|-4b-4b-----5-6-7-|
A|-----------5-5-/---|-----------5-6-7-|
E|---------0-3-----5-|---------0-3-4-5-|`,
      exampleData: [
        [
          // line 1
          { data: "b = pitch bend", chord: false, whitespace: 0 }
        ],
        [
          // line 2
          { data: "/ = slide", chord: false, whitespace: 0 }
        ],
        [
          // line 3
          { data: "h = harmonic", chord: false, whitespace: 0 }
        ],
        [
          // line 4
          { data: "", chord: false, whitespace: 0 }
        ],
        [
          // line 5
          { data: "[Intro/verse 1]", chord: false, whitespace: 0 }
        ],
        [
          // line 6
          { data: "", chord: false, whitespace: 0 }
        ],
        [
          // group 1
          [
            // line 1
            { data: "E|-------------------|-----------------|", chord: false, whitespace: 0 }
          ],
          [
            // line 2
            { data: "B|-------5-----------|-------5---------|", chord: false, whitespace: 0 }
          ],
          [
            // line 3
            { data: "G|-------------------|-----------------|  x6", chord: false, whitespace: 0 }
          ],
          [
            // line 4
            { data: "D|-4b-4b-----5-------|-4b-4b-----5-6-7-|", chord: false, whitespace: 0 }
          ],
          [
            // line 5
            { data: "A|-----------5-5-/---|-----------5-6-7-|", chord: false, whitespace: 0 }
          ],
          [
            // line 6
            { data: "E|---------0-3-----5-|---------0-3-4-5-|", chord: false, whitespace: 0 }
          ],
        ]
      ]
    };
  },
  emits: ["toolbar"],
  mounted() {
    this.$emit("toolbar", true);
    fetch("/api/tab/" + this.$route.params.id)
      .then((response) => response.json())
      .then((data) => {
        // The following code divides a newline-separated string
        // into "segment" objects which are given 3 properties.
        // These segments make up a new JS array
        //  1. Chord (bool)
        //  2. Data (string)
        //  3. Left whitespace (num)
        //      - note: right whitespace is unnecessary

        this.tab = data;

        let lines = this.tab.tab.split("\n");

        let tabObj = [];
        let i = 0;
        let segment;

        lines.forEach((line) => {
          tabObj.push([]);
          segment = {};

          if (!line) {
            // Line is empty (newline)
            tabObj[i].push({
              data: "",
              chord: false,
              whitespace: 0,
            });
          }

          while (line) {
            segment = {};
            let match = line.match(this.chordRegex);
            let matchIndex = line.search(this.chordRegex);

            if (!match) {
              // A line has one segment without any chords
              // Segmentize the line remainder
              segment.chord = false;
              segment.data = line;
              segment.whitespace =
                segment.data.length - segment.data.trimStart().length;
              segment.data = segment.data.trimStart();
              // Remove line remainder
              line = "";
            } else if (matchIndex >= 0) {
              let precedingData = line.slice(0, matchIndex);
              if (precedingData.match(/[^\s]/g)) {
                // A chord is preceded by a segment and its possible whitespace
                // Segmentize the chord's preceding segment
                segment.chord = false;
                segment.data = precedingData.trim();
                segment.whitespace =
                  precedingData.length - precedingData.trimStart().length;
                // Remove segment from line
                line = line.slice(segment.whitespace + segment.data.length);
              } else {
                // A chord is only preceded by possible whitespace
                // Segmentize the chord
                segment.chord = true;
                segment.data = typeof match == "string" ? match : match[0];
                segment.whitespace = matchIndex;
                // Remove chord segment from line
                line = line.slice(segment.whitespace + segment.data.length);
              }
            }
            tabObj[i].push(segment);
          }
          i += 1;
        });

        function hasChord(line) {
          let seg;
          for (seg in line) {
            if (line[seg].chord) {
              return true;
            }
            return false;
          }
        }

        let f;
        for (f in tabObj) {
          let h = f;
          while (hasChord(tabObj[h])) h++;
          //console.log(f + " => " + (h))
        }
        this.tabObj = tabObj;
      })
      .catch((err) => console.log(err));
  },
  unmounted() {
    this.$emit("toolbar", false);
  },
};
</script>

<template>
  <main>
    <div class="tab-ctnr">
      <h2>{{ tab.title }}</h2>
      <h3>{{ tab.artist }}</h3>
      <div v-if="tab.owner" class="owner">
        Uploaded by
        <router-link :to="{ path: '/user/' + tab.owner }">{{
          tab.owner
        }}</router-link>
      </div>
      <div class="description">{{ tab.description }}</div>
      <div><i class="bi bi-bookmark-star-fill"></i> {{ tab.favorites }}</div>
      <div><i class="bi bi-eye-fill"></i> {{ tab.hits }}</div>
      <div class="share"><i class="bi bi-share-fill"></i> Share</div>
      <br />
      <hr />
      <div class="tab">
        <span ref="em" >█</span>
        <TabSegment v-for="line in tabObj" :key="line"></TabSegment>
      </div>
    </div>
  </main>
</template>

<style>
.description {
  color: #555;
}

.owner {
  color: #555;
}

@media only screen and (min-width: 768px) {
  .tab-ctnr {
    margin-left: 15%;
    margin-right: 15%;
  }
}

.tab {
  font-family: "Courier New", Courier, monospace;
}

.bi-arrows-angle-expand,
.bi-arrows-angle-contract {
  position: absolute;
  top: 12px;
  right: 12px;
  line-height: 0;
  color: grey;
  font-size: 48px;
  padding: 16px;
  border-radius: 40px;
}

.bi-arrows-angle-expand:hover,
.bi-arrows-angle-contract:hover {
  background: #dddddd;
  color: black;
}

.chord {
  background: #dedede;
  border-radius: 2px;
  cursor: default;
  font-weight: 800;
  padding: 0.1em 0.15em 0;
  margin: -0.1em -0.15em 0;
}

.chord:hover {
  background: #c5c5c5;
}

.chord-cntr {
  display: block;
  line-height: 0;
  scroll-snap-align: center;
}

.chord-carousel {
  height: 180px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-snap-stop: always;
  /* scrollbar-width: none;  /* Firefox */
}

/* 2015 spec - For Firefox, Edge, IE */
.chord-carousel {
  scroll-snap-type: mandatory;
  -ms-scroll-snap-type: mandatory;
  scroll-snap-points-x: repeat(100%);
  -ms-scroll-snap-points-x: repeat(100%);
}

/* Hide scrollbar
.chord-carousel::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome
} */

.chord-img {
  margin-left: 11px;
}

:root {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #444444;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 8px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>