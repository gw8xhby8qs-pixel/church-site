document.addEventListener("DOMContentLoaded", () => {

    const icons = document.querySelectorAll(".father-icon");
    const menu = document.getElementById("texts-menu");
    const textsList = document.getElementById("texts-list");
    const dropZone = document.getElementById("drop-zone");

    const textsData = {
        basil: [
            {title: "О Боге", content: "Текст Василия о Боге"},
            {title: "О молитве", content: "Текст Василия о молитве"}
        ],
        gregory: [
            {title: "О Троице", content: "Текст Григория о Троице"}
        ],
        john: [
            {title: "О покаянии", content: "Текст Иоанна о покаянии"}
        ],
        athanasius: [
            {title: "О воплощении", content: "Текст Афанасия о воплощении"}
        ]
    };

    // Клик по иконке
    icons.forEach(icon => {
        icon.addEventListener("click", () => {
            const father = icon.dataset.father;
            const rect = icon.getBoundingClientRect();
            const texts = textsData[father];

            textsList.innerHTML = "";

            texts.forEach(t => {
                const li = document.createElement("div");
                li.textContent = t.title;
                li.setAttribute("draggable", "true");

                // dragstart с ghost
                li.addEventListener("dragstart", e => {
                    e.dataTransfer.setData("text/plain", t.content);
                    e.dataTransfer.setData("title", t.title);

                    // Создаем ghost для визуализации
                    const ghost = li.cloneNode(true);
                    ghost.style.position = "absolute";
                    ghost.style.top = "-1000px";
                    ghost.style.left = "-1000px";
                    ghost.style.padding = "5px";
                    ghost.style.background = "#fff8dc";
                    ghost.style.border = "1px solid gold";
                    ghost.style.borderRadius = "5px";
                    ghost.style.boxShadow = "0 3px 10px rgba(0,0,0,0.3)";
                    document.body.appendChild(ghost);
                    e.dataTransfer.setDragImage(ghost, ghost.offsetWidth/2, ghost.offsetHeight/2);

                    li._ghost = ghost; // сохраняем ссылку
                    li.classList.add("dragging");
                });

                li.addEventListener("dragend", () => {
                    li.classList.remove("dragging");
                    if (li._ghost) {
                        document.body.removeChild(li._ghost);
                        li._ghost = null;
                    }
                });

                textsList.appendChild(li);
            });

            menu.style.display = "block";
            menu.style.top = rect.bottom + window.scrollY + "px";
            menu.style.left = rect.left + window.scrollX + "px";
        });
    });

    // Скрытие меню
    document.addEventListener("click", e => {
        if (!menu.contains(e.target) && !e.target.closest(".father-icon")) {
            menu.style.display = "none";
        }
    });

    // Drag & Drop на полку
    dropZone.addEventListener("dragover", e => {
        e.preventDefault();
        dropZone.classList.add("drag-over");
    });
    dropZone.addEventListener("dragleave", e => {
        dropZone.classList.remove("drag-over");
    });
    dropZone.addEventListener("drop", e => {
        e.preventDefault();
        dropZone.classList.remove("drag-over");

        const content = e.dataTransfer.getData("text/plain");
        const title = e.dataTransfer.getData("title");

        if (!content) return;

        const book = document.createElement("div");
        book.classList.add("book");
        book.textContent = title || content.slice(0,20) + "...";
        book.addEventListener("click", () => alert(content));

        dropZone.appendChild(book);
    });

});