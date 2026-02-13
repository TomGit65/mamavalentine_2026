function createHeart() {

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤";

    // 🌈 Random heart colors
    const colors = [
        "#ff4d6d",
        "#ff0000",
        "#ff69b4",
        "#ff1493",
        "#ffa500",
        "#ffff66",
        "#00ffcc",
        "#00bfff",
        "#9370db",
        "#ffffff"
    ];

    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// ❤️ Start automatically when page loads
setInterval(createHeart, 200);