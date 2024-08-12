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
    const sidePanel1 = document.getElementById("sidePanel1") as HTMLElement;
    sidePanel1.style.width = "20%";
    (document.getElementById("sidePanel1") as HTMLElement).style.width = "20%";
    (document.getElementById("dashBoard1") as HTMLElement).style.width = "80%";
    (document.querySelector('.update-install') as HTMLElement).style.display = "block";
    let hideSideBarData = document.querySelectorAll('.heading-text') as NodeListOf<HTMLElement>;
    hideSideBarData.forEach(hideSideBarData => {
        hideSideBarData.style.display = "block";
    });
    let sb = document.querySelector(".sidePanel") as HTMLElement;
    sb.style.display = "block";
    transformImage();
}
function closeSideBar() {
    (document.getElementById("sidePanel1") as HTMLElement).style.width = "5%";
    (document.getElementById("dashBoard1") as HTMLElement).style.width = "95%";
    (document.querySelector('.tezo-logo') as HTMLElement).style.overflow = "hidden";
    (document.querySelector('.update-install') as HTMLElement).style.display = "none";
    (document.querySelectorAll(".main-heading")[1] as HTMLElement).style.overflow = "hidden";
    (document.querySelectorAll(".main-heading")[1] as HTMLElement).style.whiteSpace = "nowrap";
    let hideSideBarData = document.querySelectorAll('.heading-text') as NodeListOf<HTMLElement>;
    hideSideBarData.forEach(hideSideBarData => {
        hideSideBarData.style.display = "none";
    });
    let sb = document.querySelector(".sidePanel") as HTMLElement;
    sb.style.display = "block";
    transformImage();
}

function transformImage() {
    let sideicon = document.querySelector(".side-bar1") as HTMLElement;
    if (bool)
        sideicon.style.rotate = '180deg';
    else
        sideicon.style.rotate = '0deg';
}
