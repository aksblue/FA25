const codeList = document.querySelectorAll("#codeBox ul li");
const totalItems = codeList.length;
const trashcanIcon = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/27019/trashcanIcon.png";

for (let i = 0; i < totalItems; i++) {
  // Create an img element
  const imgElement = document.createElement("img");
  //    Give the img element an attribute of "src" that is equal to the image address/location
  imgElement.setAttribute("src", trashcanIcon);
  // Add a class name of listIcon to the image.
  imgElement.className = "listIcon";
  // Add the image to the list item
  codeList[i].appendChild(imgElement);
}

myList.addEventListener("click", changeProp, false);

function changeProp(e) {
  //  call the getTarget function with the parameter of e
  const target = getTarget(e);

  const tParent = target.parentNode; // holds the li or ul

  if (tParent.tagName == "LI") {
    tParent.remove(); // remove the li
  } else if (tParent.tagName == "UL") {
    // l check to see if the list item is grayed out
    if (target.classList.contains("selected")) {
      //  return it back to normal
      target.classList.remove("selected");
    } else {
      //  If not, it will be grayed out
      target.classList.add("selected"); // grayed out the li
    }
  }
}
