const Controller = {
  search: (ev) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const q = data.query;
    const response = fetch(`/search?q=${data.query}`).then((response) => {
      response.json().then((results) => {
        Controller.updateTable(results, q);
      });
    });
  },

  updateTable: (results,q) => {
    //console.log(results)
    const table = document.getElementById("table-body");
    const rows = [];
    const c = q.length;
    for (let result of results) {
      const start = result.substring(0,150);
      const word = result.substring(150,150+c);
      const end = result.substring(150+c,300);
      rows.push(`<tr> ${start}<b><u>${word}</u></b>${end}<tr/>`);

    }
    table.innerHTML = rows;
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
