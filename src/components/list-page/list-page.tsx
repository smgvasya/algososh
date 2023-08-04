import { useState, ChangeEvent, FormEvent, useMemo, useEffect } from "react";
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

type ListType = {
  value: string;
  state: ElementStates;
  circleTop?: "top";
  circleBottom?: "bottom";
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
    if (listState.length) {
      listState[0] = {
        value: inputValue,
        circleTop: "top",
        state: ElementStates.Changing,
      };
    }
    setListState([...listState]);
    await delay(SHORT_DELAY_IN_MS);
    if (listState[0]) {
      listState[0] = {
        ...listState[0],
        circleTop: undefined,
      };
    }
    listState.unshift({
      ...listState[0],
      value: inputValue,
      state: ElementStates.Modified,
    });
    setListState([...listState]);
    await delay(SHORT_DELAY_IN_MS);
    listState[0].state = ElementStates.Default;
    setListState([...listState]);
    setIsLoading({ ...initialStateLoading, loadingAddHead: false });
  };

  const addToTail = async () => {
    setIsLoading({ ...initialStateLoading, loadingAddTail: true });
    list.append(inputValue);
    let index = listState.length - 1;
    listState[index] = {
      ...listState[index],
      value: inputValue,
      circleBottom: "bottom",
      state: ElementStates.Changing,
    };
    setListState([...listState]);
    await delay(SHORT_DELAY_IN_MS);

    listState[index] = {
      ...listState[index],
      circleBottom: undefined,
    };
    listState.push({
      //...listState[index],
      value: inputValue,
      state: ElementStates.Modified,
    });
    setListState([...listState]);
    await delay(SHORT_DELAY_IN_MS);
    listState[listState.length].state = ElementStates.Default;
    setListState([...listState]);
    setIsLoading({ ...initialStateLoading, loadingAddTail: false });
  };

  const removeHead = async () => {
    setIsLoading({ ...initialStateLoading, loadingRemHead: true });

    if (listState[0]) {
      listState[0] = {
        ...listState[0],
        value: listState[0].value || "",
        circleTop: "top",
        state: ElementStates.Changing,
      };
      list.removeAt(0);

      setListState([...listState]);
      await delay(SHORT_DELAY_IN_MS);

      listState.shift();
      setListState([...listState]);
    }
    setIsLoading({ ...initialStateLoading, loadingRemHead: false });
  };

  const removeTail = async () => {
    setIsLoading({ ...initialStateLoading, loadingRemTail: true });
    let index = listState.length - 1;
    if (listState[index]) {
      listState[index] = {
        ...listState[index],
        value: listState[index].value || "",
        circleBottom: "bottom",
        state: ElementStates.Changing,
      };
    }
    list.removeAt(index);
    setListState([...listState]);
    await delay(SHORT_DELAY_IN_MS);

    listState.pop();
    setListState([...listState]);
    setIsLoading({ ...initialStateLoading, loadingRemTail: true });
  };

  const addByIndex = async () => {
    setIsLoading({ ...initialStateLoading, loadingAddByIndex: true });

    if (inputValue && inputIndex && inputIndex < listState.length) {
      try {
        list.insertAt(inputValue, inputIndex);
      } catch (error) {
        console.log(error);
        return;
      }

      for (let i = 0; i <= inputIndex; i += 1) {
        listState[i] = {
          ...listState[i],
          value: inputValue,
          circleTop: "top",
          state: ElementStates.Changing,
        };

        await delay(SHORT_DELAY_IN_MS);
        setListState([...listState]);

        if (i > 0) {
          listState[i - 1] = {
            ...listState[i - 1],
            circleTop: undefined,
          };
        }

        setListState([...listState]);
      }
      await delay(SHORT_DELAY_IN_MS);

      listState[inputIndex] = {
        ...listState[inputIndex],
        state: ElementStates.Default,
        circleTop: undefined,
      };

      listState.splice(inputIndex, 0, {
        value: inputValue,
        state: ElementStates.Modified,
        circleTop: undefined,
      });

      setListState([...listState]);

      listState[inputIndex].state = ElementStates.Default;
      listState.forEach((item: ListType) => {
        item.state = ElementStates.Default;
      });
      await delay(SHORT_DELAY_IN_MS);
      setListState([...listState]);
      setIsLoading({ ...initialStateLoading, loadingAddByIndex: false });
    }
  };

  const removeByIndex = async () => {
    setIsLoading({ ...initialStateLoading, loadingRemDyIndex: true });

    if (inputIndex) {
      try {
        list.removeAt(inputIndex);
      } catch (error) {
        console.log(error);
        return;
      }
      for (let i = 0; i <= inputIndex; i += 1) {
        listState[i] = {
          ...listState[i],
          state: ElementStates.Changing,
        };
        await delay(SHORT_DELAY_IN_MS);
        setListState([...listState]);
      }
      listState[inputIndex] = {
        ...listState[inputIndex],
        value: listState[inputIndex].value,
        circleBottom: "bottom",
        state: ElementStates.Changing,
      };
      await delay(SHORT_DELAY_IN_MS);
      setListState([...listState]);

      listState.splice(inputIndex, 1);

      listState[inputIndex - 1] = {
        ...listState[inputIndex - 1],
        state: ElementStates.Modified,
        value: listState[inputIndex - 1].value,
        circleTop: undefined,
      };

      await delay(SHORT_DELAY_IN_MS);
      setListState([...listState]);
      listState.forEach((item: ListType) => {
        item.state = ElementStates.Default;
      });

      await delay(SHORT_DELAY_IN_MS);
      setListState([...listState]);
    }

    setIsLoading({ ...initialStateLoading, loadingRemDyIndex: false });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setInputValue("");
    setInputIndex(Number(""));
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={handleSubmit}>
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
            // isLoader={isAdding}
            //   disabled={!value || queue.length === 7}
          />
          <Button
            text="Добавить в tail"
            type="submit"
            extraClass={styles.button_sml}
            onClick={addToTail}
            // isLoader={isAdding}
            //  disabled={!value || queue.length === 7}
          />
          <Button
            text="Удалить из head"
            type="submit"
            extraClass={styles.button_sml}
            onClick={removeHead}
            // isLoader={isRemoving}
            // onClick={remove}
            //  disabled={queue.isEmpty()}
          />
          <Button
            text="Удалить из tail"
            type="submit"
            extraClass={styles.button_sml}
            onClick={removeTail}
            // isLoader={isRemoving}
            // onClick={remove}
            //  disabled={queue.isEmpty()}
          />
        </div>
        <div className={styles.container}>
          <Input
            placeholder="Введите индекс"
            type="number"
            isLimitText={false}
            value={inputIndex}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputIndex(parseInt(e.target.value, 10));
            }}
          />
          <Button
            text="Добавить по индексу"
            extraClass={styles.button_big}
            type="submit"
            onClick={addByIndex}
            //  isLoader={isAdding}
            // disabled={!value || queue.length === 7}
          />
          <Button
            text="Удалить по индексу"
            type="submit"
            extraClass={styles.button_big}
            onClick={removeByIndex}
            // isLoader={isRemoving}
            //disabled={queue.isEmpty()}
          />
        </div>
      </form>

      <ul className={styles.container_result}>
      {listState.map((item, index) => (
            <li className={styles.circles} key={index}>
              {item.circleTop && (
                <Circle
                  //extraClass={`${styles.listPage__littleCircle} ${styles[`listPage__littleCircle_${item.littleCircle.position}`]}`}
                  letter={item.value}
                  isSmall
                  state={item.state}
                />
              )}
              <Circle
               // tail={(!item.littleCircle && index === listContainer.length - 1) ? 'tail' : ''}
                letter={item.value}
                index={index}
                //head={!item.littleCircle && index === 0 ? 'head' : ''}
                state={item.state}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
