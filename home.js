// WonderNest Academy - small interactive features for the homepage

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

const classSearch = document.getElementById("classSearch");
const subjectFilter = document.getElementById("subjectFilter");
const ageFilter = document.getElementById("ageFilter");
const formatFilter = document.getElementById("formatFilter");
const lessonFilter = document.getElementById("lessonFilter");
const resetFilters = document.getElementById("resetFilters");
const resultsCount = document.getElementById("resultsCount");
const classCards = document.querySelectorAll(".class-card");

function filterClasses() {
    const searchTerm = classSearch.value.trim().toLowerCase();
    const selectedSubject = subjectFilter.value;
    const selectedAge = ageFilter.value;
    const selectedFormat = formatFilter.value;
    const selectedLesson = lessonFilter.value;
    let visibleCount = 0;

    classCards.forEach(function (card) {
        const cardText = card.textContent.toLowerCase();
        const matchesSearch = cardText.includes(searchTerm);
        const matchesSubject = selectedSubject === "all" || card.dataset.subject === selectedSubject;
        const matchesAge = selectedAge === "all" || card.dataset.age === selectedAge;
        const matchesFormat = selectedFormat === "all" || card.dataset.format === selectedFormat;
        const matchesLesson = selectedLesson === "all" || card.dataset.lesson === selectedLesson;
        const shouldShow = matchesSearch && matchesSubject && matchesAge && matchesFormat && matchesLesson;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    });

    resultsCount.textContent = "Showing " + visibleCount + " sample class" + (visibleCount === 1 ? "" : "es");
}

classSearch.addEventListener("input", filterClasses);
subjectFilter.addEventListener("change", filterClasses);
ageFilter.addEventListener("change", filterClasses);
formatFilter.addEventListener("change", filterClasses);
lessonFilter.addEventListener("change", filterClasses);

resetFilters.addEventListener("click", function () {
    classSearch.value = "";
    subjectFilter.value = "all";
    ageFilter.value = "all";
    formatFilter.value = "all";
    lessonFilter.value = "all";
    filterClasses();
});

document.querySelectorAll("[data-subject-link]").forEach(function (link) {
    link.addEventListener("click", function () {
        subjectFilter.value = link.dataset.subjectLink;
        filterClasses();
    });
});

const demoForm = document.getElementById("demoForm");
const formMessage = document.getElementById("formMessage");

demoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formMessage.textContent = "This demo form is working as a front-end preview only. It does not send or save your details yet.";
});
