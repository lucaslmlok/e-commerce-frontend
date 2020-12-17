const ErrorMsg = (props) => {
  let { msg } = props;

  if (msg) {
    const msgArr: string[] = msg.split(" ");
    if (msgArr.length > 1) {
      let firstWord = msgArr[0];
      firstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
      msgArr[0] = firstWord;
      msg = msgArr.join(" ");
    }
  }

  return <div className="text-danger">{msg}</div>;
};

export default ErrorMsg;
