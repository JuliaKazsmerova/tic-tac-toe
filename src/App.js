import React, {Component} from 'react';
import PubNubReact from 'pubnub-react';
import Swal from "sweetalert2";
import shortid from 'shortid';
import './Game.css';
import Board from "./Board";
import Game from "./Game";

class App extends Component {
    constructor(props) {
        super(props);
        this.pubnub = new PubNubReact({
            publishKey: "pub-c-467237ac-248f-4a81-9280-2317677e0c75",
            subscribeKey: "sub-c-added27e-ead8-11e9-ad72-8e6732c0d56b"
        });

        this.state = {
            piece: '',
            isPlaying: false,
            isRoomCreator: false,
            isDisabled: false,
            myTurn: false,
        };

        //TODO channel
    }

    //TODO componentWillUnmount

    //TODO componentDidUpdate

    onPressCreate = (e) => {

        //TODO room, channel, pubnub subsccribe

        Swal.fire({
            position: 'top',
            allowOutsideClick: false,
            title: 'Share this room ID with your friend',
            text: this.roomId,
            width: 275,
            padding: '0.7em',
            customClass: {
                heightAuto: false,
                title: 'title-class',
                popup: 'popup-class',
                confirmButton: 'button-class'
            }
        })

        this.setState({
            piece: 'X',
            isRoomCreator: true,
            isDisabled: true, // Disable the 'Create' button
            myTurn: true, // Room creator makes the 1st move
        });
    }

    onPressJoin = (e) => {
        Swal.fire({
            position: 'top',
            input: 'text',
            allowOutsideClick: false,
            inputPlaceholder: 'Enter the room id',
            showCancelButton: true,
            confirmButtonColor: 'rgb(208,33,41)',
            confirmButtonText: 'OK',
            width: 275,
            padding: '0.7em',
            customClass: {
                heightAuto: false,
                popup: 'popup-class',
                confirmButton: 'join-button-class ',
                cancelButton: 'join-button-class'
            }
        }).then((result) => {
            // Check if the user typed a value in the input field
            if (result.value) {
                this.joinRoom(result.value);
            }
        })
    }

    joinRoom = (value) => {
        //TODO
        Swal.fire({
            position: 'top',
            allowOutsideClick: false,
            title: 'Error',
            text: 'Game in progress. Try another room.',
            width: 275,
            padding: '0.7em',
            customClass: {
                heightAuto: false,
                title: 'title-class',
                popup: 'popup-class',
                confirmButton: 'button-class'
            }
        })
    }

    endGame = () => {
        this.setState({
            piece: '',
            isPlaying: false,
            isRoomCreator: false,
            isDisabled: false,
            myTurn: false,
        });

        //TODO channel, unsubscribe
    }

    render() {
        return (
            <div>
                <div className="title">
                    <p>React Tic Tac Toe</p>
                </div>

                {
                    !this.state.isPlaying &&
                    <div className="game">
                        <div className="board">
                            <Board
                                squares={0}
                                onClick={index => null}
                            />

                            <div className="button-container">
                                <button
                                    className="create-button "
                                    disabled={this.state.isDisabled}
                                    onClick={(e) => this.onPressCreate()}
                                > Create
                                </button>
                                <button
                                    className="join-button"
                                    onClick={(e) => this.onPressJoin()}
                                > Join
                                </button>
                            </div>

                        </div>
                    </div>
                }

                {
                    this.state.isPlaying &&
                    <Game
                        pubnub={this.pubnub}
                        gameChannel={this.gameChannel}
                        piece={this.state.piece}
                        isRoomCreator={this.state.isRoomCreator}
                        myTurn={this.state.myTurn}
                        xUsername={this.state.xUsername}
                        oUsername={this.state.oUsername}
                        endGame={this.endGame}
                    />
                }
            </div>
        );
    }
}

export default App;
