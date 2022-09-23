import "./styles.css";

document.getElementById("app").innerHTML = ``;

function $(x) {
  return document.getElementById(x);
}
/*<div class="show-data"> 
    <img > 
    <div class="show-info"> 
        <h1>[Show title]</h1> 
        <p>[Show summary]</p> 
    </div> 
</div>  
url=https://api.tvmaze.com/search/shows?q=*/

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
      //container.appendChild(img1);
    });
  return img1;
}

async function addToDocument(container, showName, showSUmmary, showImageURL) {
  /* console.log("show name" + showName);
  console.log("show summary: " + showSUmmary);
   console.log(
    "show image: " + showImageURL
  );*/
  const img1 = await getImage(showImageURL);

  const infoDiv = document.createElement("div");
  const showTitle = document.createElement("h1");
  infoDiv.className = "show-info";
  showTitle.innerHTML = showName;

  infoDiv.appendChild(showTitle);
  //showSUmmary = new DOMParser().parseFromString(showSUmmary, "text/xml");

  infoDiv.innerHTML = infoDiv.innerHTML + showSUmmary;
  container.appendChild(img1);
  container.appendChild(infoDiv);
}

function clearNode(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

startFunction();

async function startFunction() {
  let search = $("submit-data");
  let dataContainer = $("dataS");
  search.addEventListener("click", function () {
    clearNode(dataContainer);
    let show = $("input-show").value;

    let url = "https://api.tvmaze.com/search/shows?q=" + show;
    var data = fetchData(url)
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

/*console.log(
        JSON.stringify(
          res[0].show.name + res[0].show.summary + res[0].show.image
        )
      ); */
