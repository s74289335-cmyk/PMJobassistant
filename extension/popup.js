document.getElementById("fill").addEventListener("click", async () => {

  // get user id from localStorage (same as your app)
  const user_id = localStorage.getItem("user");

  if (!user_id) {
    alert("Login first in your web app");
    return;
  }

  // fetch profile from backend
  const res = await fetch(`http://127.0.0.1:8000/api/profile/${user_id}`);
  const profile = await res.json();

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: autofill,
    args: [profile]
  });
});


function autofill(profile) {

  document.querySelectorAll("input, textarea").forEach(input => {
    const label = (input.name + " " + input.placeholder).toLowerCase();

    // FULL NAME
    if (label.includes("name")) {
      input.value = profile.name;
    }

    // FIRST NAME
    if (label.includes("first")) {
      input.value = profile.name.split(" ")[0];
    }

    // LAST NAME
    if (label.includes("last")) {
      input.value = profile.name.split(" ")[1] || "";
    }

    // EMAIL
    if (label.includes("email")) {
      input.value = profile.email;
    }

    // PHONE
    if (label.includes("phone")) {
      input.value = profile.phone;
    }

  });

  alert("Autofilled Smartly 🚀");
}