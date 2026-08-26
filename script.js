document.addEventListener("DOMContentLoaded", () => {
    const roleText = document.querySelector("#role-text");
    const roles = ["Roblox Scripter", "Roblox GUI Maker"];
    let roleIndex = 0;

    function typeRole(role, characterIndex = 0) {
        roleText.textContent = role.slice(0, characterIndex);

        if (characterIndex < role.length) {
            setTimeout(() => typeRole(role, characterIndex + 1), 90);
        } else {
            setTimeout(deleteRole, 7000);
        }
    }

    function deleteRole(characterIndex = roleText.textContent.length) {
        roleText.textContent = roleText.textContent.slice(0, characterIndex - 1);

        if (characterIndex > 0) {
            setTimeout(() => deleteRole(characterIndex - 1), 60);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            typeRole(roles[roleIndex]);
        }
    }

    typeRole(roles[roleIndex], roles[roleIndex].length);

    var HireButton = document.getElementById("hire-btn")

    HireButton.addEventListener("click", function () {
        window.location.replace("pages/contacts.html")
    })
});


