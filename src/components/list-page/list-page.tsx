import { useState, ChangeEvent, useMemo, useEffect } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import {
  SUPER_SHORT_DELAY_IN_MS,
  SHORT_DELAY_IN_MS,
  DELAY_IN_MS,
} from "../../utils/constants/delays";
import { delay } from "../../utils/index";
import { LinkedList } from "./LinkedList";

type ListСircleType = {
  value: string;
  state: ElementStates;
  type: "top" | "bottom";
};

type ListType = {
  value: string;
  state: ElementStates;
  circle?: ListСircleType | null;
};

const initialStateLoading = {
  loadingAddHead: false,
  loadingAddTail: false,
  loadingRemHead: false,
  loadingRemTail: false,
  loadingAddByIndex: false,
  loadingRemDyIndex: false,
};

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number | undefined>();

  const [isLoading, setIsLoading] = useState(initialStateLoading);

  const [listState, setListState] = useState<ListType[]>([]);

  const initialArr = ["5", "2", "9", "2"];
  const list = useMemo(() => new LinkedList<string>(), []);

  useEffect(() => {
    initialArr.forEach((item) => list.insertAt(item, 0));
    const arr = initialArr.map((item) => ({
      value: item,
      state: ElementStates.Default,
    }));

    setListState([...arr]);
  }, []);

  const addToHead = async () => {
    setIsLoading({ ...initialStateLoading, loadingAddHead: true });
    list.insertAt(inputValue, 0);

    const { length } = listState;

    if (length) {
      listState[0].circle = {
        value: inputValue,
        state: ElementStates.Changing,
        type: "top",
      };
    }

    setListState([...listState]);
    await delay(SUPER_SHORT_DELAY_IN_MS);

    if (listState[0]) {
      delete listState[0].circle;
    }

    listState.unshift({
      ...listState[0],
      value: inputValue,
      state: ElementStates.Modified,
    });

    setListState([...listState]);
    await delay(SUPER_SHORT_DELAY_IN_MS);

    listState[0].state = ElementStates.Default;
    setListState([...listState]);
    setInputValue("");
    setIsLoading({ ...initialStateLoading, loadingAddHead: false });
  };

  const addToTail = async () => {
    setIsLoading({ ...initialStateLoading, loadingAddTail: true });
    list.append(inputValue);

    const { length } = listState;

    let lastIndex = length - 1;

    listState[lastIndex] = {
      ...listState[lastIndex],
      circle: {
        value: inputValue,
        state: ElementStates.Changing,
        type: "top",
      },
    };
    setListState([...listState]);
    await delay(SUPER_SHORT_DELAY_IN_MS);

    listState[lastIndex] = {
      ...listState[lastIndex],
      circle: undefined,
    };

    listState.push({
      value: inputValue,
      state: ElementStates.Modified,
      circle: undefined,
    });

    setListState([...listState]);
    await delay(SUPER_SHORT_DELAY_IN_MS);

    listState[length].state = ElementStates.Default;

    setListState([...listState]);
    setInputValue("");
    setIsLoading({ ...initialStateLoading, loadingAddTail: false });
  };

  const removeHead = async () => {
    setIsLoading({ ...initialStateLoading, loadingRemHead: true });
    if (listState[0]) {
      listState[0] = {
        ...listState[0],
        value: "",
        state: ElementStates.Default,
        circle: {
          value: listState[0].value || "",
          state: ElementStates.Changing,
          type: "bottom",
        },
      };

      setListState([...listState]);
      await delay(SUPER_SHORT_DELAY_IN_MS);

      list.removeHead();

      listState.shift();
      setListState([...listState]);
    }

    setIsLoading({ ...initialStateLoading, loadingRemHead: false });
  };

  const removeTail = async () => {
    setIsLoading({ ...initialStateLoading, loadingRemTail: true });

    const { length } = listState;
    let lastIndex = length - 1;

    if (listState[lastIndex]) {
      listState[lastIndex] = {
        ...listState[lastIndex],
        value: "",
        state: ElementStates.Default,
        circle: {
          value: listState[lastIndex].value || "",
          state: ElementStates.Changing,
          type: "bottom",
        },
      };
      list.removeTail();

      setListState([...listState]);
      await delay(SUPER_SHORT_DELAY_IN_MS);

      listState.pop();
      setListState([...listState]);
    }
    setIsLoading({ ...initialStateLoading, loadingRemTail: false });
  };

  const addByIndex = async () => {
    setIsLoading({ ...initialStateLoading, loadingAddByIndex: true });

    if (inputValue && inputIndex && inputIndex < listState.length) {
      list.insertAt(inputValue, inputIndex);

      for (let i = 0; i <= inputIndex; i += 1) {
        listState[i] = {
          ...listState[i],
          state: ElementStates.Changing,
          circle: {
            value: inputValue,
            type: "top",
            state: ElementStates.Changing,
          },
        };

        await delay(SUPER_SHORT_DELAY_IN_MS);
        setListState([...listState]);

        if (i > 0) {
          listState[i - 1] = {
            ...listState[i - 1],
            circle: undefined,
          };
        }

        setListState([...listState]);
      }
      await delay(SUPER_SHORT_DELAY_IN_MS);

      listState[inputIndex] = {
        ...listState[inputIndex],
        state: ElementStates.Default,
        circle: undefined,
      };

      listState.splice(inputIndex, 0, {
        value: inputValue,
        state: ElementStates.Modified,
        circle: undefined,
      });

      setListState([...listState]);

      listState[inputIndex].state = ElementStates.Default;
      listState.forEach((item: ListType) => {
        item.state = ElementStates.Default;
      });
      await delay(SUPER_SHORT_DELAY_IN_MS);
      setListState([...listState]);
      setInputIndex(Number(""));
      setIsLoading({ ...initialStateLoading, loadingAddByIndex: false });
    }
  };

  const removeByIndex = async () => {
    setIsLoading({ ...initialStateLoading, loadingRemDyIndex: true });

    if (inputIndex) {
      try {
        list.removeByIndex(inputIndex);
      } catch (error) {
        console.log(error);
        return;
      }
      for (let i = 0; i <= inputIndex; i += 1) {
        listState[i] = {
          ...listState[i],
          state: ElementStates.Changing,
        };
        await delay(SUPER_SHORT_DELAY_IN_MS);
        setListState([...listState]);
      }
      listState[inputIndex] = {
        ...listState[inputIndex],
        value: "",
        circle: {
          value: listState[inputIndex].value,
          type: "bottom",
          state: ElementStates.Changing,
        },
      };
      await delay(SUPER_SHORT_DELAY_IN_MS);
      setListState([...listState]);

      listState.splice(inputIndex, 1);

      listState[inputIndex - 1] = {
        ...listState[inputIndex - 1],
        state: ElementStates.Modified,
        value: listState[inputIndex - 1].value,
        circle: null,
      };

      await delay(SUPER_SHORT_DELAY_IN_MS);
      setListState([...listState]);
      listState.forEach((item: ListType) => {
        item.state = ElementStates.Default;
      });

      await delay(SUPER_SHORT_DELAY_IN_MS);
      setListState([...listState]);
    }
    setInputIndex(Number(""));
    setIsLoading({ ...initialStateLoading, loadingRemDyIndex: false });
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.container}>
          <Input
            placeholder="Введите значение"
            maxLength={4}
            isLimitText={true}
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
            }}
          />
          <Button
            text="Добавить в head"
            type="submit"
            extraClass={styles.button_sml}
            onClick={addToHead}
            isLoader={isLoading.loadingAddHead}
            disabled={!inputValue || listState.length === 7}
          />
          <Button
            text="Добавить в tail"
            type="submit"
            extraClass={styles.button_sml}
            onClick={addToTail}
            isLoader={isLoading.loadingAddTail}
            disabled={!inputValue || listState.length === 7}
          />
          <Button
            text="Удалить из head"
            type="submit"
            extraClass={styles.button_sml}
            onClick={removeHead}
            isLoader={isLoading.loadingRemHead}
            disabled={listState.length === 0}
          />
          <Button
            text="Удалить из tail"
            type="submit"
            extraClass={styles.button_sml}
            onClick={removeTail}
            isLoader={isLoading.loadingRemTail}
            disabled={listState.length === 0}
          />
        </div>
        <div className={styles.container}>
          <Input
            placeholder="Введите индекс"
            type="number"
            isLimitText={false}
            value={inputIndex}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputIndex(parseInt(e.target.value, 7));
            }}
          />
          <Button
            text="Добавить по индексу"
            extraClass={styles.button_big}
            type="submit"
            onClick={addByIndex}
            isLoader={isLoading.loadingAddByIndex}
            disabled={!inputIndex || !inputValue || listState.length === 7}
          />
          <Button
            text="Удалить по индексу"
            type="submit"
            extraClass={styles.button_big}
            onClick={removeByIndex}
            isLoader={isLoading.loadingRemDyIndex}
            disabled={!inputIndex}
          />
        </div>
      </form>

      <ul className={styles.container_result}>
        {listState.map((item, index) => (
          <li className={styles.circles} key={index}>
            {item.circle && (
              <Circle
                extraClass={styles[item.circle.type]}
                letter={item.circle.value}
                isSmall
                state={item.circle.state}
              />
            )}
            <Circle
              tail={
                !item.circle && index === listState.length - 1 ? "tail" : ""
              }
              letter={item.value}
              index={index}
              head={!item.circle && index === 0 ? "head" : ""}
              state={item.state}
            />
            {index < listState.length - 1 && <ArrowIcon />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
