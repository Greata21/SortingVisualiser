export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    const pivotIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
  }
}

function partition(array, startIdx, endIdx, animations) {
  const pivot = array[endIdx];
  let i = startIdx - 1;

  for (let j = startIdx; j < endIdx; j++) {
    // Push the comparison for visualization
    animations.push(["compare", j, endIdx]);
    animations.push(["revert", j, endIdx]);

    if (array[j] <= pivot) {
      i++;
      // Swap elements and add to animations
      animations.push(["swap", i, array[j]]);
      animations.push(["swap", j, array[i]]);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Place pivot in the correct position
  animations.push(["swap", i + 1, array[endIdx]]);
  animations.push(["swap", endIdx, array[i + 1]]);
  [array[i + 1], array[endIdx]] = [array[endIdx], array[i + 1]];

  return i + 1;
}

// Bubble Sort

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  const auxiliaryArray = array.slice();
  bubbleSortHelper(auxiliaryArray, animations);
  return animations;
}

function bubbleSortHelper(array, animations) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Push the indices that are being compared to change their color
      animations.push(["compare", j, j + 1]);
      // Push again to revert their color back
      animations.push(["compare", j, j + 1]);

      if (array[j] > array[j + 1]) {
        // If a swap is needed, record the swap action
        animations.push(["swap", j, array[j + 1]]);
        animations.push(["swap", j + 1, array[j]]);
        // Perform the swap in the array
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
}

// Heap Sort

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  const auxiliaryArray = array.slice();
  heapSortHelper(auxiliaryArray, animations);
  return animations;
}

function heapSortHelper(array, animations) {
  const n = array.length;

  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    animations.push(["swap", 0, array[i]]);
    animations.push(["swap", i, array[0]]);
    [array[0], array[i]] = [array[i], array[0]];

    // Call heapify on the reduced heap
    heapify(array, i, 0, animations);
  }
}

function heapify(array, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // If left child is larger than root
  if (left < n && array[left] > array[largest]) {
    animations.push(["compare", left, largest]);
    animations.push(["compare", left, largest]);
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && array[right] > array[largest]) {
    animations.push(["compare", right, largest]);
    animations.push(["compare", right, largest]);
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    animations.push(["swap", i, array[largest]]);
    animations.push(["swap", largest, array[i]]);
    [array[i], array[largest]] = [array[largest], array[i]];

    // Recursively heapify the affected subtree
    heapify(array, n, largest, animations);
  }
}
