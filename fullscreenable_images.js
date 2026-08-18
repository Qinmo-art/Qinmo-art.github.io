let fullscreenableImages = []
let currentImageIndex = -1
const fullscreenableImageClassName = ".fullscreenable-image"

const currentlyShowingFullscreenImage = function() {
    return currentImageIndex >= 0
}

const handleKeyboardEvents = function(event) {
    if (!currentlyShowingFullscreenImage())
    {
        return
    }

    const display = document.getElementById("display")
    switch(event.key) {
        case "ArrowLeft":
            nextFullscreenImage()
            break
        case "ArrowRight":
            previousFullscreenimage()
            break
        case "Escape":
            closeFullscreenImage()
            break
    }
}

const onClickImage = function() {
    const thisSource = $(this).attr("src")

    fullscreenableImages.each(function(index) {
        const imageSource = $(this).attr("src")

        if(imageSource == thisSource)
        {
            currentImageIndex = index
        }
    })

    showFullscreenImage()
}

const showFullscreenImage = function() {
    if (currentImageIndex < 0)
    {
        return
    }

    $("#fullscreen-overlay-image").attr({"src": $(fullscreenableImages[currentImageIndex]).attr("src")})
    $("#fullscreen-overlay").addClass("show");
    $("body").addClass("overlay-open");
}

const closeFullscreenImage = function() {
    currentImageIndex = -1

    $("#fullscreen-overlay").removeClass("show");
    $("body").removeClass("overlay-open");
}

const nextFullscreenImage = function() {
    currentImageIndex += 1
    
    if (currentImageIndex >= fullscreenableImages.length)
    {
        currentImageIndex = 0
    }

    showFullscreenImage()
}

const previousFullscreenimage = function() {
    currentImageIndex -= 1

    if (currentImageIndex < 0)
    {
        currentImageIndex = fullscreenableImages.length - 1
    }

    showFullscreenImage()
}

const createOverlay = function() {
    $("#fullscreen-overlay").on("click", function(event) {
        if (event.target.id === "fullscreen-overlay-image")
        {
            return;
        }

        event.stopPropagation()
        closeFullscreenImage()
    })

    $("#fullscreen-overlay-right-button").on("click", function(event) {
        event.stopPropagation()
        nextFullscreenImage()
    })
    $("#fullscreen-overlay-left-button").on("click", function(event) {
        event.stopPropagation()
        previousFullscreenimage()
    })
}

$(function() {
    fullscreenableImages = $(fullscreenableImageClassName)
    fullscreenableImages.click(onClickImage)
    fullscreenableImages.css({ "cursor": "zoom-in" })

    document.addEventListener("keydown", handleKeyboardEvents)
    createOverlay()
})