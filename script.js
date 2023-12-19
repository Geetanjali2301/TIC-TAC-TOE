//accessing all the elements using dom on which actions are going to be performed
let box=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".reset");
let startbtn=document.querySelector(".new");
let msgcontainer=document.querySelector(".msg-cont");
let msg=document.getElementById("win");

let player0=true;// in order to toggle player 1 and 2 

let winning_pattern=[
    [0,1,2],[0,3,6],[2,5,8],[6,7,8],[3,4,5],[0,4,8],[2,4,6],[1,4,7]
];

//Toggling "X" and "O"

let c=0;// keeping track of all the boxes if all are filled that mean its a draw
box.forEach((box)=>
{
    box.addEventListener("click",()=>{
       
        if(player0)
        {
            box.innerText="O"
            player0=false;
        }
        else
        {
            box.innerText="X";
            player0=true;
        }
       
        box.disabled=true;
        c++;
        console.log(c)
        checkWinner();
        if(c===9)
        {
            //console.log("Its a tie!");
            c=0;
            error();
            
        }
        
       
    })
 
});




//for checking patterns and comparing there inner text
const checkWinner=()=>
{
    for(let pattern of winning_pattern)
    {
        let val1=box[pattern[0]].innerText;
        let val2=box[pattern[1]].innerText;
        let val3=box[pattern[2]].innerText;

        if(val1!="" && val2!="" && val3!="")
        {
        if(val1==val2 && val2==val3)
        {
            //alert(`winner is: ${val1}`);
            
            declareWinner(val1);
            c=0;
        }
        
    }     
    }
   

};

const error= ()=>
{
    var audio=new Audio('./Sounds/error.wav');
    audio.play();
    msg.innerText=`Sorry! its a Draw...🥴`;
    msgcontainer.classList.remove("hide");

}

//for diabling and enabling boxes
const disableboxes=()=>
{
    for(let b of box)
    {
        b.disabled=true;
    }
};
const enableboxes=()=>
{
    for(let b of box)
    {
        b.innerText="";
        b.disabled=false;
    }
};

//declares the winner once we recognised a pattern
const declareWinner=(val1)=>
{
    var audio=new Audio('./Sounds/win.wav');
    audio.play();
    msg.innerText=`Congratulations ${val1} is the Winner🥳`;
    msgcontainer.classList.remove("hide");
    disableboxes();

};


//to reset the game
resetgame=()=>{

    if(c!=0)
    {
        var audio=new Audio('./Sounds/click.wav');
        audio.play();
    }
   
    player0=true;
    enableboxes();
    msgcontainer.classList.add("hide");
    c=0;

};
newgame=()=>{

    
    var audio=new Audio('./Sounds/click.wav');
    audio.play();
    player0=true;
    enableboxes();
    msgcontainer.classList.add("hide");
    c=0;

};

//add actions to start and reset
startbtn.addEventListener("click",newgame);
resetbtn.addEventListener("click",resetgame);




