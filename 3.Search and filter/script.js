function filterList() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const ul = document.getElementById("itemList");
    const li = ul.getElementsByTagName("li");

    for (let i = 0; i < li.length; i++) {
        const itemText = li[i].textContent || li[i].innerText;
        if (itemText.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
