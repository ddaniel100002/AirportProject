import style from './home.module.css';
import { useState, useEffect } from 'react';
import PlaneService from '../services/planes.service';
import { currentStations } from './stationsLocations';

function Home() {
    const [listOfPlanes, setListofPlanes] = useState([]);
    const [showDeadlockBtn, setShowDeadlockBtn] = useState(false);
    const [showStopSimulatorBtn, setShowStopSimulatorBtn] = useState(true);
    const [showResumeSimulatorBtn, setShowResumeSimulatorBtn] = useState(false);
    const [showDirectorImg, setShowDirectorImg] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const service = new PlaneService();

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };
 
    const handleStopSimulator = (isActivated) => {
        service.handleSimulator(isActivated);
        setShowStopSimulatorBtn(isActivated);
        setShowResumeSimulatorBtn(!isActivated);
    };

    const handleResumeSimulator = (isActivated) => {
        service.handleSimulator(isActivated);
        setShowResumeSimulatorBtn(!isActivated);
        setShowDeadlockBtn(isActivated);
    };

    const handleDeadlock = () => {
        service.handleDeadlock();
        setBtnsWhileDeadlock();
    };

    const setBtnsWhileDeadlock = () => {
        setShowDeadlockBtn(false);
        setShowDirectorImg(true);
        setTimeout(() => {
            setShowDirectorImg(false);
        }, 12000);
    }

    const generateColor = () => {
        let randomColorString = "#";
        const arrayOfColorFunctions = "0123456789abcdef";
        for (let x = 0; x < 6; x++) {
            let index = Math.floor(Math.random() * 16);
            let value = arrayOfColorFunctions[index];
            randomColorString += value;
        }
        return randomColorString;
    };

    useEffect(() => {
        service.get().then(data => {
            setListofPlanes(data);
        }).catch(err => {
            console.log(err);
        });
    }, [listOfPlanes]);

    return (
        <div>
            <img className={style.background} src='/imageAirport.png' />
            <img hidden={!showDirectorImg} className={style.directorImg} src='/aircraftdirector.png' />
            <div className={style.deadlockHover}>{isHovering && <h2>IMPORTANT: <br /> Click when the 4th plane enters the 3rd/4th station.</h2>}</div>
            <h3 className={style.rescueTitle} style={{ color: generateColor() }}>rescue station</h3>
            <h3 className={style.flickering} style={{ color: generateColor() }}>..</h3>
            <h3 className={style.flickering3} style={{ color: generateColor() }}>.</h3>
            <h3 hidden={!showDirectorImg} className={style.flickeringSticks} style={{ color: generateColor() }}>|</h3>
            <h3 hidden={!showDirectorImg} className={style.flickeringSticks2} style={{ color: generateColor() }}>|</h3>
            <h3 hidden={!showDirectorImg} className={style.flickering2} style={{ color: generateColor() }}>...........................................................................................................</h3>
            <audio controls="controls">
                <source src="/always-wait-for-you.mp3" />
            </audio>

            {listOfPlanes.map((p, index) => {
                return (
                    <div key={index} >
                        <img className={p.isCrashed ? style.showFire : style.hiddenFire} src='/fire.png' style={{ ...currentStations[p.currentStation] }} />
                        <img className={style.plane} src='/planePic.png' style={{ ...currentStations[p.currentStation] }} />
                        <p className={(p.currentStation !== 100) ? style.planeName : style.planeName100} style={{ ...currentStations[p.currentStation], color: p.color }}>{p.flightNumber}</p>
                    </div>
                )
            })}
            <div>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th className={style.th}>Flight Number</th>
                            <th className={style.th2}>Station Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfPlanes.map((p, index) => {
                            return (
                                <tr key={index}>
                                    <td className={style.td}>{p.flightNumber}</td>
                                    <td className={style.td2}>{p.currentStation}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button hidden={!showDeadlockBtn} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={style.deadlock} onClick={() => handleDeadlock()}>Deadlock</button>
                <button hidden={!showStopSimulatorBtn} className={style.stopSimulator} onClick={() => handleStopSimulator(false)}>Stop Simulator</button>
                <button hidden={!showResumeSimulatorBtn} className={style.resumeSimulator} onClick={() => handleResumeSimulator(true)}>Resume Simulator</button>
            </div>
        </div>
    );
}
export default Home;