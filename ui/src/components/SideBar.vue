<script></script>
<template>
  <div id="sidebar">
    <div id="menu">
      <div class="menu-item">
        Chords
      </div>
    </div>
    <div id="footnote">Tsunami Tabs<br><b>@</b><a href="https://github.com/derekolsen/"
        target="_blank"><b>derekolsen</b></a>
    </div>
  </div>
</template>
<style>
#sidebar {
  display: flex;
  position: absolute;
  flex-flow: column;
  background: #c2c2c2;
  width: 200px;
  left: -200px;
  justify-content: space-between;
  transition: transform 200ms ease-in-out;
  z-index: 13;
  height: calc(100% - 48px);
}

#sidebar.visible {
 transform: translate(200px);
 transition: transform 200ms ease-in-out;
}

#menu {
  background: #00456d;
  color: white;
  flex: 1;
}

.menu-item {
  text-align: center;
  padding: 6px;
}

#footnote {
  background: #006caa;
  justify-self: flex-end;
  color: white;
  padding: 6px;
  text-align: center;
}

#footnote a {
  color: white;
  text-decoration: none;
}

#footnote a:hover {
  color: white;
  text-decoration: underline;
}
</style>