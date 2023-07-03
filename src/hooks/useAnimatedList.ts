import {
  createRef, useCallback, useEffect, useRef, useState,
} from 'react';

interface ValueProps {
  id: string;
  type: string;
  text: string;
  duration: number;
}

export default function useAnimatedList(initialValue: ValueProps[] = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<string[]>([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId: string) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animatedRefs.current.delete(itemId);
    animationEndListeners.current.delete(itemId);

    setItems((prevState) => prevState.filter((item) => String(item.id) !== itemId));

    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((id) => itemId !== id),
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => { handleAnimationEnd(itemId); };
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animatedElement.addEventListener('animationend', onAnimationEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;
    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, String(id)],
    );
  }, []);

  const getAnimatedRef = useCallback((itemId: string) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem:
    (item: ValueProps,
    options: { isLeaving: boolean, animatedRef: React.RefObject<any> }) => JSX.Element) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);

      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, {
        isLeaving,
        animatedRef,
      });
    })
  ), [items, pendingRemovalItemsIds, getAnimatedRef]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}
