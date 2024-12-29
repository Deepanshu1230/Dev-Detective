const lightTheme=document.querySelector("[light]");
const darkTheme=document.querySelector("[dark]");
const searchInfo=document.querySelector("[Search-info]");
const searchbtn=document.querySelector("[search-btn]");
const SearchForm=document.querySelector(".form-container");
const theme=document.querySelector(".theme")
const rootElement =document.documentElement;
const nofound=document.querySelector(".result");


let oldtab;
oldtab=lightTheme;
oldtab.classList.add("active");
rootElement.classList.remove("lightmode");

getfromSessionStorage();


lightTheme.addEventListener("click", () => {
    rootElement.classList.toggle("lightmode"); // Toggle the lightmode class
    lightTheme.classList.toggle("active");
    darkTheme.classList.toggle("active");
  });
  
  darkTheme.addEventListener("click", () => {
    rootElement.classList.toggle("lightmode"); // Toggle the lightmode class
    lightTheme.classList.toggle("active");
    darkTheme.classList.toggle("active");
  });


async function fetchGitInfo(username){
     
    try{
       
    let response=await fetch(`https://api.github.com/users/${username}`);


    if(response.status === 404){


        nofound.classList.add("active");

        setTimeout(()=>{
            nofound.classList.remove("active");
        },2000);
        
        
        getfromSessionStorage();


    }
    else{
        const data=await response.json();

        RenderGitInfo(data);

    }

    
    }
    catch(e){

    }
    
}


function RenderGitInfo(gitInfo){
    const Profileimg=document.querySelector("#profile-img");
    const userName=document.querySelector("[username]");
    const userAtrate=document.querySelector("[userat-rate]");
    const joinedDate=document.querySelector("[joinedDate]");
    const bio=document.querySelector("[userbio]");
    const repo=document.querySelector("[repo-num]");
    const followers=document.querySelector("[follower-num]");
    const following=document.querySelector("[Following-num]");
    const twitterlink=document.querySelector("[twitter]");
    const locationlink=document.querySelector("[location]");
    const companylink=document.querySelector("[company-icon]");

    Profileimg.src=`${gitInfo?.avatar_url}`;
    userAtrate.innerText=`@${gitInfo?.login}`;
    if(gitInfo?.name === null){
        userName.innerText="";
    }
    else{
        userName.innerText=`${gitInfo?.name}`;
    }
   
    if(gitInfo?.bio === null){
        bio.innerText="This Profile has no Bio";
    }
    else{
        bio.innerText=`${gitInfo?.bio}`;

    }
    repo.innerText=`${gitInfo?.public_repos}`;
    followers.innerText=`${gitInfo?.followers}`;
    following.innerText=`${gitInfo?.following}`;
    const joinDate = new Date(gitInfo.created_at);
    const options = { day: "numeric", month: "long", year: "numeric" }; // e.g., "10 September 2023"
    const formattedDate = joinDate.toLocaleDateString("en-US", options);
    joinedDate.innerText=`Joined ${formattedDate}`;
     if(gitInfo?.twitter_username === null){
            twitterlink.innerText="Not Available";
     }
     else{
         twitterlink.innerText=`${gitInfo?.twitter_username}`;
     }

     if(gitInfo?.location === null){
           locationlink.innerText="Not Available";
     }
     else{
          locationlink.innerText=`${gitInfo?.location}`;
     }

     if(gitInfo?.company ===  null){
         companylink.innerText="Not Available";
     }

     else{
        companylink.innerText=`${gitInfo?.company}`;
     }
}


SearchForm.addEventListener("submit",(e)=>{
       e.preventDefault();
        
       let gituserName=searchInfo.value;
       if(gituserName === ""){
        alert("Enter Git Username");

       }
       else{
          fetchGitInfo(gituserName);



       };


});


async function getfromSessionStorage(){
    let username="Deepanshu1230";

    try{
       
        let response=await fetch(`https://api.github.com/users/${username}`);
    
        const data=await response.json();
    
            RenderGitInfo(data);
        }
        catch(e){
            //hw
    
        }
        


}






























// let profileImage=document.querySelector("#Profileimage");


// async function gitCall(){
//     let username="Deepanshu1230";

//     let response = await fetch(`https://api.github.com/users/${username}`);
//     let data=await response.json();


//      console.log(data);

//      let newP=document.createElement("p");
//      newP.innerText=`${data?.followers}`;
//      profileImage.src=`${data?.avatar_url}`;
    
//      document.body.appendChild(newP);
// }

// gitCall();