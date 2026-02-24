let interviewList=[];
let rejectedList=[];
let currentStatus='all';

let total=document.getElementById("total");
let interviewCount=document.getElementById("interviewCount");
let rejectedCount=document.getElementById("rejectedCount");

const allcardsSection=document.getElementById("allCards");
const allFilterBtn=document.getElementById("all-filter-btn");
const interviewFilterBtn=document.getElementById("interview-filter-btn");
const rejectedFilterBtn=document.getElementById("rejected-filter-btn");
const mainContainer=document.querySelector('main');
const filterSection=document.getElementById("filter-section");


function calculateCount(){
    total.innerText=allcardsSection.children.length;
    interviewCount.innerText=interviewList.length;
    rejectedCount.innerText=rejectedList.length;

    if (interviewList.length<1)
    {
        filterSection.classList.add("hidden");
    }
    else if (rejectedList.length <1)
    {
        filterSection.classList.add("hidden");
    }
};

calculateCount();


function toggleStyle(id){
    allFilterBtn.classList.remove ('bg-[#3B82F6]', 'text-white');
    interviewFilterBtn.classList.remove ('bg-[#3B82F6]', 'text-white');
    rejectedFilterBtn.classList.remove ('bg-[#3B82F6]', 'text-white');

    allFilterBtn.classList.add ('bg-gray-300', 'text-black');
    interviewFilterBtn.classList.add ('bg-gray-300', 'text-black');
    rejectedFilterBtn.classList.add ('bg-gray-300', 'text-black');

    const selected=document.getElementById(id);
    currentStatus=id;
    selected.classList.remove('bg-gray-300', 'text-black');
    selected.classList.add('bg-[#3B82F6]', 'text-white');

    if (id=='interview-filter-btn'){
        allcardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }
    else if (id=='all-filter-btn'){
        allcardsSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    else if (id=='rejected-filter-btn'){
         allcardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
    
};





mainContainer.addEventListener("click", function(event){
 
    if (event.target.classList.contains('interview-btn')){
    const parenNode =event.target.parentNode.parentNode;
    const workName=parenNode.querySelector('.workName').innerText;
    const exprience=parenNode.querySelector('.exprience').innerText;
    const salary=parenNode.querySelector('.salary').innerText;
    const status=parenNode.querySelector('.status').innerText;
    const note=parenNode.querySelector('.note').innerText;
    parenNode.querySelector('.status').innerText="Interview";

    let statusElement=parenNode.querySelector(".status");
    statusElement.innerText="Interview";
    statusElement.classList.remove('bg-gray-300', 'bg-red-500');
    statusElement.classList.add('bg-green-500');
    
    const cardInfo={
        workName,
        exprience,
        salary,
        status:'Interview',
        note,
    }

    const cheack= interviewList.find(item=> item.workName==cardInfo.workName);
    if (!cheack){
       interviewList.push(cardInfo);
    }

    rejectedList=rejectedList.filter(item=> item.workName!=cardInfo.workName);

       if(currentStatus=="rejected-filter-btn"){
        renderRejected();
    }

    calculateCount();
    }

    if (event.target.classList.contains('rejected-btn')){
    const parenNode =event.target.parentNode.parentNode;
    const workName=parenNode.querySelector('.workName').innerText;
    const exprience=parenNode.querySelector('.exprience').innerText;
    const salary=parenNode.querySelector('.salary').innerText;
    const status=parenNode.querySelector('.status').innerText;
    const note=parenNode.querySelector('.note').innerText;
    parenNode.querySelector('.status').innerText="Rejected";
    
    const cardInfo={
        workName,
        exprience,
        salary,
        status:'Rejected',
        note,
    }

    let statusElement=parenNode.querySelector(".status");
    statusElement.innerText="Rejected";
    statusElement.classList.remove('bg-gray-300', 'bg-green-500');
    statusElement.classList.add('bg-red-500');

    const cheack= rejectedList.find(item=> item.workName==cardInfo.workName);
    if (!cheack){
       rejectedList.push(cardInfo);
    }

    interviewList=interviewList.filter(item=> item.workName!=cardInfo.workName);

    if(currentStatus=="interview-filter-btn"){
        renderInterview();
    }

    calculateCount();
    }
});

const noJobSection=document.getElementById("no-jobs");
function noJob(list){
    if(list.length===0)
    {
        noJobSection.classList.remove("hidden");
    }
    else
    {
        noJobSection.classList.add("hidden");
    }
}


function renderInterview(){
    filterSection.innerHTML="";
    for (let interview of interviewList){
    let div =document.createElement("div");
    div.className='shadow p-10 flex justify-between';
    div.innerHTML=`
    <!-- card-1 -->
            <div>
                <div>
                <h2 class="workName text-2xl font-bold">${interview.workName}</h2>
                <p class="exprience text-gray-500">${interview.exprience}</p>
                <p class="salary text-gray-500 py-5">${interview.salary}</p>
                </div>
                <div>
                    <p class="status p-2 bg-green-500 font-bold text-white inline ">${interview.status}</p>
                    <p class="note py-5">${interview.note}</p>
                </div>
                <div class="flex gap-5">
                    <button class="interview-btn font-bold border border-green-500 p-3 text-green-500 cursor-pointer rounded-[5px] hover:bg-green-500 hover:text-white">Interview</button>
                    <button class="rejected-btn font-bold border border-red-500 p-3 text-red-500 cursor-pointer rounded-[5px] hover:bg-red-500 hover:text-white">Rejected</button>
                </div>
        </div>
        <div>
            <i class="fa-regular fa-trash-can" id="delete-btn"></i>
        </div>
    `
    filterSection.appendChild(div);
    }
    noJob(interviewList);
}

function renderRejected(){
    filterSection.innerHTML="";
    for (let rejected of rejectedList){
    let div =document.createElement("div");
    div.className='shadow p-10 flex justify-between';
    div.innerHTML=`
    <!-- card-1 -->
            <div>
                <div>
                <h2 class="workName text-2xl font-bold">${rejected.workName}</h2>
                <p class="exprience text-gray-500">${rejected.exprience}</p>
                <p class="salary text-gray-500 py-5">${rejected.salary}</p>
                </div>
                <div>
                    <p class="status p-2 bg-red-500 font-bold text-white inline ">${rejected.status}</p>
                    <p class="note py-5">${rejected.note}</p>
                </div>
                <div class="flex gap-5">
                    <button class="interview-btn font-bold border border-green-500 p-3 text-green-500 cursor-pointer rounded-[5px] hover:bg-green-500 hover:text-white">Interview</button>
                    <button class="rejected-btn font-bold border border-red-500 p-3 text-red-500 cursor-pointer rounded-[5px] hover:bg-red-500 hover:text-white">Rejected</button>
                </div>
        </div>
        <div>
            <i class="fa-regular fa-trash-can" id="delete-btn"></i>
        </div>
    `
    filterSection.appendChild(div);
    }
    noJob(rejectedList);
};
