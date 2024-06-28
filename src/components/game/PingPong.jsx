import {ColorContext, ThemeContext} from '../../Contexts/ThemeContext'
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faRotate } from '@fortawesome/free-solid-svg-icons';
import { faCirclePause, faImage } from '@fortawesome/free-regular-svg-icons';

class Ball {
    constructor(context) {
        this.ctx = context;
        this.x;
        this.y;
        this.r = 10;
        this.valocity;
        this.agl;
        this.reset();
        this.direction;
    }
    
    reset () {
        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height / 2;
        this.agl = Math.random() * (2 * Math.PI);
        while (this.agl <= 0.5 || this.agl >= 0.9) {
            this.agl = Math.random() * 2 * Math.PI;
        }
        this.direction = {x:Math.cos(this.agl), y:Math.sin(this.agl)}
        this.valocity = 0.4;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI)
        this.ctx.fill();
    }

    update(delta) {
        this.x += this.direction.x * delta * this.valocity;
        this.y +=  this.direction.y * delta * this.valocity;
        if (this.x <= 0 || this.x >= this.ctx.canvas.width)
            this.direction.x *= -1;
        this.valocity += 0.0001;
    }
}

class Paddle {
    constructor(context, x, y) {
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 10;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.roundRect(this.x, this.y, this.width, this.height, 6)
        this.ctx.strokeStyle = 'white'
        this.ctx.fill();
    }

    update(newXPos) {
        if (this.x + newXPos < 0)
            this.x += newXPos - (this.x + newXPos);
        else if (this.x + this.width + newXPos > this.ctx.canvas.width)
            this.x += this.ctx.canvas.width - this.x - this.width;
        else
            this.x += newXPos;
    }
}

class Game {
    constructor(context, handler, players, color) {
        this.color = color;
        this.handler = handler;
        this.score = players;
        this.width = context.canvas.width;
        this.height = context.canvas.height;
        this.ctx = context;
        this.ctx.translate(0.5, 0.5);
        this.ball = new Ball(context);
        this.paddleA = new Paddle(this.ctx, this.width / 2 - 50 , 5);
        this.paddleB = new Paddle(this.ctx, this.width / 2 - 50 , this.height - 15);
        this.update = this.update.bind(this);
        this.lastTime = null;
        this.isEnded = false;
        this.player1_index = 0;
        this.player2_index = players[0].score.length - 1;
    }

    reduceFunc(total, value) {
        return total + value;
    }

    updateScore(player, index) {
        let score = this.score[player].score
        score[index] = 1;
        this.score[player].score = score;
        this.score[player].total = score.reduce(this.reduceFunc);
        this.handler([...this.score])
        this.ball.reset();
        this.isEnded = this.isLose();
    }

    isLose() {
        return (this.player1_index == 2 || this.player2_index == 0)
    }

    update(time) {
        if (this.lastTime) {
            let delta = time - this.lastTime;
            this.ctx.clearRect(0,0,this.width, this.height);
            this.ball.update(delta);
            if (this.ball.y <= this.paddleA.y + this.paddleA.height && this.ball.x >= this.paddleA.x && this.ball.x <= this.paddleA.x + this.paddleA.width)
                this.ball.direction.y *= -1;
            else if (this.ball.y >= this.paddleB.y && this.ball.x >= this.paddleB.x && this.ball.x <= this.paddleB.x + this.paddleB.width)
                this.ball.direction.y *= -1;
            else if (this.ball.y < 0) {
                this.updateScore(0, this.player1_index)
                this.player1_index++;
            }
            else if(this.ball.y > this.height) {
                this.updateScore(1, this.player2_index);
                this.player2_index--;
            }
        }
        this.lastTime = time;
        this.draw();
    }

    draw() {
        this.ctx.strokeStyle = 'white'
        this.ctx.fillStyle = 'white'
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height/2);
        this.ctx.lineTo(this.width, this.height/2);
        this.ctx.stroke();
        this.paddleA.draw();
        this.paddleB.draw();
        this.ball.draw();
        if (!this.isEnded) 
            window.requestAnimationFrame(this.update);
    }
    
    setup() {
        window.addEventListener('keyup', (e) => {
            if (e.key == 'a')
                this.paddleA.update(-100);
            else if (e.key == 'd')
                this.paddleA.update(100);
            else if (e.key == 'ArrowLeft')
                this.paddleB.update(-100);
            else if (e.key == 'ArrowRight')
                this.paddleB.update(100);
        })
        this.draw();
    }
}

function Score({data}) {
    
    return (
        <div className="score flex justify-center h-1/6 items-center">
            <div className="h-[80px] w-[600px] rounded-sm bg-darkBg/60 backdrop-blur-lg flex justify-between px-4 items-center">
                <div className=" flex">
                    <div className="mr-4 border-[.3px] w-[40px] h-[40px] flex justify-center items-center rounded-full">
                        <img src="/aamhamdi1.jpeg" className="max-w-full rounded-full max-h-full" alt="" />
                    </div>
                    <div className="text-[16px]">
                        <h1>{data[0].nickname}</h1>
                        <h4 className="text-[12px] uppercase">{data[0].name}</h4>
                    </div>
                </div>
                <div className="score text-center">
                    <div className="time">{data[0].total} | {data[1].total}</div>
                </div>
                <div className=" flex">
                    <div className="text-[16px] text-right">
                        <h1>{data[1].nickname}</h1>
                        <h4 className="text-[12px] uppercase">{data[1].name}</h4>
                    </div>
                    <div className="ml-4 border-[.3px] w-[40px] h-[40px] flex justify-center items-center rounded-full">
                        <img src="/aamhamdi1.jpeg" className="max-w-full rounded-full max-h-full" alt="" />
                    </div>
                </div> 
            </div>
        </div>
    )
}

