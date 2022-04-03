const today = new Date();

let message1 = "Meet the family :)";

let message2 = today;

document.querySelector("#message1").textContent = message1;

document.querySelector("#message2").textContent = message2;

let memberList = [];

const output = (famMembers) => {
  famMembers.forEach((famMember) => {
    let article = document.createElement("article");

    let name = document.createElement("h3");
    name.textContent = famMember.name;

    let preferedName = document.createElement("h4");
    preferedName.textContent = famMember.preferedName;

    let birthday = document.createElement("h4");
    birthday.textContent = famMember.birthday;

    let img = document.createElement("img");
    img.setAttribute("src", famMember.imageUrl);
    img.setAttribute("alt", famMember.name);

    article.appendChild(name);
    article.appendChild(preferedName);
    article.appendChild(birthday);
    article.appendChild(img);

    document.querySelector("#famMembers").appendChild(article);
  });
};

fetch("https://laumich16.github.io/CSE-121B/scripts/task6.json")
  .then((response) => response.json())
  .then((famMembers) => {
    memberList = famMembers;
    output(memberList);
  });

const reset = () => {
  document.querySelector("#famMembers").innerHTML = "";
};

const sortBy = () => {
  reset();

  let filter = document.querySelector("#sortBy").value;

  switch (filter) {
    case "nameMembersAscending":
      output(
        memberList.sort((member1, member2) => {
          let memberName1 = member1.name.toLowerCase();
          let memberName2 = member2.name.toLowerCase();
          if (memberName1 < memberName2) return -1;
          else if (memberName1 > memberName2) return 1;
          else return 0;
        })
      );
      break;
    case "nameMembersDescending":
      output(
        memberList.sort((member1, member2) => {
          let memberName1 = member1.name.toLowerCase();
          let memberName2 = member2.name.toLowerCase();
          if (memberName1 > memberName2) return -1;
          else if (memberName1 < memberName2) return 1;
          else return 0;
        })
      );
      break;
    default:
      output(
        memberList.sort((member1, member2) =>
          member1.name.toLowerCase() > member2.name.toLowerCase()
            ? 1
            : member2.name.toLowerCase() > member1.name.toLowerCase()
            ? -1
            : 0
        )
      );
      break;
  }
};

document.querySelector("#sortBy").addEventListener("change", sortBy);
