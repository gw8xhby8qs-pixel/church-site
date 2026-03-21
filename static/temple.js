document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".interactive-item");
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    const closeModal = document.getElementById("close-modal");

    items.forEach(item => {
        item.addEventListener("click", () => {
            modalText.textContent = item.dataset.info;
            modal.style.display = "block";
        });
    });

    closeModal.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => { if(e.target === modal) modal.style.display = "none"; });
});