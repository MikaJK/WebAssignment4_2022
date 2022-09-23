import "./styles.css";

startFunction();
function $(x) {
  return document.getElementById(x);
}

async function fetchData(url) {
  let data = null;
  try {
    data = await fetch(url).then((response) => response.json());
  } catch {}
  return data;
}

async function getImage(showImageURL, container) {
  const img1 = document.createElement("img");

  fetch(showImageURL)
    .then((response) => response.blob())
    .then((myBlob) => {
      const objectURL = URL.createObjectURL(myBlob);
      img1.src = objectURL;
    });
  return img1;
}

async function addToDocument(container, showName, showSUmmary, showImageURL) {
  const img1 = await getImage(showImageURL);

  const infoDiv = document.createElement("div");
  const showTitle = document.createElement("h1");
  infoDiv.className = "show-info";
  showTitle.innerHTML = showName;

  infoDiv.appendChild(showTitle);

  infoDiv.innerHTML = infoDiv.innerHTML + showSUmmary;
  container.appendChild(img1);
  container.appendChild(infoDiv);
}

function clearNode(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

async function startFunction() {
  let search = $("s-form");
  let dataContainer = $("dataS");
  search.addEventListener("submit", function handleSubmit(event) {
    event.preventDefault();
    clearNode(dataContainer);

    let show = $("input-show").value;
    console.log(show);
    let url = "https://api.tvmaze.com/search/shows?q=" + show;
    fetchData(url)
      .then((res) => {
        if (res.length === 0) {
          return;
        } else {
          addToDocument(
            dataContainer,
            res[0].show.name,
            res[0].show.summary,
            res[0].show.image["medium"]
          );
        }
      })
      .then(console.log("done"));
  });
}
