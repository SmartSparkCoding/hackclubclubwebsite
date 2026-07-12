const track = document.getElementById("projectTrack");


const cards = [...projects, ...projects, ...projects];


cards.forEach(project => {


const card = document.createElement("div");

card.className = "project-card";


card.innerHTML = `

<div class="project-image">

<img src="${project.image}" alt="${project.name}">

</div>


<div class="card-body">


<p>

<strong>${project.person}</strong>

${project.age ? `(${project.age})` : ""}

${project.country ? ` from ${project.country}` : ""}

made

<strong>${project.name}</strong>.

</p>


<div class="buttons">


${project.play ? 
`
<a class="try-btn"
href="${project.play}"
target="_blank">

Try it out →

</a>
`
:""
}


${project.code ?
`
<a class="code-btn"
href="${project.code}"
target="_blank">

&lt;/&gt;

</a>
`
:""
}


</div>


</div>

`;

track.appendChild(card);

});



const button =
document.getElementById("pauseButton");


let paused=false;


button.onclick=()=>{

paused=!paused;

track.style.animationPlayState =
paused ? "paused" : "running";


button.textContent =
paused ? "▶" : "⏸";

};