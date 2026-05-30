const lightbox = {
  el: null, img: null, video: null, caption: null,
  init() {
    this.el = document.getElementById("lightbox")
    if (!this.el) return
    this.img     = this.el.querySelector("#lightbox-img")
    this.video   = this.el.querySelector("#lightbox-video")
    this.caption = this.el.querySelector("#lightbox-caption")
    this.el.addEventListener("click", (e) => { if (e.target === this.el) this.close() })
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") this.close() })
    document.querySelectorAll("[data-lightbox]").forEach((item) => {
      item.addEventListener("click", () => this.open(item.dataset.src, item.dataset.type || "image", item.dataset.caption || ""))
    })
  },
  open(src, type, caption) {
    this.caption.textContent = caption
    if (type === "video") {
      this.img.classList.add("hidden"); this.video.classList.remove("hidden")
      this.video.src = src; this.video.play()
    } else {
      this.video.classList.add("hidden"); this.video.pause()
      this.img.classList.remove("hidden"); this.img.src = src
    }
    this.el.classList.remove("hidden"); document.body.style.overflow = "hidden"
  },
  close() {
    this.el.classList.add("hidden"); this.video.pause()
    this.video.src = ""; this.img.src = ""; document.body.style.overflow = ""
  },
}
document.addEventListener("DOMContentLoaded", () => lightbox.init())
