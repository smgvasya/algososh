const fibonacciCalc = (index: number): number => {
    if (index < 0) {
      throw new Error("число не может быть меньше нуля");
    }
    if (index === 0) {
      return 0;
    }
    if (index === 1) {
      return 1;
    }
    return fibonacciCalc(index - 1) + fibonacciCalc(index - 2);
  };

  export {fibonacciCalc}