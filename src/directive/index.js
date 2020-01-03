export class exposure {
  constructor() {
    this.init()
  }
  init() {
    const self = this;
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(item => {
          if (item.isIntersecting) {
            const data = JSON.parse(item.target.getAttribute('data-article'));
            self.upload(data);
            data.once && observer.unobserve(item.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
  }
  add(el) {
    this.observer && this.observer.observe(el);
  }
  upload(data) {
    console.log(data)
  }
}