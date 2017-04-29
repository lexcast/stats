'use babel';

import {CompositeDisposable} from 'atom';
import Stats from 'stats.js';

export default {
  subscriptions: null,
  stats: null,

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'stats:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();

    if (this.stats) {
      document.body.removeChild(this.stats.dom);
      this.stats = null;
    }
  },

  toggle() {
    if (!this.stats) {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);
      requestAnimationFrame(this.loop.bind(this));
    } else {
      document.body.removeChild(this.stats.dom);
      this.stats = null;
    }
  },

  loop() {
    if (this.stats) {
      this.stats.update();
      requestAnimationFrame(this.loop.bind(this))
    }
  }
};
