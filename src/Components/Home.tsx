import "./Styles.css";
import copy_icon from "./Images/icon-copy.svg";
import arrow_icon_hover from "./Images/icon-arrow-right-hover.svg";
import arrow_icon from "./Images/icon-arrow-right.svg";
import { Slider, Checkbox } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";

const CustomSlider = styled(Slider)({
  // color: "hsl(224, 65%, 95%)",
  height: 5,
  color: "#18171F",
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: "#A4FFAF"
  },

  '& .MuiSlider-thumb': {
    height: 28,
    width: 28,
    backgroundColor: '#A4FFAF',
    border: "2px solid transparent",
    "&:active": {
      border: "2px solid #A4FFAF",
      backgroundColor: "black"
    },

  }  

}) as typeof Slider;

const CustomCheckbox = styled(Checkbox)({
  height: 20,
  width: 20,
  color: "#A4FFAF",
  "&.Mui-checked": {
    color: "#A4FFAF"
    }
}) as typeof Checkbox;

function Home() {

  const [length, setLength] = useState<number>(0);
  const [hover, setHover] = useState<boolean>(false);
  const [strength, setStrength] = useState<string>("0");
  const [finalPassword, setFinalPassword] = useState<string>("");
  const [copySuccessful, setCopySuccessful] = useState<boolean>(false);
  
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  
  function generatePassword() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "1234567890";
    const symbols = "~!@#$%^&*()_+=-`";

    let password : string = (includeUppercase ? uppercase : "") + (includeLowercase ? lowercase : "") + (includeNumbers ? numbers : "") + (includeSymbols ? symbols : "");

    let newPassword = "";
    if (includeUppercase || includeLowercase || includeNumbers || includeSymbols) {
      for (let i = 0; i < length; i++) {
       newPassword += password[Math.floor(Math.random() * password.length)];
      }

      setFinalPassword(newPassword);
      let passwordstrength = (length > 0 && length <= 5) ? setStrength("1") : (length >= 6 && length <= 10) ? setStrength("2") : (length >= 11 && length <= 16) ? setStrength("3") : (length > 16 ? setStrength("4") : setStrength("0"));      
    }
  }

  function copyHandler() {
    setCopySuccessful(false);
    let data = [new ClipboardItem({"text/plain": new Blob([finalPassword], { type: "text/plain" })})];
    navigator.clipboard.write(data).then(() => setCopySuccessful(true));

    setTimeout(() => {
      setCopySuccessful(false);
    }, 4000);
  }
  
  return (
    <div className="container">
      <div className="header">Password Generator</div>
      <div className="first-box box">
        <input readOnly placeholder="P4$5W0rD!" value={finalPassword} />
        <div>
          {copySuccessful && <div>COPIED</div>}
          <img src={copy_icon} alt="copy" onClick={copyHandler} />
        </div>
      </div>
      <div className="second-box box">
        <div className="upper">
          <div className="char-length">
            <div className="text">Character Length</div>
            <div className="number">{length}</div>
          </div>
          <div className="slider"><CustomSlider max={20} onChange={(e: any) => setLength(e.target.value)} /></div>
        </div>
        <div className="middle">
          <div><CustomCheckbox onChange={(e : any) => setIncludeUppercase(e.target.checked)} /><div className="text">Include Uppercase Letters</div></div>
          <div><CustomCheckbox onChange={(e : any) => setIncludeLowercase(e.target.checked)} /><div className="text">Include Lowercase Letters</div></div>
          <div><CustomCheckbox onChange={(e : any) => setIncludeNumbers(e.target.checked)} /><div className="text">Include Numbers</div></div>
          <div><CustomCheckbox onChange={(e : any) => setIncludeSymbols(e.target.checked)} /><div className="text">Include Symbols</div></div>
        </div>
        <div className="lower">
          <div className="strength">
            <div className="text" style={{color: "#817D92"}}>STRENGTH</div>
            <div>
              <div className="text">{strength === "1" ? "TOO WEAK" : strength === "2" ? "WEAK" : strength === "3" ? "MEDIUM" : strength === "4" && "STRONG"}</div>
              <div className="bars">
              {/* red orange yellow green */}
                <div className={`bar ${strength === "1" ? "red" : strength === "2" ? "orange" : strength === "3" ? "yellow" : strength === "4" && "green"}`}></div>
                <div className={`bar ${strength === "2" ? "orange" : strength === "3" ? "yellow" : strength === "4" && "green"}`}></div>
                <div className={`bar ${strength === "3" ? "yellow" : strength === "4" && "green"}`}></div>
                <div className={`bar ${strength === "4" && "green"}`}></div>
              </div>
            </div>
          </div>
          <button onClick={generatePassword} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>GENERATE {hover ? <img src={arrow_icon_hover} alt="arrow" /> : <img src={arrow_icon} alt="arrow" />}</button>
        </div>
      </div>
    </div>
  )
}

export default Home;