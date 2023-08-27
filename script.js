const searchform = document.querySelector('form');
const moviecontainer=document.querySelector('.movie-container');
const inputbox=document.querySelector('.inputbox');

//function to fetch movie details Hritik-->
const getmovieinfo = async (movie)=>{

  try{
  const apikey="c2570690";
  const url=`http://www.omdbapi.com/?apikey=${apikey}&t=${movie}`;

  const response=await fetch(url);
  if(!response.ok)
  {
     throw new Error("unable to fetch movie data");
  }
  const data= await response.json();
  showmoviedata(data);
  }
  catch(error){
    showerrormessage("No Movie Found!!!");

  }

}
//function to show movie data on screen 
const showmoviedata=(data)=>
{ 
  moviecontainer.innerHTML="";
  moviecontainer.classList.remove('nobackground');

  //use destructing assignment to extract properties from data objects
  const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;
  const movieelement=document.createElement('div');
  movieelement.classList.add('movie-info');
  movieelement.innerHTML=`<h2>${Title}</h2>
                          <p><strong>Rating:&#11088</strong>${imdbRating}</p>`;


 const moviegenreelement=document.createElement('div');
 moviegenreelement.classList.add('movie-genre');
 Genre.split(",").forEach(element=>{
  const p=document.createElement('p');
  p.innerText=element;
  moviegenreelement.appendChild(p);
 });


  
  movieelement.appendChild(moviegenreelement);
  movieelement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p>
                            <p><strong>Cast: </strong>${Actors}</p>
                            <p><strong>Plot: </strong>${Plot}</p>`

  //adding a div for movie poster-->
  const movieposterelement=document.createElement('div');
  movieposterelement.classList.add('movie-poster');
  movieposterelement.innerHTML=`<img src="${Poster}"/>`

  moviecontainer.appendChild(movieposterelement);
  
  moviecontainer.appendChild(movieelement);
}
//function to show error message
const showerrormessage=(message)=>{
  moviecontainer.innerHTML=`<h2>${message}</h2>`;
  moviecontainer.classList.add('nobackground');
}



//add event listener to search form
searchform.addEventListener('submit',(e) => {
 
  e.preventDefault();
  const moviename=inputbox.value.trim();
  if(moviename!=='')
  { 
    showerrormessage("Fetching Movie Information......");
    getmovieinfo(moviename);  
  }
  else{
    showerrormessage("Enter Movie name to get movie information");
  }

})
