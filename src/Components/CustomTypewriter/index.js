import CustomText from 'Components/CustomText';
import {useState, useEffect} from 'react';

export default function ({text, delay, infinite}) {
  const [currentText, setCurrentText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    let timeout;

    if (
      !isErasing &&
      currentIndex < text.length &&
      currentText !== text[currentIndex]
    ) {
      timeout = setTimeout(() => {
        setCurrentText(
          prevText => prevText + text[currentIndex][prevText.length],
        );
        if (currentText.length === text[currentIndex].length - 1) {
          setCurrentIndex(prevIndex => prevIndex + 1);
        }
      }, delay);
    } else if (isErasing && currentText.length > 0) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText.slice(0, -1));
        if (currentText.length === 1) {
          setCurrentIndex(prevIndex => (prevIndex + 1) % text.length);
        }
      }, delay);
    } else if (infinite) {
      setCurrentIndex(prevIndex => (prevIndex + 1) % text.length);
      setIsErasing(!isErasing);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, isErasing, text, currentText]);

  return (
    <CustomText
      value={'Search For ' + currentText}
      regular
      size={12}
      color={'grey'}
    />
  );
}
