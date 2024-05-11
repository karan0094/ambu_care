const srcBtn = React.findDOMNode(this.refs.srcBtn);


function gotLocation(position){
console.log(position);
}

function failed(){
    alert("please allow location")
}
srcBtn.addEventListener('click',async()=>{
    navigator.geolocation.getCurrentPosition(gotLocation,failed);
})