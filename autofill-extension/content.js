(async function () {

  const userId = localStorage.getItem("user");

  if (!userId) return;

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/profile/${userId}`);
    const data = await res.json();

    const name = data.name || "";
    const email = data.email || "";

    // 🔥 Autofill common fields
    document.querySelectorAll("input").forEach((input) => {
      const placeholder = input.placeholder?.toLowerCase() || "";
      const nameAttr = input.name?.toLowerCase() || "";

      if (placeholder.includes("name") || nameAttr.includes("name")) {
        input.value = name;
      }

      if (placeholder.includes("email") || nameAttr.includes("email")) {
        input.value = email;
      }
    });

    console.log("✅ Autofill complete");

  } catch (err) {
    console.error("Autofill failed", err);
  }

})();