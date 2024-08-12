let bool = true;
let sideBarFunction = () => {
    if (bool == false) {
        openSideBar();
    }
    else {
        closeSideBar();
    }
    bool = !bool;
}

function openSideBar() {
    document.getElementById("sidePanel1").style.width = "20%";
    document.getElementById("dashBoard1").style.width = "80%";
    document.querySelector('.update-install').style.display = "block";
    let hideSideBarData = document.querySelectorAll('.heading-text');
    hideSideBarData.forEach(hideSideBarData => {
        hideSideBarData.style.display = "block";
    });
    let sb = document.querySelector(".sidePanel");
    sb.style.display = "block";
    transformImage();
}
function closeSideBar() {
    document.getElementById("sidePanel1").style.width = "5%";
    document.getElementById("dashBoard1").style.width = "95%";
    document.querySelector('.tezo-logo').style.overflow = "hidden";
    document.querySelector('.update-install').style.display = "none";
    document.querySelectorAll(".main-heading")[1].style.overflow = "hidden";
    document.querySelectorAll(".main-heading")[1].style.whiteSpace = "nowrap";
    // document.querySelectorAll(".main-heading")[2].style.overflow = "hidden";
    // document.querySelectorAll(".main-heading")[2].style.whiteSpace = "nowrap";
    let hideSideBarData = document.querySelectorAll('.heading-text');
    hideSideBarData.forEach(hideSideBarData => {
        hideSideBarData.style.display = "none";
    });
    let sb = document.querySelector(".sidePanel");
    sb.style.display = "block";
    transformImage();
}
function transformImage() {
    let sideicon = document.querySelector(".side-bar1");
    if (bool)
        sideicon.style.rotate = '180deg';
    else
        sideicon.style.rotate = '0deg';
}


