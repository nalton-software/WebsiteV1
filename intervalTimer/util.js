function getElemById(id) {
    return document.getElementById(id);
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function minutesToMs(minutes) {
    return minutes * 60 * 1000;
}