const players = [
    {id:0, nickname:'aamhamdi', name:'player1', total : 0 , score:[0,0,0]},
    {id:1, nickname:'nmaazouz', name:'player2', total : 0, score:[0,0,0]},
]


function PlayerWon({Restarthandler, quitHandler , color}) {
    return (
        <div className='absolute z-10 text-center bg-darkBg/50 backdrop-blur-md p-2 flex justify-center items-center w-[50%] h-[200px] rounded-sm top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div>
                <h1 className='text-[40px] uppercase mb-10'>you win</h1>
                <div className="actions text-[15px] p-1 flex justify-center mt-10">
                        <button className='p-1 h-[35px] bg-primary rounded-sm capitalize mr-2 w-[90px]' onClick={Restarthandler}>restart</button>
                        <button className='p-1 h-[35px] bg-primary capitalize rounded-sm mr-2 w-[90px]' onClick={quitHandler}>Quit</button>
                </div>
            </div>
        </div>
    )
}


export default function PingPong() {
    const theme = useContext(ThemeContext)
    const color = useContext(ColorContext).substring(6,13)
    const canvasRef = useRef(null);
    const canvaParentRef = useRef(null);
    const gameRef = useRef(null);
    const [player, setPlayer] = useState(players);
    const [restart, setRestart] = useState(false);
    const navigate = useNavigate();

    function resetHandler() {
        setPlayer([{...player[0], total:0, score:[0,0,0]},{...player[1], total:0, score:[0,0,0]}])
        setRestart(!restart);
    }
    
    function quitHandler() {
        navigate('/dashboard/game');
    }

    useEffect(() => {
        let rect = canvaParentRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width - 20;
        canvasRef.current.height = rect.height - 20;
        window.addEventListener('resize', () => {
            rect = canvaParentRef.current.getBoundingClientRect();
            canvasRef.current.width = rect.width - 20;
            canvasRef.current.height = rect.height - 20;
        })
    }, [])

    
    useEffect(() => {
        const  ctx = canvasRef.current.getContext("2d");
        const timer = setTimeout(() => {
            gameRef.current = new Game(ctx, setPlayer, player, color);
            gameRef.current.setup();
            // gRef.current.style = "transform: rotateZ(90deg)"
        }, 500)
        
        return () => {
            clearTimeout(timer);
            setPlayer([{...player[0], total:0, score:[0,0,0]},{...player[1], total:0, score:[0,0,0]}])
            delete gameRef.current;
            ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
        }
    } , [restart])


    return (
        <div className={`${theme === 'light' ? "bg-lightItems text-lightText" : "bg-darkItems text-darkText"} bg-pong  w-full h-[94vh]  mt-2 rounded-sm p-2`}>
            <div className="rounded-sm h-full bg-cover relative">
                <div className='bg-darkBg/50 backdrop-blur-md text-[16px] w-14 rounded-sm h-[170px] absolute right-0 top-0 flex justify-center items-center'>
                    <ul>
                        <li className='text-center'><FontAwesomeIcon icon={faClose} /></li>
                        <li className='mt-4 text-center'><FontAwesomeIcon  icon={faRotate}/></li>
                        <li className='mt-4 text-center'><FontAwesomeIcon  icon={faImage}/></li>
                        <li className='mt-4 text-center' ><FontAwesomeIcon  icon={faCirclePause}/></li>
                    </ul>
                </div>
                <Score data={player} /> 
                {
                    (player[0].total == 3 || player[1].total == 3) &&
                    <PlayerWon quitHandler={quitHandler} Restarthandler={resetHandler} color={color} />
                }
                <div className={`flex justify-center items-center mt-2 h-5/6 p-2`}>
                    <div ref={canvaParentRef} className={`${theme === 'light' ? "border-lightText" : "border-darkText"} rounded-sm backdrop-blur-lg border-[1px] p-1 flex justify-center items-center  w-3/4 h-full relative`}>
                        <div className='h-fit w-10 absolute top-[50%] right-4 translate-y-[-50%] flex justify-center'>
                            <div style={{accentColor:color}}>
                                <ul className=''>
                                    {
                                        player[1].score.map((item, index) => {
                                            return (
                                                <li key={index}><input type="radio" onChange={() => {}} checked={item} /></li>
                                            )
                                        })
                                    }
                                </ul>
                                <ul className=''>
                                    {
                                        player[0].score.map((item, index) => {
                                            return (
                                                <li key={index}><input type="radio" onChange={() => {}} checked={item} /></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <canvas className={` border-[1px] bg-black/30 rounded-sm`} width="200px" height="400px"  ref={canvasRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}4