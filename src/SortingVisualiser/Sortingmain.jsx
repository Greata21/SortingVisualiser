import React from "react";
import {
  getMergeSortAnimations,
  getQuickSortAnimations,
  getBubbleSortAnimations,
  getHeapSortAnimations,
} from "../sortingAlgorithms/sortingAlgorithms.js";
import "./sortingVisualiser.css";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [action, barOneIdx, barTwoIdxOrHeight] = animations[i];

      if (action === "compare") {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;

        // Temporarily change color for comparison
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);

        // Revert to primary color after comparison
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * ANIMATION_SPEED_MS);
      } else if (action === "swap") {
        // Swap the heights for the visual effect
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${barTwoIdxOrHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [action, barOneIdx, barTwoIdxOrHeight] = animations[i];

      if (action === "compare") {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;

        // Temporarily change color for comparison
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);

        // Revert to primary color after comparison
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * ANIMATION_SPEED_MS);
      } else if (action === "swap") {
        // Swap the heights for the visual effect
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${barTwoIdxOrHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [action, barOneIdx, barTwoIdxOrHeight] = animations[i];

      if (action === "compare") {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;

        // Temporarily change color for comparison
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);

        // Revert to primary color after comparison
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * ANIMATION_SPEED_MS);
      } else if (action === "swap") {
        // Swap the heights for the visual effect
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${barTwoIdxOrHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

// Utility function to generate random integers within a specified range
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
