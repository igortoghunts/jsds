// Helpers
function Heap() {
    this.content = [];
    this.scoreFunction = function(val) {
        return val;
    }
}

Heap.prototype.size = function() {
    return this.content.length;
}

Heap.prototype.push = function(a) {
    this.content.push(a);
    this.bubbleUp(this.content.length - 1);
}

Heap.prototype.pop = function() {
    var a = this.content[0];
    var b = this.content.pop();
    if (this.content.length > 0) {
        this.content[0] = b;
        this.sinkDown(0);
    }
    return a;
}

Heap.prototype.remove = function(a) {
    var b = this.content.length;
    for (var c = 0; c < b; c++) {
        if (this.content[c] != a) continue;
        var d = this.content.pop();
        if (c == b - 1) break;
        this.content[c] = d;
        this.bubbleUp(c);
        this.sinkDown(c);
        break;
    }
}

// Main
function MaxHeap() {
    Heap.call(this);
}

MaxHeap.prototype = new Heap();

MaxHeap.prototype.bubbleUp = function(n) {
    // Fetch the element that has to be moved.
    var element = this.content[n],
        score = this.scoreFunction(element);
    // When at 0, an element can not go up any further.
    while (n > 0) {
        // Compute the parent element's index, and fetch it.
        var parentN = Math.floor((n + 1) / 2) - 1,
            parent = this.content[parentN];
        // If the parent has a larger score, things are in order and we
        // are done.
        if (score <= this.scoreFunction(parent))
            break;

        // Otherwise, swap the parent with the current element and
        // continue.
        this.content[parentN] = element;
        this.content[n] = parent;
        n = parentN;
    }
}

MaxHeap.prototype.sinkDown = function(n) {
    // Look up the target element and its score.
    var length = this.content.length,
        element = this.content[n],
        elemScore = this.scoreFunction(element);

    while (true) {
        // Compute the indices of the child elements.
        var child2N = (n + 1) * 2,
            child1N = child2N - 1;
        // This is used to store the new position of the element,
        // if any.
        var swap = null;
        // If the first child exists (is inside the array)...
        if (child1N < length) {
            // Look it up and compute its score.
            var child1 = this.content[child1N],
                child1Score = this.scoreFunction(child1);
            // If the score is larger than our element's, we need to swap.
            if (child1Score > elemScore)
                swap = child1N;
        }
        // Do the same checks for the other child.
        if (child2N < length) {
            var child2 = this.content[child2N],
                child2Score = this.scoreFunction(child2);
            if (child2Score > (swap == null ? elemScore : child1Score))
                swap = child2N;
        }

        // No need to swap further, we are done.
        if (swap == null) break;

        // Otherwise, swap and continue.
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
    }
}


var maxHeapExample = new MaxHeap();

maxHeapExample.push(12);
maxHeapExample.push(2);
maxHeapExample.push(4);
maxHeapExample.push(13);
maxHeapExample.push(23);

console.log(maxHeapExample.pop()); // 23
console.log(maxHeapExample.pop()); // 13
console.log(maxHeapExample.pop()); // 12
console.log(maxHeapExample.pop()); // 4
console.log(maxHeapExample.pop()); // 2