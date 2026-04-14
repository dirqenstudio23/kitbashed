document.addEventListener("DOMContentLoaded", function () {
  fetch("https://dirqenstudio23.github.io/kitbashed/footer/CTA/cta-footer.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("cta-footer").innerHTML = html;
    })
    .catch((err) => console.error("Failed to load CTA footer:", err));
});
