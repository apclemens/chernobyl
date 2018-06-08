// keep list of scroll points where something should happen.
// have function that does the thing

var scrollPoints = [];

window.addEventListener('scroll', function(event){
    setScroll();
    scrollPoints.forEach(function(point){
        if (point.past) {
            if (this.scrollY > point.trigger) return;
            point.triggerBefore();
        } else {
            if (this.scrollY < point.trigger) return;
            point.triggerPast();
        }
        point.past = !point.past;
    })
})

var scrollSet = false;
function setScroll() {
    if (scrollSet) return;
    scrollSet = true;
    scrollPoints.push({
        triggerElement: document.getElementById('drawings'),
        trigger: document.getElementById('drawings').offsetTop,
        past: false,
        triggerPast: function() {
            this.triggerElement.children[0].style.position = 'fixed';
        },
        triggerBefore: function() {
            this.triggerElement.children[0].style.position = 'absolute';
        }
    })
    scrollPoints.push({
        triggerElement: document.getElementById('drawings'),
        trigger: document.getElementById('drawings').offsetTop + document.getElementById('drawings').offsetHeight - window.innerHeight,
        past: false,
        triggerPast: function() {
            var elem = this.triggerElement.children[0];
            elem.style.top = ''+this.triggerElement.offsetHeight - window.innerHeight + elem.offsetTop+'px';
            this.triggerElement.children[0].style.position = 'absolute';
        },
        triggerBefore: function() {
            var elem = this.triggerElement.children[0];
            elem.style.top = '30vh';
            this.triggerElement.children[0].style.position = 'fixed';
        }
    })
}
